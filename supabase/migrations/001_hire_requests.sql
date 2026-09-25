-- ============================================================
-- HIRE REQUESTS
-- An employer asks a specific worker to take a job; the worker
-- accepts or declines. Safe to run on a live database (no drops).
-- Also included in schema.sql for fresh installs.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.hire_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    employer_id UUID NOT NULL
        REFERENCES public.employer_profiles(id) ON DELETE CASCADE,

    worker_id UUID NOT NULL
        REFERENCES public.worker_profiles(id) ON DELETE CASCADE,

    job_title VARCHAR(200),

    message TEXT NOT NULL,

    proposed_rate NUMERIC(10,2),

    status VARCHAR(30) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- One open request per employer/worker pair.
CREATE UNIQUE INDEX IF NOT EXISTS uniq_hire_requests_pending
ON public.hire_requests(employer_id, worker_id)
WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_hire_requests_worker
ON public.hire_requests(worker_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_hire_requests_employer
ON public.hire_requests(employer_id, created_at DESC);

DROP TRIGGER IF EXISTS hire_requests_updated_at ON public.hire_requests;

CREATE TRIGGER hire_requests_updated_at
BEFORE UPDATE ON public.hire_requests
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Same access model as every other table: RLS on, no policies,
-- Netlify Functions reach it through service_role.
ALTER TABLE public.hire_requests ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.hire_requests TO service_role;
