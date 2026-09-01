import { getServiceClient, json } from './_shared/supabase.js';
import { serializeService } from './_shared/serialize.js';

export default async () => {
  const { data, error } = await getServiceClient()
    .from('services')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('list services failed', error);
    return json({ error: 'Could not load services' }, 500);
  }

  return json({ services: data.map(serializeService) });
};

export const config = { path: '/api/services' };
