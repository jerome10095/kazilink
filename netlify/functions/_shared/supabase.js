import { createClient } from '@supabase/supabase-js';

let serviceClient = null;

export function getServiceClient() {
  if (serviceClient) return serviceClient;
  serviceClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return serviceClient;
}

export async function getUserFromRequest(req) {
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return null;

  const { data, error } = await getServiceClient().auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

export function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
