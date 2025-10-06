-- Drop the old constraint
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS valid_project_type;

-- Add the new constraint including 'opensource'
ALTER TABLE public.projects 
ADD CONSTRAINT valid_project_type 
CHECK (project_type IN ('web', 'python', 'datascience', 'opensource'));