-- Fix profiles table id column to work with Clerk user IDs
-- The id column should be text to match Clerk user IDs, not UUID

-- Drop the primary key constraint temporarily
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_pkey;

-- Drop the derived view while changing the underlying column type.
DROP VIEW IF EXISTS public.admin_users_view;

-- Convert id column to text to match Clerk user IDs
ALTER TABLE public.profiles 
    ALTER COLUMN id TYPE text USING id::text;

-- Recreate the primary key constraint
ALTER TABLE public.profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);

-- Update the comment to reflect the change
COMMENT ON COLUMN public.profiles.id IS 'Primary key - can be either UUID or Clerk user ID string';

-- Ensure the unique constraint on user_id is still valid.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_user_id_key') THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);
  END IF;
END;
$$;

-- Update the trigger function to handle text IDs
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger if it doesn't exist
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at 
    BEFORE UPDATE ON public.profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Recreate the view after the profile ID type conversion.
CREATE OR REPLACE VIEW public.admin_users_view AS
SELECT
    p.id,
    p.user_id,
    p.email,
    p.email_verified,
    p.first_name,
    p.last_name,
    p.full_name,
    p.username,
    p.phone,
    p.avatar_url,
    p.role,
    p.clerk_created_at,
    p.clerk_last_sign_in_at,
    p.created_at,
    p.updated_at,
    p.public_metadata,
    p.private_metadata,
    p.unsafe_metadata
FROM public.profiles p;

GRANT SELECT ON public.admin_users_view TO authenticated;
GRANT SELECT ON public.admin_users_view TO service_role;