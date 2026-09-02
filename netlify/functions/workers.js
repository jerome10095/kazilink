import { getServiceClient, json } from './_shared/supabase.js';
import { serializeWorkerListing } from './_shared/serialize.js';

const SELECT = `
  id, trade, trade_rw, rating, review_count, location, experience_years,
  verified, available, rate, bio, bio_rw,
  users!inner ( full_name, profile_image ),
  worker_skills ( skills ( name ) )
`;

function toRow(record) {
  return {
    id: record.id,
    name: record.users?.full_name ?? '',
    avatar_url: record.users?.profile_image ?? null,
    trade: record.trade,
    trade_rw: record.trade_rw,
    rating: record.rating,
    review_count: record.review_count,
    location: record.location,
    experience_years: record.experience_years,
    verified: record.verified,
    available: record.available,
    rate: record.rate,
    bio: record.bio,
    bio_rw: record.bio_rw,
    skills: (record.worker_skills ?? [])
      .map((ws) => ws.skills?.name)
      .filter(Boolean)
      .sort(),
  };
}

async function listWorkers(req) {
  const url = new URL(req.url);
  const search = url.searchParams.get('search');
  const trade = url.searchParams.get('trade');
  const location = url.searchParams.get('location');
  const minRating = url.searchParams.get('minRating');
  const limit = url.searchParams.get('limit');

  let query = getServiceClient().from('worker_profiles').select(SELECT);
  if (trade) query = query.eq('trade', trade);
  if (location) query = query.eq('location', location);
  if (minRating) query = query.gte('rating', Number(minRating));
  query = query.order('rating', { ascending: false }).order('id', { ascending: true });

  const { data, error } = await query;
  if (error) {
    console.error('list workers failed', error);
    return json({ error: 'Could not load workers' }, 500);
  }

  let rows = data.map(toRow);

  if (search) {
    const needle = search.toLowerCase();
    rows = rows.filter(
      (row) =>
        row.name.toLowerCase().includes(needle) ||
        (row.trade ?? '').toLowerCase().includes(needle) ||
        (row.trade_rw ?? '').toLowerCase().includes(needle)
    );
  }

  if (limit) {
    rows = rows.slice(0, Number(limit));
  }

  return json({ workers: rows.map(serializeWorkerListing) });
}

async function getWorker(id) {
  const { data, error } = await getServiceClient()
    .from('worker_profiles')
    .select(SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('load worker failed', error);
    return json({ error: 'Could not load worker' }, 500);
  }
  if (!data) return json({ error: 'Worker not found' }, 404);

  return json({ worker: serializeWorkerListing(toRow(data)) });
}

export default async (req, context) => {
  if (req.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405);
  }
  if (context.params.id) {
    return getWorker(context.params.id);
  }
  return listWorkers(req);
};

export const config = { path: ['/api/workers', '/api/workers/:id'] };
