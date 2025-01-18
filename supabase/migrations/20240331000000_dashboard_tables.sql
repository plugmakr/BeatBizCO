-- Create marketplace_items table
CREATE TABLE IF NOT EXISTS marketplace_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    producer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    license_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create marketplace_sales table
CREATE TABLE IF NOT EXISTS marketplace_sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID REFERENCES marketplace_items(id) ON DELETE CASCADE,
    buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create collaboration_projects table
CREATE TABLE IF NOT EXISTS collaboration_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'in_progress',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create project_collaborators table
CREATE TABLE IF NOT EXISTS project_collaborators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES collaboration_projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(project_id, user_id)
);

-- Add RLS policies
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_collaborators ENABLE ROW LEVEL SECURITY;

-- Marketplace items policies
CREATE POLICY "Users can view all marketplace items"
    ON marketplace_items FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Producers can insert their own items"
    ON marketplace_items FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = producer_id);

CREATE POLICY "Producers can update their own items"
    ON marketplace_items FOR UPDATE
    TO authenticated
    USING (auth.uid() = producer_id)
    WITH CHECK (auth.uid() = producer_id);

-- Marketplace sales policies
CREATE POLICY "Users can view their own purchases"
    ON marketplace_sales FOR SELECT
    TO authenticated
    USING (auth.uid() = buyer_id OR auth.uid() IN (
        SELECT producer_id FROM marketplace_items WHERE id = item_id
    ));

CREATE POLICY "Users can insert their own purchases"
    ON marketplace_sales FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = buyer_id);

-- Collaboration projects policies
CREATE POLICY "Users can view their collaborations"
    ON collaboration_projects FOR SELECT
    TO authenticated
    USING (
        auth.uid() = created_by OR 
        auth.uid() IN (
            SELECT user_id FROM project_collaborators WHERE project_id = id
        )
    );

CREATE POLICY "Users can create projects"
    ON collaboration_projects FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Project owners can update their projects"
    ON collaboration_projects FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

-- Project collaborators policies
CREATE POLICY "Users can view their project memberships"
    ON project_collaborators FOR SELECT
    TO authenticated
    USING (
        auth.uid() = user_id OR 
        auth.uid() IN (
            SELECT created_by FROM collaboration_projects WHERE id = project_id
        )
    );

CREATE POLICY "Project owners can manage collaborators"
    ON project_collaborators FOR ALL
    TO authenticated
    USING (
        auth.uid() IN (
            SELECT created_by FROM collaboration_projects WHERE id = project_id
        )
    );

-- Set seth@audicode.com as admin
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'seth@audicode.com';
