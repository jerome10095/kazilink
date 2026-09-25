import { getServiceClient, json } from './_shared/supabase.js';

async function count(query) {
  const { count: total, error } = await query;
  if (error) throw error;
  return total ?? 0;
}

export default async (req) => {
  if (req.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const supabase = getServiceClient();
  const head = { count: 'exact', head: true };

  try {
    const [workers, verifiedWorkers, employers, hires, trainingSessions, ratings] = await Promise.all([
      count(supabase.from('worker_profiles').select('id', head)),
      count(supabase.from('worker_profiles').select('id', head).eq('verified', true)),
      count(supabase.from('employer_profiles').select('id', head)),
      count(supabase.from('hire_requests').select('id', head).eq('status', 'accepted')),
      count(supabase.from('training').select('id', head)),
      supabase.from('reviews').select('rating'),
    ]);

    if (ratings.error) throw ratings.error;
    const reviewCount = ratings.data.length;
    const averageRating = reviewCount
      ? ratings.data.reduce((sum, row) => sum + row.rating, 0) / reviewCount
      : null;

    return json({
      stats: {
        workers,
        verifiedWorkers,
        employers,
        hires,
        trainingSessions,
        reviewCount,
        // Whole-number percentage of the 5-star scale; null until someone leaves a review.
        satisfaction: averageRating === null ? null : Math.round((averageRating / 5) * 100),
      },
    });
  } catch (error) {
    console.error('load stats failed', error);
    return json({ error: 'Could not load stats' }, 500);
  }
};

export const config = { path: '/api/stats' };
