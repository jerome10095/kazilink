import { getServiceClient, getUserFromRequest, json } from './_shared/supabase.js';
import { serializeAccount } from './_shared/serialize.js';

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return json({ error: 'Missing or invalid authentication token' }, 401);
  }

  const body = await req.json().catch(() => ({}));
  const {
    fullName, phone, role,
    serviceId, trade, tradeRw, bio, bioRw, location, experienceYears, rate,
    companyName, companyDescription, industry, website,
  } = body ?? {};

  const resolvedRole = role === 'employer' ? 'employer' : 'worker';
  if (resolvedRole === 'worker' && !trade && !serviceId) {
    return json({ error: 'A service category or trade is required for worker accounts' }, 400);
  }
  if (resolvedRole === 'employer' && !companyName) {
    return json({ error: 'companyName is required for employer accounts' }, 400);
  }

  const supabase = getServiceClient();

  // A worker's category comes from the real services list; the trade text
  // defaults to the category name when they don't give a more specific one.
  let service = null;
  if (resolvedRole === 'worker' && serviceId) {
    const { data } = await supabase.from('services').select('id, title, title_rw').eq('id', serviceId).maybeSingle();
    if (!data) return json({ error: 'Unknown service category' }, 400);
    service = data;
  }

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('id', authUser.id)
    .maybeSingle();
  if (existing) {
    return json({ error: 'Profile already completed' }, 409);
  }

  const resolvedFullName = fullName || authUser.user_metadata?.full_name || authUser.email;

  const { data: profileRow, error: profileError } = await supabase
    .from('users')
    .insert({
      id: authUser.id,
      full_name: resolvedFullName,
      email: authUser.email,
      role: resolvedRole,
      phone: phone ?? null,
      profile_image: authUser.user_metadata?.avatar_url ?? null,
    })
    .select()
    .single();

  if (profileError) {
    console.error('create profile failed', profileError);
    return json({ error: 'Could not create account' }, 500);
  }

  let roleRow = null;
  if (resolvedRole === 'worker') {
    const { data, error } = await supabase
      .from('worker_profiles')
      .insert({
        user_id: authUser.id,
        service_id: service?.id ?? null,
        trade: trade || service.title,
        trade_rw: tradeRw || (trade ? null : service.title_rw),
        bio: bio ?? null,
        bio_rw: bioRw ?? null,
        location: location || 'Kigali, Rwanda',
        experience_years: experienceYears ?? 0,
        rate: rate ?? 0,
      })
      .select()
      .single();
    if (error) {
      console.error('create worker profile failed', error);
      await supabase.from('users').delete().eq('id', authUser.id);
      return json({ error: 'Could not create account' }, 500);
    }
    roleRow = { ...data, skills: [] };
  } else {
    const { data, error } = await supabase
      .from('employer_profiles')
      .insert({
        user_id: authUser.id,
        company_name: companyName,
        company_description: companyDescription ?? null,
        industry: industry ?? null,
        location: location ?? null,
        website: website ?? null,
      })
      .select()
      .single();
    if (error) {
      console.error('create employer profile failed', error);
      await supabase.from('users').delete().eq('id', authUser.id);
      return json({ error: 'Could not create account' }, 500);
    }
    roleRow = data;
  }

  return json({ user: serializeAccount(profileRow, roleRow) }, 201);
};

export const config = { path: '/api/auth/complete-profile' };
