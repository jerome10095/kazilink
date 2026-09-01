import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { services } from '../src/data/services.js';
import { workers } from '../src/data/workers.js';

loadEnv();

const SEED_PASSWORD = 'ChangeMe123!';

const REQUIRED_ENV = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(`Missing required environment variables: ${missingEnv.join(', ')}. Fill them in .env.`);
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function emailFor(name) {
  return `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@kazilink.rw`;
}

async function seedServices() {
  for (const service of services) {
    const { error } = await supabase
      .from('services')
      .upsert(
        {
          title: service.title,
          title_rw: service.titleRw ?? null,
          description: service.description,
          description_rw: service.descriptionRw ?? null,
          icon: service.icon,
          color: service.color,
          worker_count: service.workers ?? 0,
        },
        { onConflict: 'title' }
      );
    if (error) throw error;
  }
  console.log(`Seeded ${services.length} services.`);
}

async function getOrCreateSkillId(name) {
  const { data: existing, error: selectError } = await supabase.from('skills').select('id').eq('name', name).maybeSingle();
  if (selectError) throw selectError;
  if (existing) return existing.id;

  const { data: created, error: insertError } = await supabase.from('skills').insert({ name }).select('id').single();
  if (insertError) throw insertError;
  return created.id;
}

async function seedWorkers() {
  let created = 0;

  for (const worker of workers) {
    const email = emailFor(worker.name);

    const { data: existingProfile } = await supabase.from('users').select('id').eq('email', email).maybeSingle();
    if (existingProfile) continue;

    const { data: authResult, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: SEED_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: worker.name },
    });

    let userId;
    if (authError) {
      if (authError.code !== 'email_exists') throw authError;
      const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
      if (listError) throw listError;
      const match = listData.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
      if (!match) throw authError;
      userId = match.id;
    } else {
      userId = authResult.user.id;
    }

    const { error: profileError } = await supabase.from('users').insert({
      id: userId,
      full_name: worker.name,
      email,
      role: 'worker',
    });
    if (profileError) throw profileError;

    const { data: workerProfile, error: workerError } = await supabase
      .from('worker_profiles')
      .insert({
        user_id: userId,
        trade: worker.trade,
        trade_rw: worker.tradeRw ?? null,
        bio: worker.bio ?? null,
        bio_rw: worker.bioRw ?? null,
        location: worker.location,
        experience_years: worker.experience,
        rate: worker.rate,
        rating: worker.rating,
        review_count: worker.reviewCount,
        verified: worker.verified,
        available: worker.available,
      })
      .select('id')
      .single();
    if (workerError) throw workerError;

    for (const skillName of worker.skills ?? []) {
      const skillId = await getOrCreateSkillId(skillName);
      const { error: linkError } = await supabase
        .from('worker_skills')
        .upsert({ worker_id: workerProfile.id, skill_id: skillId }, { onConflict: 'worker_id,skill_id' });
      if (linkError) throw linkError;
    }

    created += 1;
  }

  console.log(`Seeded ${created} new worker accounts (skipped ${workers.length - created} already present).`);
  if (created > 0) {
    console.log(`Seed worker login password: ${SEED_PASSWORD} (change these in production).`);
  }
}

async function main() {
  await seedServices();
  await seedWorkers();
}

main().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
