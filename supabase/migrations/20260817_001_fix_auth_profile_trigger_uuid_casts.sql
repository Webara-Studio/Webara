-- Align Auth trigger functions with the text-based profile user_id contract.
-- Supabase Auth stores auth.users.id as uuid; public.profiles.user_id is text
-- for compatibility with the legacy Clerk migration history.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = NEW.id::text
  ) THEN
    INSERT INTO public.profiles (user_id, full_name, role)
    VALUES (
      NEW.id::text,
      COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
      CASE
        WHEN NEW.raw_user_meta_data->>'role' IN ('admin', 'webara_staff')
        THEN NEW.raw_user_meta_data->>'role'
        ELSE 'user'
      END
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.sync_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET role = CASE
    WHEN NEW.raw_user_meta_data->>'role' IN ('admin', 'webara_staff')
    THEN NEW.raw_user_meta_data->>'role'
    ELSE 'user'
  END
  WHERE user_id = NEW.id::text;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN COALESCE(
    (
      SELECT role
      FROM public.profiles
      WHERE profiles.user_id = get_user_role.user_id::text
    ),
    'user'
  );
END;
$$;
