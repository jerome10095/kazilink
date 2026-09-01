import { getServiceClient, json } from './_shared/supabase.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const body = await req.json().catch(() => ({}));
  const { name, email, phone, subject, message } = body ?? {};

  if (!name || !email || !message) {
    return json({ error: 'name, email, and message are required' }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: 'Enter a valid email address' }, 400);
  }

  const { error } = await getServiceClient()
    .from('contact_messages')
    .insert({ name, email, phone: phone ?? null, subject: subject ?? null, message });

  if (error) {
    console.error('save contact message failed', error);
    return json({ error: 'Could not send your message' }, 500);
  }

  return json({ ok: true }, 201);
};

export const config = { path: '/api/contact' };
