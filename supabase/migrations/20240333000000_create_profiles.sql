-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'artist',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT valid_role CHECK (role IN ('admin', 'artist', 'producer'))
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- Create profiles for existing users
INSERT INTO public.profiles (id, role, created_at, updated_at)
SELECT 
    id,
    'admin',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM auth.users
WHERE email = 'seth@audicode.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';

-- Create profiles for other existing users
INSERT INTO public.profiles (id, role, created_at, updated_at)
SELECT 
    id,
    'artist',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM auth.users
WHERE email != 'seth@audicode.com'
ON CONFLICT (id) DO NOTHING;

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, role)
    VALUES (new.id, 'artist')
    ON CONFLICT (id) DO NOTHING;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
