import { getServiceClient, getUserFromRequest, json } from './_shared/supabase.js';

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const EXT_BY_TYPE = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return json({ error: 'Missing or invalid authentication token' }, 401);
  }

  const body = await req.json().catch(() => ({}));
  const { contentType, dataBase64 } = body ?? {};

  if (!contentType || !dataBase64) {
    return json({ error: 'contentType and dataBase64 are required' }, 400);
  }
  if (!ALLOWED_TYPES.has(contentType)) {
    return json({ error: 'Image must be JPEG, PNG, WEBP, or GIF' }, 400);
  }

  const bytes = Buffer.from(dataBase64, 'base64');
  if (bytes.length > MAX_BYTES) {
    return json({ error: 'Image must be smaller than 5MB' }, 400);
  }

  const supabase = getServiceClient();
  const path = `${authUser.id}/avatar.${EXT_BY_TYPE[contentType]}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(path, bytes, { contentType, upsert: true });

  if (uploadError) {
    console.error('avatar upload failed', uploadError);
    return json({ error: 'Could not upload image' }, 500);
  }

  const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(path);
  const avatarUrl = `${publicUrlData.publicUrl}?v=${Date.now()}`;

  const { error: updateError } = await supabase
    .from('users')
    .update({ profile_image: avatarUrl })
    .eq('id', authUser.id);

  if (updateError) {
    console.error('save avatar url failed', updateError);
    return json({ error: 'Could not save your new photo' }, 500);
  }

  return json({ avatarUrl });
};

export const config = { path: '/api/upload/avatar' };
