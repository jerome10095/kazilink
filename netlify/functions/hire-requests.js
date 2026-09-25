import { getServiceClient, getUserFromRequest, json } from './_shared/supabase.js';
import { serializeHireRequest } from './_shared/serialize.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_MESSAGE = 2000;
const MAX_TITLE = 200;

const EMPLOYER_SELECT = `
  id, job_title, message, proposed_rate, status, created_at, updated_at,
  worker_profiles ( id, trade, trade_rw, users ( full_name, profile_image, email, phone ) )
`;
const WORKER_SELECT = `
  id, job_title, message, proposed_rate, status, created_at, updated_at,
  employer_profiles ( id, company_name, users ( full_name, profile_image, email, phone ) )
`;

// Resolves the caller's role and their worker/employer profile id.
async function loadActor(supabase, userId) {
  const { data: user } = await supabase.from('users').select('role').eq('id', userId).maybeSingle();
  if (!user) return null;

  const table = user.role === 'employer' ? 'employer_profiles' : user.role === 'worker' ? 'worker_profiles' : null;
  if (!table) return null;

  const { data: profile } = await supabase.from(table).select('id').eq('user_id', userId).maybeSingle();
  if (!profile) return null;

  return { role: user.role, profileId: profile.id };
}

async function createRequest(req, supabase, actor) {
  if (actor.role !== 'employer') {
    return json({ error: 'Only employer accounts can send hire requests' }, 403);
  }

  const body = await req.json().catch(() => ({}));
  const workerId = body?.workerId;
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  const jobTitle = typeof body?.jobTitle === 'string' ? body.jobTitle.trim() : '';
  const proposedRate =
    body?.proposedRate === undefined || body?.proposedRate === null || body?.proposedRate === ''
      ? null
      : Number(body.proposedRate);

  if (!UUID_RE.test(workerId ?? '')) return json({ error: 'A valid workerId is required' }, 400);
  if (!message) return json({ error: 'A message is required' }, 400);
  if (message.length > MAX_MESSAGE) return json({ error: `Message must be under ${MAX_MESSAGE} characters` }, 400);
  if (jobTitle.length > MAX_TITLE) return json({ error: `Job title must be under ${MAX_TITLE} characters` }, 400);
  if (proposedRate !== null && (!Number.isFinite(proposedRate) || proposedRate < 0)) {
    return json({ error: 'Proposed rate must be a positive number' }, 400);
  }

  const { data: worker } = await supabase
    .from('worker_profiles')
    .select('id, available')
    .eq('id', workerId)
    .maybeSingle();
  if (!worker) return json({ error: 'Worker not found' }, 404);
  if (!worker.available) return json({ error: 'This worker is not currently available' }, 409);

  const { data, error } = await supabase
    .from('hire_requests')
    .insert({
      employer_id: actor.profileId,
      worker_id: workerId,
      job_title: jobTitle || null,
      message,
      proposed_rate: proposedRate,
    })
    .select('id, status')
    .single();

  if (error) {
    if (error.code === '23505') {
      return json({ error: 'You already have a pending request with this worker' }, 409);
    }
    console.error('create hire request failed', error);
    return json({ error: 'Could not send your request' }, 500);
  }

  return json({ request: { id: data.id, status: data.status } }, 201);
}

async function listRequests(supabase, actor) {
  const isEmployer = actor.role === 'employer';
  const { data, error } = await supabase
    .from('hire_requests')
    .select(isEmployer ? EMPLOYER_SELECT : WORKER_SELECT)
    .eq(isEmployer ? 'employer_id' : 'worker_id', actor.profileId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('list hire requests failed', error);
    return json({ error: 'Could not load requests' }, 500);
  }

  return json({ requests: data.map((row) => serializeHireRequest(row, actor.role)) });
}

// Workers accept/decline requests sent to them; employers cancel their own.
const ALLOWED_TRANSITIONS = {
  worker: { column: 'worker_id', statuses: ['accepted', 'declined'] },
  employer: { column: 'employer_id', statuses: ['cancelled'] },
};

async function updateRequest(req, supabase, actor, id) {
  if (!UUID_RE.test(id)) return json({ error: 'Request not found' }, 404);

  const body = await req.json().catch(() => ({}));
  const rule = ALLOWED_TRANSITIONS[actor.role];
  if (!rule.statuses.includes(body?.status)) {
    return json({ error: `Status must be one of: ${rule.statuses.join(', ')}` }, 400);
  }

  const { data: existing } = await supabase
    .from('hire_requests')
    .select('id, status')
    .eq('id', id)
    .eq(rule.column, actor.profileId)
    .maybeSingle();
  if (!existing) return json({ error: 'Request not found' }, 404);

  // Conditional on status so two concurrent responses can't both win.
  const { data: updated, error } = await supabase
    .from('hire_requests')
    .update({ status: body.status })
    .eq('id', id)
    .eq('status', 'pending')
    .select('id, status')
    .maybeSingle();

  if (error) {
    console.error('update hire request failed', error);
    return json({ error: 'Could not update the request' }, 500);
  }
  if (!updated) return json({ error: 'This request has already been answered' }, 409);

  return json({ request: updated });
}

export default async (req, context) => {
  const authUser = await getUserFromRequest(req);
  if (!authUser) return json({ error: 'Missing or invalid authentication token' }, 401);

  const supabase = getServiceClient();
  const actor = await loadActor(supabase, authUser.id);
  if (!actor) return json({ error: 'Complete your profile first' }, 403);

  const id = context.params.id;
  if (id) {
    if (req.method !== 'PATCH') return json({ error: 'Method not allowed' }, 405);
    return updateRequest(req, supabase, actor, id);
  }
  if (req.method === 'POST') return createRequest(req, supabase, actor);
  if (req.method === 'GET') return listRequests(supabase, actor);
  return json({ error: 'Method not allowed' }, 405);
};

export const config = { path: ['/api/hire-requests', '/api/hire-requests/:id'] };
