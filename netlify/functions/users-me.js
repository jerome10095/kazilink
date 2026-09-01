import { getServiceClient, getUserFromRequest, json } from './_shared/supabase.js';
import { serializeAccount } from './_shared/serialize.js';

async function loadAccount(supabase, userId) {
  const { data: profileRow } = await supabase.from('users').select('*').eq('id', userId).maybeSingle();
  if (!profileRow) return null;

  let roleRow = null;
  if (profileRow.role === 'worker') {
    const { data } = await supabase
      .from('worker_profiles')
      .select('*, worker_skills ( skills ( name ) )')
      .eq('user_id', userId)
      .maybeSingle();
    if (data) {
      roleRow = {
        ...data,
        skills: (data.worker_skills ?? []).map((ws) => ws.skills?.name).filter(Boolean).sort(),
      };
    }
  } else if (profileRow.role === 'employer') {
    const { data } = await supabase.from('employer_profiles').select('*').eq('user_id', userId).maybeSingle();
    roleRow = data ?? null;
  }
  return serializeAccount(profileRow, roleRow);
}

const USER_FIELDS = { fullName: 'full_name', phone: 'phone' };
const WORKER_FIELDS = {
  trade: 'trade',
  tradeRw: 'trade_rw',
  bio: 'bio',
  bioRw: 'bio_rw',
  location: 'location',
  experienceYears: 'experience_years',
  rate: 'rate',
  available: 'available',
};
const EMPLOYER_FIELDS = {
  companyName: 'company_name',
  companyDescription: 'company_description',
  industry: 'industry',
  location: 'location',
  website: 'website',
};

function buildUpdate(fieldMap, payload) {
  const update = {};
  for (const [key, column] of Object.entries(fieldMap)) {
    if (payload[key] !== undefined) update[column] = payload[key];
  }
  return update;
}

export default async (req) => {
  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return json({ error: 'Missing or invalid authentication token' }, 401);
  }

  const supabase = getServiceClient();

  if (req.method === 'GET') {
    const account = await loadAccount(supabase, authUser.id);
    if (!account) return json({ error: 'Account not found' }, 404);
    return json({ user: account });
  }

  if (req.method === 'PUT') {
    const payload = await req.json().catch(() => ({}));

    const { data: profileRow } = await supabase.from('users').select('role').eq('id', authUser.id).maybeSingle();
    if (!profileRow) return json({ error: 'Account not found' }, 404);

    const userUpdate = buildUpdate(USER_FIELDS, payload);
    if (Object.keys(userUpdate).length > 0) {
      const { error } = await supabase.from('users').update(userUpdate).eq('id', authUser.id);
      if (error) {
        console.error('update profile failed', error);
        return json({ error: 'Could not update profile' }, 500);
      }
    }

    if (profileRow.role === 'worker') {
      const workerUpdate = buildUpdate(WORKER_FIELDS, payload);
      if (Object.keys(workerUpdate).length > 0) {
        const { error } = await supabase.from('worker_profiles').update(workerUpdate).eq('user_id', authUser.id);
        if (error) {
          console.error('update worker profile failed', error);
          return json({ error: 'Could not update profile' }, 500);
        }
      }
    } else if (profileRow.role === 'employer') {
      const employerUpdate = buildUpdate(EMPLOYER_FIELDS, payload);
      if (Object.keys(employerUpdate).length > 0) {
        const { error } = await supabase.from('employer_profiles').update(employerUpdate).eq('user_id', authUser.id);
        if (error) {
          console.error('update employer profile failed', error);
          return json({ error: 'Could not update profile' }, 500);
        }
      }
    }

    const account = await loadAccount(supabase, authUser.id);
    return json({ user: account });
  }

  return json({ error: 'Method not allowed' }, 405);
};

export const config = { path: '/api/users/me' };
