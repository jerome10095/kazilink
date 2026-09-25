// Seeds the service catalog (categories such as Plumbing, Electrical...).
// This is reference content only. It creates no users, workers, ratings or
// counts: those all come from real sign-ups and real activity.
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

loadEnv();

const REQUIRED_ENV = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(`Missing required environment variables: ${missingEnv.join(', ')}. Fill them in .env.`);
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const catalog = JSON.parse(readFileSync(new URL('./services.catalog.json', import.meta.url), 'utf8'));

async function main() {
  for (const service of catalog) {
    const { error } = await supabase.from('services').upsert(
      {
        title: service.title,
        title_rw: service.titleRw ?? null,
        description: service.description,
        description_rw: service.descriptionRw ?? null,
        icon: service.icon,
        color: service.color,
      },
      { onConflict: 'title' }
    );
    if (error) throw error;
  }
  console.log(`Seeded ${catalog.length} service categories.`);
}

main().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
