-- Drop everything and start fresh
drop policy if exists "Enable read access for all users" on profiles;
drop policy if exists "Enable insert for authenticated users only" on profiles;
drop policy if exists "Enable update for users based on id" on profiles;
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update their own profile" on profiles;
drop policy if exists "Users can update own profile role" on profiles;
drop policy if exists "profiles_select_policy" on profiles;
drop policy if exists "profiles_insert_policy" on profiles;
drop policy if exists "profiles_update_policy" on profiles;
drop policy if exists "profiles_update_basic_info" on profiles;
drop policy if exists "profiles_update_role" on profiles;

-- Drop all triggers
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists on_profile_updated on profiles;
drop trigger if exists on_email_verified on auth.users;
drop trigger if exists on_auth_sign_in on auth.users;

-- Drop all functions
drop function if exists public.handle_new_user();
drop function if exists public.handle_user_update();
drop function if exists public.handle_email_verification();
drop function if exists public.handle_user_sign_in();

-- Drop and recreate profiles table
drop table if exists profiles;

create table profiles (
    id uuid references auth.users(id) primary key,
    role text not null default 'guest',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Basic RLS
alter table profiles enable row level security;

create policy "Anyone can read profiles"
    on profiles for select
    using (true);

create policy "Users can update own profile"
    on profiles for update
    using (auth.uid() = id);

-- Create index
create index if not exists profiles_role_idx on profiles(role);
