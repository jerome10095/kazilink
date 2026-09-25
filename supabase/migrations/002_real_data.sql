-- ============================================================
-- REAL DATA
-- Replaces hand-typed numbers with values computed from real rows.
-- Safe to run on a live database.
-- ============================================================

-- 1. Workers belong to a service category, so per-service worker
--    counts can be computed instead of stored by hand.
ALTER TABLE public.worker_profiles
    ADD COLUMN IF NOT EXISTS service_id UUID
        REFERENCES public.services(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_worker_profiles_service
ON public.worker_profiles(service_id);

-- Best-effort backfill for existing workers: match on the trade text.
UPDATE public.worker_profiles w
SET service_id = s.id
FROM public.services s
WHERE w.service_id IS NULL
  AND (
    lower(w.trade) = lower(s.title)
    OR lower(w.trade) = lower(s.title_rw)
    OR lower(s.title) LIKE lower(w.trade) || '%'
    OR lower(w.trade) LIKE lower(s.title) || '%'
  );

-- 2. The stored worker_count was typed in by hand; it is now computed.
ALTER TABLE public.services DROP COLUMN IF EXISTS worker_count;

-- 3. One review per reviewer per reviewee (the old unique key included a
--    nullable contract_id, which never actually prevented duplicates).
CREATE UNIQUE INDEX IF NOT EXISTS uniq_reviews_reviewer_reviewee
ON public.reviews(reviewer_id, reviewee_id);

CREATE INDEX IF NOT EXISTS idx_reviews_reviewee
ON public.reviews(reviewee_id, created_at DESC);
