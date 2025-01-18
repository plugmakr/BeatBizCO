-- Drop all existing triggers and functions
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists on_profile_updated on profiles;
drop trigger if exists on_email_verified on auth.users;
drop trigger if exists on_auth_sign_in on auth.users;

drop function if exists public.handle_new_user();
drop function if exists public.handle_user_update();
drop function if exists public.handle_email_verification();
drop function if exists public.handle_user_sign_in();

-- Drop all existing policies
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update their own profile" on profiles;
drop policy if exists "Users can update own profile role" on profiles;
drop policy if exists "profiles_select_policy" on profiles;
drop policy if exists "profiles_insert_policy" on profiles;
drop policy if exists "profiles_update_policy" on profiles;
drop policy if exists "profiles_update_basic_info" on profiles;
drop policy if exists "profiles_update_role" on profiles;

-- Ensure columns exist
alter table public.profiles 
    add column if not exists email text,
    add column if not exists is_email_verified boolean default false,
    add column if not exists last_sign_in timestamptz;

-- Create simple RLS policies
create policy "Enable read access for all users"
    on profiles for select
    using (true);

create policy "Enable insert for authenticated users only"
    on profiles for insert
    with check (auth.role() = 'authenticated');

create policy "Enable update for users based on id"
    on profiles for update
    using (auth.uid() = id);

-- Create simple function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
    insert into public.profiles (id, email, role, created_at, updated_at)
    values (
        new.id,
        new.email,
        'guest',
        now(),
        now()
    );
    return new;
exception when others then
    return new; -- Continue even if profile creation fails
end;
$$;

-- Create simple trigger for new user creation
create trigger on_auth_user_created
    after insert on auth.users
    for each row
    execute function public.handle_new_user();

-- Update existing profiles with emails
update profiles p
set email = u.email
from auth.users u
where p.id = u.id
and p.email is null;
