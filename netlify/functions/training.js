import { getServiceClient, getUserFromRequest, json } from './_shared/supabase.js';
import { serializeTraining } from './_shared/serialize.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function listTraining(req, supabase) {
  const { data: sessions, error } = await supabase
    .from('training')
    .select('*')
    .neq('status', 'cancelled')
    .order('start_date', { ascending: true, nullsFirst: false });

  if (error) {
    console.error('list training failed', error);
    return json({ error: 'Could not load training' }, 500);
  }

  const { data: enrollments, error: enrollError } = await supabase
    .from('training_enrollments')
    .select('training_id, user_id')
    .neq('status', 'cancelled');
  if (enrollError) {
    console.error('list enrollments failed', enrollError);
    return json({ error: 'Could not load training' }, 500);
  }

  // Auth is optional here: signed-in users also learn which sessions they joined.
  const authUser = await getUserFromRequest(req);

  const counts = new Map();
  const mine = new Set();
  for (const row of enrollments) {
    counts.set(row.training_id, (counts.get(row.training_id) ?? 0) + 1);
    if (authUser && row.user_id === authUser.id) mine.add(row.training_id);
  }

  return json({
    training: sessions.map((row) => serializeTraining(row, counts.get(row.id) ?? 0, mine.has(row.id))),
  });
}

async function enroll(req, supabase, trainingId) {
  if (!UUID_RE.test(trainingId)) return json({ error: 'Training session not found' }, 404);

  const authUser = await getUserFromRequest(req);
  if (!authUser) return json({ error: 'Missing or invalid authentication token' }, 401);

  const { data: profile } = await supabase.from('users').select('id').eq('id', authUser.id).maybeSingle();
  if (!profile) return json({ error: 'Complete your profile first' }, 403);

  const { data: session } = await supabase.from('training').select('id, status, capacity').eq('id', trainingId).maybeSingle();
  if (!session || session.status === 'cancelled') return json({ error: 'Training session not found' }, 404);
  if (session.status === 'completed') return json({ error: 'This training session has already ended' }, 409);

  if (session.capacity) {
    const { count } = await supabase
      .from('training_enrollments')
      .select('id', { count: 'exact', head: true })
      .eq('training_id', trainingId)
      .neq('status', 'cancelled');
    if ((count ?? 0) >= session.capacity) return json({ error: 'This training session is full' }, 409);
  }

  const { error } = await supabase
    .from('training_enrollments')
    .upsert({ training_id: trainingId, user_id: authUser.id, status: 'enrolled' }, { onConflict: 'training_id,user_id' });
  if (error) {
    console.error('enroll failed', error);
    return json({ error: 'Could not enroll you' }, 500);
  }

  return json({ ok: true }, 201);
}

export default async (req, context) => {
  const supabase = getServiceClient();
  const trainingId = context.params.id;

  if (trainingId) {
    if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
    return enroll(req, supabase, trainingId);
  }
  if (req.method === 'GET') return listTraining(req, supabase);
  return json({ error: 'Method not allowed' }, 405);
};

export const config = { path: ['/api/training', '/api/training/:id/enroll'] };
