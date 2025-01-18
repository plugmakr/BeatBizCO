-- Drop existing triggers and functions
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- Drop existing policies
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update their own profile" on profiles;

-- Alter existing profiles table
alter table public.profiles 
    add column if not exists email text,
    add column if not exists is_email_verified boolean default false,
    add column if not exists last_sign_in timestamptz;

-- Add constraints after data migration
do $$
begin
    -- First, copy emails from auth.users
    update public.profiles p
    set email = u.email
    from auth.users u
    where p.id = u.id
    and p.email is null;

    -- Then add constraints
    if not exists (
        select 1
        from information_schema.table_constraints
        where table_name = 'profiles'
        and constraint_name = 'profiles_email_unique'
    ) then
        alter table public.profiles
            alter column email set not null,
            add constraint profiles_email_unique unique (email),
            add constraint profiles_email_check check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
    end if;
end $$;

-- Create index for faster lookups
create index if not exists profiles_email_idx on profiles(email);
create index if not exists profiles_role_idx on profiles(role);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create better RLS policies
create policy "Profiles are viewable by everyone"
    on profiles for select
    using (true);

create policy "Users can insert their own profile"
    on profiles for insert
    with check (
        auth.uid() = id
        and email = auth.email()
    );

create policy "Users can update their own profile"
    on profiles for update
    using (auth.uid() = id)
    with check (
        auth.uid() = id 
        and (
            case when auth.role() = 'authenticated' then
                case 
                    when old.role = 'guest' then true
                    else role = old.role
                end
            else false
            end
        )
    );

-- Create function to handle profile updates
create or replace function public.handle_user_update()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- Create trigger for profile updates
drop trigger if exists on_profile_updated on profiles;
create trigger on_profile_updated
    before update on profiles
    for each row
    execute procedure public.handle_user_update();

-- Create function to handle new user creation with retries
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
    retry_count int := 0;
    max_retries int := 3;
    success boolean := false;
begin
    while retry_count < max_retries and not success loop
        begin
            insert into public.profiles (
                id,
                email,
                role,
                created_at,
                updated_at
            )
            values (
                new.id,
                new.email,
                coalesce(new.raw_user_meta_data->>'role', 'guest'),
                now(),
                now()
            )
            on conflict (id) do nothing;

            success := true;
        exception when others then
            retry_count := retry_count + 1;
            if retry_count = max_retries then
                raise;
            end if;
            perform pg_sleep(0.1 * retry_count);
        end;
    end loop;

    return new;
end;
$$;

-- Create trigger for new user creation
create trigger on_auth_user_created
    after insert on auth.users
    for each row
    execute procedure public.handle_new_user();

-- Create function to handle email verification
create or replace function public.handle_email_verification()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    update profiles
    set is_email_verified = true
    where id = new.id;
    return new;
end;
$$;

-- Create trigger for email verification
drop trigger if exists on_email_verified on auth.users;
create trigger on_email_verified
    after update of email_confirmed_at on auth.users
    for each row
    when (old.email_confirmed_at is null and new.email_confirmed_at is not null)
    execute procedure public.handle_email_verification();

-- Create function to track last sign in
create or replace function public.handle_user_sign_in()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    update profiles
    set last_sign_in = now()
    where id = new.id;
    return new;
end;
$$;

-- Create trigger for sign ins
drop trigger if exists on_auth_sign_in on auth.users;
create trigger on_auth_sign_in
    after update of last_sign_in_at on auth.users
    for each row
    when (new.last_sign_in_at > old.last_sign_in_at)
    execute procedure public.handle_user_sign_in();
