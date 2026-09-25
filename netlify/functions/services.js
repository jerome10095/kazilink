import { getServiceClient, json } from './_shared/supabase.js';
import { serializeService } from './_shared/serialize.js';

export default async () => {
  const supabase = getServiceClient();

  const [servicesResult, workersResult] = await Promise.all([
    supabase.from('services').select('*').order('title', { ascending: true }),
    supabase.from('worker_profiles').select('service_id').not('service_id', 'is', null),
  ]);

  if (servicesResult.error || workersResult.error) {
    console.error('list services failed', servicesResult.error ?? workersResult.error);
    return json({ error: 'Could not load services' }, 500);
  }

  const counts = new Map();
  for (const { service_id: serviceId } of workersResult.data) {
    counts.set(serviceId, (counts.get(serviceId) ?? 0) + 1);
  }

  const services = servicesResult.data.map((row) => serializeService(row, counts.get(row.id) ?? 0));
  return json({ services });
};

export const config = { path: '/api/services' };
