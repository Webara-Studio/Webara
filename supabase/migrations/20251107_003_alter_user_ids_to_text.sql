-- Align core tables with Clerk string-based user IDs

-- Drop foreign keys that still point to auth.users as UUID
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;
ALTER TABLE public.businesses DROP CONSTRAINT IF EXISTS businesses_owner_id_fkey;
ALTER TABLE public.quotes DROP CONSTRAINT IF EXISTS quotes_user_id_fkey;

-- Policies depend on the UUID column type. Drop them before conversion;
-- the Supabase Auth cutover migration recreates the final policies.
DO $$
DECLARE
  policy record;
BEGIN
  FOR policy IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('profiles', 'businesses', 'quotes')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', policy.policyname, policy.schemaname, policy.tablename);
  END LOOP;
END;
$$;

-- Convert identifiers to text so we can store Clerk IDs (e.g. "user_123")
ALTER TABLE public.profiles
    ALTER COLUMN user_id TYPE text USING user_id::text,
    ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE public.businesses
    ALTER COLUMN owner_id TYPE text USING owner_id::text,
    ALTER COLUMN owner_id SET NOT NULL;

ALTER TABLE public.quotes
    ALTER COLUMN user_id TYPE text USING user_id::text,
    ALTER COLUMN user_id SET NOT NULL;

-- Ensure metadata reflects the new semantics
COMMENT ON COLUMN public.profiles.user_id IS 'Clerk user ID (JWT sub)';
COMMENT ON COLUMN public.businesses.owner_id IS 'Clerk user ID (JWT sub)';
COMMENT ON COLUMN public.quotes.user_id IS 'Clerk user ID (JWT sub)';
