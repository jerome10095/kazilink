import { getServiceClient, getUserFromRequest, json } from './_shared/supabase.js';
import { serializeReview } from './_shared/serialize.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_COMMENT = 1000;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const REVIEW_SELECT = 'id, rating, comment, created_at, reviewer_id, reviewee_id, reviewer:users!reviews_reviewer_id_fkey ( full_name, profile_image )';

// Adds the worker (reviewee) and employer company details a review card needs.
async function hydrate(supabase, rows) {
  const reviewerIds = [...new Set(rows.map((row) => row.reviewer_id))];
  const revieweeIds = [...new Set(rows.map((row) => row.reviewee_id))];

  const [employers, workers] = await Promise.all([
    reviewerIds.length
      ? supabase.from('employer_profiles').select('user_id, company_name').in('user_id', reviewerIds)
      : { data: [] },
    revieweeIds.length
      ? supabase
          .from('worker_profiles')
          .select('id, user_id, trade, trade_rw, users ( full_name )')
          .in('user_id', revieweeIds)
      : { data: [] },
  ]);

  const companyByUser = new Map((employers.data ?? []).map((row) => [row.user_id, row.company_name]));
  const workerByUser = new Map((workers.data ?? []).map((row) => [row.user_id, row]));

  return rows.map((row) => serializeReview(row, companyByUser.get(row.reviewer_id), workerByUser.get(row.reviewee_id)));
}

async function listReviews(req, supabase) {
  const url = new URL(req.url);
  const workerId = url.searchParams.get('workerId');
  const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || DEFAULT_LIMIT, 1), MAX_LIMIT);

  let query = supabase.from('reviews').select(REVIEW_SELECT).order('created_at', { ascending: false }).limit(limit);

  if (workerId) {
    if (!UUID_RE.test(workerId)) return json({ error: 'Invalid workerId' }, 400);
    const { data: worker } = await supabase.from('worker_profiles').select('user_id').eq('id', workerId).maybeSingle();
    if (!worker) return json({ reviews: [] });
    query = query.eq('reviewee_id', worker.user_id);
  }

  const { data, error } = await query;
  if (error) {
    console.error('list reviews failed', error);
    return json({ error: 'Could not load reviews' }, 500);
  }

  return json({ reviews: await hydrate(supabase, data) });
}

async function createReview(req, supabase) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) return json({ error: 'Missing or invalid authentication token' }, 401);

  const { data: employer } = await supabase
    .from('employer_profiles')
    .select('id')
    .eq('user_id', authUser.id)
    .maybeSingle();
  if (!employer) return json({ error: 'Only employer accounts can review workers' }, 403);

  const body = await req.json().catch(() => ({}));
  const rating = Number(body?.rating);
  const comment = typeof body?.comment === 'string' ? body.comment.trim() : '';

  if (!UUID_RE.test(body?.workerId ?? '')) return json({ error: 'A valid workerId is required' }, 400);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return json({ error: 'Rating must be a whole number from 1 to 5' }, 400);
  if (comment.length > MAX_COMMENT) return json({ error: `Comment must be under ${MAX_COMMENT} characters` }, 400);

  const { data: worker } = await supabase
    .from('worker_profiles')
    .select('id, user_id')
    .eq('id', body.workerId)
    .maybeSingle();
  if (!worker) return json({ error: 'Worker not found' }, 404);

  // Only employers who actually hired this worker can review them.
  const { data: accepted } = await supabase
    .from('hire_requests')
    .select('id')
    .eq('employer_id', employer.id)
    .eq('worker_id', worker.id)
    .eq('status', 'accepted')
    .limit(1);
  if (!accepted?.length) return json({ error: 'You can only review workers who accepted your hire request' }, 403);

  const { error } = await supabase.from('reviews').insert({
    reviewer_id: authUser.id,
    reviewee_id: worker.user_id,
    rating,
    comment: comment || null,
  });
  if (error) {
    if (error.code === '23505') return json({ error: 'You have already reviewed this worker' }, 409);
    console.error('create review failed', error);
    return json({ error: 'Could not save your review' }, 500);
  }

  // Keep the worker's displayed rating in sync with the real reviews.
  const { data: all, error: allError } = await supabase.from('reviews').select('rating').eq('reviewee_id', worker.user_id);
  if (allError) {
    console.error('recompute rating failed', allError);
  } else {
    const average = all.reduce((sum, row) => sum + row.rating, 0) / all.length;
    const { error: updateError } = await supabase
      .from('worker_profiles')
      .update({ rating: Math.round(average * 10) / 10, review_count: all.length })
      .eq('id', worker.id);
    if (updateError) console.error('update worker rating failed', updateError);
  }

  return json({ ok: true }, 201);
}

export default async (req) => {
  const supabase = getServiceClient();
  if (req.method === 'GET') return listReviews(req, supabase);
  if (req.method === 'POST') return createReview(req, supabase);
  return json({ error: 'Method not allowed' }, 405);
};

export const config = { path: '/api/reviews' };
