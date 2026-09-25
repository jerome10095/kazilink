-- ============================================================
-- KAZILINK DATABASE SCHEMA
-- Supabase / PostgreSQL
--
-- Pre-launch reset: drops any earlier draft of these tables so
-- this file is the single source of truth. Safe only because
-- there is no real user data yet.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS public.hire_requests CASCADE;
DROP TABLE IF EXISTS public.training_enrollments CASCADE;
DROP TABLE IF EXISTS public.training CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.contracts CASCADE;
DROP TABLE IF EXISTS public.applications CASCADE;
DROP TABLE IF EXISTS public.job_skills CASCADE;
DROP TABLE IF EXISTS public.jobs CASCADE;
DROP TABLE IF EXISTS public.verifications CASCADE;
DROP TABLE IF EXISTS public.worker_certifications CASCADE;
DROP TABLE IF EXISTS public.certifications CASCADE;
DROP TABLE IF EXISTS public.worker_skills CASCADE;
DROP TABLE IF EXISTS public.skills CASCADE;
DROP TABLE IF EXISTS public.contact_messages CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.employer_profiles CASCADE;
DROP TABLE IF EXISTS public.worker_profiles CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;


-- ============================================================
-- 1. USERS / PROFILES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,

    role VARCHAR(20) NOT NULL DEFAULT 'worker'
        CHECK (role IN ('worker', 'employer', 'admin')),

    phone VARCHAR(30),
    profile_image TEXT,

    location VARCHAR(150),
    bio TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 2. WORKER PROFILES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.worker_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    user_id UUID NOT NULL UNIQUE
        REFERENCES public.users(id) ON DELETE CASCADE,

    trade VARCHAR(100) NOT NULL,
    trade_rw VARCHAR(100),

    bio TEXT,
    bio_rw TEXT,

    location VARCHAR(150) NOT NULL DEFAULT 'Kigali, Rwanda',

    experience_years INTEGER NOT NULL DEFAULT 0
        CHECK (experience_years >= 0),

    rate NUMERIC(10,2) NOT NULL DEFAULT 0
        CHECK (rate >= 0),

    rating NUMERIC(2,1) NOT NULL DEFAULT 0
        CHECK (rating >= 0 AND rating <= 5),

    review_count INTEGER NOT NULL DEFAULT 0,

    verified BOOLEAN NOT NULL DEFAULT FALSE,

    available BOOLEAN NOT NULL DEFAULT TRUE,

    profile_image TEXT,

    -- Service category (set at sign-up); per-service worker counts are computed from this.
    service_id UUID,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 3. EMPLOYER PROFILES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.employer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    user_id UUID NOT NULL UNIQUE
        REFERENCES public.users(id) ON DELETE CASCADE,

    company_name VARCHAR(150),
    company_description TEXT,

    industry VARCHAR(100),

    location VARCHAR(150),

    website VARCHAR(255),

    company_logo TEXT,

    verified BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 4. SERVICES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    title VARCHAR(100) NOT NULL UNIQUE,
    title_rw VARCHAR(100),

    description TEXT,
    description_rw TEXT,

    icon VARCHAR(50),

    color VARCHAR(20) DEFAULT 'primary',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 5. SKILLS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name VARCHAR(100) NOT NULL UNIQUE,
    name_rw VARCHAR(100),

    category VARCHAR(100),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 6. WORKER SKILLS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.worker_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    worker_id UUID NOT NULL
        REFERENCES public.worker_profiles(id) ON DELETE CASCADE,

    skill_id UUID NOT NULL
        REFERENCES public.skills(id) ON DELETE CASCADE,

    skill_level VARCHAR(30)
        CHECK (
            skill_level IN (
                'beginner',
                'intermediate',
                'advanced',
                'expert'
            )
        ),

    years_experience INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(worker_id, skill_id)
);


-- ============================================================
-- 7. CERTIFICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name VARCHAR(150) NOT NULL,

    issuing_organization VARCHAR(150),

    description TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 8. WORKER CERTIFICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.worker_certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    worker_id UUID NOT NULL
        REFERENCES public.worker_profiles(id) ON DELETE CASCADE,

    certification_id UUID NOT NULL
        REFERENCES public.certifications(id) ON DELETE CASCADE,

    certificate_number VARCHAR(100),

    issued_date DATE,
    expiry_date DATE,

    certificate_url TEXT,

    verified BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(worker_id, certification_id)
);


-- ============================================================
-- 9. VERIFICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    user_id UUID NOT NULL
        REFERENCES public.users(id) ON DELETE CASCADE,

    verification_type VARCHAR(50) NOT NULL
        CHECK (
            verification_type IN (
                'identity',
                'phone',
                'email',
                'certificate',
                'background'
            )
        ),

    status VARCHAR(30) NOT NULL DEFAULT 'pending'
        CHECK (
            status IN (
                'pending',
                'approved',
                'rejected'
            )
        ),

    document_url TEXT,

    verified_by UUID REFERENCES public.users(id),

    verified_at TIMESTAMPTZ,

    rejection_reason TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 10. JOBS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    employer_id UUID NOT NULL
        REFERENCES public.employer_profiles(id)
        ON DELETE CASCADE,

    service_id UUID
        REFERENCES public.services(id)
        ON DELETE SET NULL,

    title VARCHAR(200) NOT NULL,

    description TEXT NOT NULL,

    location VARCHAR(150) NOT NULL,

    budget_min NUMERIC(10,2),
    budget_max NUMERIC(10,2),

    employment_type VARCHAR(50)
        CHECK (
            employment_type IN (
                'one_time',
                'part_time',
                'full_time',
                'contract'
            )
        ),

    status VARCHAR(30) NOT NULL DEFAULT 'open'
        CHECK (
            status IN (
                'open',
                'in_progress',
                'completed',
                'cancelled',
                'closed'
            )
        ),

    deadline DATE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 11. JOB SKILLS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.job_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    job_id UUID NOT NULL
        REFERENCES public.jobs(id) ON DELETE CASCADE,

    skill_id UUID NOT NULL
        REFERENCES public.skills(id) ON DELETE CASCADE,

    UNIQUE(job_id, skill_id)
);


-- ============================================================
-- 12. APPLICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    job_id UUID NOT NULL
        REFERENCES public.jobs(id) ON DELETE CASCADE,

    worker_id UUID NOT NULL
        REFERENCES public.worker_profiles(id)
        ON DELETE CASCADE,

    cover_letter TEXT,

    proposed_rate NUMERIC(10,2),

    status VARCHAR(30) NOT NULL DEFAULT 'pending'
        CHECK (
            status IN (
                'pending',
                'shortlisted',
                'accepted',
                'rejected',
                'withdrawn'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(job_id, worker_id)
);


-- ============================================================
-- 13. CONTRACTS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    job_id UUID NOT NULL
        REFERENCES public.jobs(id)
        ON DELETE CASCADE,

    employer_id UUID NOT NULL
        REFERENCES public.employer_profiles(id),

    worker_id UUID NOT NULL
        REFERENCES public.worker_profiles(id),

    application_id UUID
        REFERENCES public.applications(id),

    agreed_rate NUMERIC(10,2) NOT NULL,

    start_date DATE,
    end_date DATE,

    status VARCHAR(30) NOT NULL DEFAULT 'active'
        CHECK (
            status IN (
                'pending',
                'active',
                'completed',
                'cancelled',
                'disputed'
            )
        ),

    terms TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 14. REVIEWS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    contract_id UUID
        REFERENCES public.contracts(id)
        ON DELETE SET NULL,

    reviewer_id UUID NOT NULL
        REFERENCES public.users(id),

    reviewee_id UUID NOT NULL
        REFERENCES public.users(id),

    rating INTEGER NOT NULL
        CHECK (rating BETWEEN 1 AND 5),

    comment TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(contract_id, reviewer_id, reviewee_id)
);


-- ============================================================
-- 15. TRAINING
-- ============================================================

CREATE TABLE IF NOT EXISTS public.training (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    title VARCHAR(200) NOT NULL,

    title_rw VARCHAR(200),

    description TEXT,

    description_rw TEXT,

    instructor VARCHAR(150),

    category VARCHAR(100),

    duration_hours NUMERIC(5,2),

    location VARCHAR(150),

    online BOOLEAN DEFAULT FALSE,

    image_url TEXT,

    capacity INTEGER,

    start_date DATE,
    end_date DATE,

    status VARCHAR(30) DEFAULT 'upcoming'
        CHECK (
            status IN (
                'upcoming',
                'ongoing',
                'completed',
                'cancelled'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 16. TRAINING ENROLLMENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.training_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    training_id UUID NOT NULL
        REFERENCES public.training(id)
        ON DELETE CASCADE,

    user_id UUID NOT NULL
        REFERENCES public.users(id)
        ON DELETE CASCADE,

    status VARCHAR(30) DEFAULT 'enrolled'
        CHECK (
            status IN (
                'enrolled',
                'completed',
                'cancelled'
            )
        ),

    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    completed_at TIMESTAMPTZ,

    UNIQUE(training_id, user_id)
);


-- ============================================================
-- 17. CONTACT MESSAGES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name VARCHAR(150) NOT NULL,

    email VARCHAR(255) NOT NULL,

    phone VARCHAR(30),

    subject VARCHAR(200),

    message TEXT NOT NULL,

    status VARCHAR(30) DEFAULT 'new'
        CHECK (
            status IN (
                'new',
                'read',
                'replied',
                'closed'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 18. UPDATED_AT FUNCTION
-- ============================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ============================================================
-- 19. UPDATED_AT TRIGGERS
-- ============================================================

DROP TRIGGER IF EXISTS users_updated_at ON public.users;

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


DROP TRIGGER IF EXISTS worker_profiles_updated_at
ON public.worker_profiles;

CREATE TRIGGER worker_profiles_updated_at
BEFORE UPDATE ON public.worker_profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


DROP TRIGGER IF EXISTS employer_profiles_updated_at
ON public.employer_profiles;

CREATE TRIGGER employer_profiles_updated_at
BEFORE UPDATE ON public.employer_profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


DROP TRIGGER IF EXISTS services_updated_at
ON public.services;

CREATE TRIGGER services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


DROP TRIGGER IF EXISTS jobs_updated_at
ON public.jobs;

CREATE TRIGGER jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


DROP TRIGGER IF EXISTS applications_updated_at
ON public.applications;

CREATE TRIGGER applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


DROP TRIGGER IF EXISTS contracts_updated_at
ON public.contracts;

CREATE TRIGGER contracts_updated_at
BEFORE UPDATE ON public.contracts
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


DROP TRIGGER IF EXISTS training_updated_at
ON public.training;

CREATE TRIGGER training_updated_at
BEFORE UPDATE ON public.training
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- 17b. HIRE REQUESTS
-- An employer asks a specific worker to take a job; the worker
-- accepts or declines. (Also in migrations/001_hire_requests.sql)
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


-- worker_profiles is created before services, so the FK is added here.
ALTER TABLE public.worker_profiles DROP CONSTRAINT IF EXISTS worker_profiles_service_id_fkey;
ALTER TABLE public.worker_profiles
    ADD CONSTRAINT worker_profiles_service_id_fkey
    FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uniq_reviews_reviewer_reviewee
ON public.reviews(reviewer_id, reviewee_id);

CREATE INDEX IF NOT EXISTS idx_reviews_reviewee
ON public.reviews(reviewee_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_worker_profiles_service
ON public.worker_profiles(service_id);


-- ============================================================
-- 20. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_worker_profiles_trade
ON public.worker_profiles(trade);

CREATE INDEX IF NOT EXISTS idx_worker_profiles_location
ON public.worker_profiles(location);

CREATE INDEX IF NOT EXISTS idx_worker_profiles_verified
ON public.worker_profiles(verified);

CREATE INDEX IF NOT EXISTS idx_worker_profiles_available
ON public.worker_profiles(available);

CREATE INDEX IF NOT EXISTS idx_jobs_employer
ON public.jobs(employer_id);

CREATE INDEX IF NOT EXISTS idx_jobs_service
ON public.jobs(service_id);

CREATE INDEX IF NOT EXISTS idx_jobs_status
ON public.jobs(status);

CREATE INDEX IF NOT EXISTS idx_jobs_location
ON public.jobs(location);

CREATE INDEX IF NOT EXISTS idx_applications_job
ON public.applications(job_id);

CREATE INDEX IF NOT EXISTS idx_applications_worker
ON public.applications(worker_id);

CREATE INDEX IF NOT EXISTS idx_contracts_worker
ON public.contracts(worker_id);

CREATE INDEX IF NOT EXISTS idx_contracts_employer
ON public.contracts(employer_id);

CREATE INDEX IF NOT EXISTS idx_reviews_reviewee
ON public.reviews(reviewee_id);

CREATE INDEX IF NOT EXISTS idx_training_status
ON public.training(status);

CREATE INDEX IF NOT EXISTS idx_training_enrollments_user
ON public.training_enrollments(user_id);


-- ============================================================
-- 21. GRANTS
-- Dropping/recreating tables in the SQL editor doesn't always
-- carry over Supabase's default grants. service_role must be
-- able to read/write every table -- it's the only role our
-- Netlify Functions use, and RLS (below) locks everyone else out.
-- ============================================================

GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


-- ============================================================
-- 22. ROW LEVEL SECURITY
--
-- RLS is enabled with NO policies on every table. The anon /
-- authenticated Supabase keys can therefore read or write
-- nothing directly via PostgREST. All access goes through the
-- Netlify Functions in netlify/functions/, which use the
-- service_role key (server-side only) and bypass RLS entirely.
-- ============================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 23. STORAGE
-- Public bucket for profile avatars. Uploads always go through
-- netlify/functions/upload-avatar.js using the service_role key,
-- so no storage.objects policies are needed either -- the bucket
-- is just marked public so uploaded images are readable by URL.
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO UPDATE SET public = true;


-- ============================================================
-- END OF KAZILINK SCHEMA
-- ============================================================