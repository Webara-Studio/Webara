-- Drop existing policies that use JWT claims
DROP POLICY IF EXISTS "Webara staff full access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Webara staff full access to businesses" ON public.businesses;
DROP POLICY IF EXISTS "Webara staff full access to quotes" ON public.quotes;

-- Create new policies using role field from profiles

-- Profiles policies
CREATE POLICY "Admins full access to profiles" ON public.profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND p.role = 'admin'
        )
    );

CREATE POLICY "Webara staff full access to profiles" ON public.profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND p.role = 'webara_staff'
        )
    );

-- Businesses policies
CREATE POLICY "Admins full access to businesses" ON public.businesses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND p.role = 'admin'
        )
    );

CREATE POLICY "Webara staff full access to businesses" ON public.businesses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND p.role = 'webara_staff'
        )
    );

-- Quotes policies
CREATE POLICY "Admins full access to quotes" ON public.quotes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND p.role = 'admin'
        )
    );

CREATE POLICY "Webara staff full access to quotes" ON public.quotes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND p.role = 'webara_staff'
        )
    );

-- Grant admins and staff access to optional supporting tables when present.
-- These tables are not required by every Webara deployment, so keep the
-- migration additive and avoid failing a deployment that does not use them.
DO $$
DECLARE
    table_name text;
    policy_name text;
BEGIN
    FOREACH table_name IN ARRAY ARRAY[
        'quote_activities',
        'projects',
        'project_milestones',
        'project_documents',
        'audit_logs'
    ] LOOP
        IF to_regclass(format('public.%I', table_name)) IS NOT NULL THEN
            policy_name := CASE table_name
                WHEN 'quote_activities' THEN 'Admins full access to quote_activities'
                WHEN 'projects' THEN 'Admins full access to projects'
                WHEN 'project_milestones' THEN 'Admins full access to project_milestones'
                WHEN 'project_documents' THEN 'Admins full access to project_documents'
                ELSE 'Admins full access to audit_logs'
            END;
            EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', policy_name, table_name);
            EXECUTE format(
                'CREATE POLICY %I ON public.%I FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.role IN (''admin'', ''webara_staff'')))',
                policy_name,
                table_name
            );
        END IF;
    END LOOP;
END;
$$;