// Removes the fake demo accounts the old seed script created.
//
//   node supabase/remove-demo-accounts.mjs            -> dry run, deletes nothing
//   node supabase/remove-demo-accounts.mjs --confirm  -> deletes them
//
// It only ever touches accounts whose email ends in @kazilink.rw, i.e. the
// ones the old seed created. Real sign-ups are never matched. Deleting an auth
// user cascades to their profile, worker/employer profile, hire requests and
// reviews.
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

loadEnv();

const DEMO_DOMAIN = '@kazilink.rw';
const confirm = process.argv.includes('--confirm');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const mask = (email) => email.replace(/^(.{2}).*(@.*)$/, '$1***$2');

async function main() {
  const { data, error } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (error) throw error;

  const demo = data.users.filter((user) => user.email?.toLowerCase().endsWith(DEMO_DOMAIN));
  const others = data.users.length - demo.length;

  console.log(`Found ${data.users.length} accounts: ${demo.length} demo (${DEMO_DOMAIN}), ${others} others (kept).`);
  demo.forEach((user) => console.log(`  ${confirm ? 'deleting' : 'would delete'}: ${mask(user.email)}`));

  if (!confirm) {
    console.log('\nDry run only. Re-run with --confirm to delete these accounts.');
    return;
  }

  for (const user of demo) {
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
    if (deleteError) throw deleteError;
  }
  console.log(`\nDeleted ${demo.length} demo accounts.`);
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
