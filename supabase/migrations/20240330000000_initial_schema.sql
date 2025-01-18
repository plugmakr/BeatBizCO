-- Create enums
create type user_role as enum ('guest', 'artist', 'producer', 'admin');
create type project_status as enum ('draft', 'in_progress', 'completed', 'archived');
create type license_type as enum ('basic', 'premium', 'exclusive');

-- Create profiles table first (core table)
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    role user_role not null default 'guest',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create artist profiles
create table public.artist_profiles (
    id uuid references auth.users on delete cascade primary key,
    name text,
    bio text,
    social_links jsonb,
    preferences jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create buyer profiles
create table public.buyer_profiles (
    id uuid references auth.users on delete cascade primary key,
    preferences jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create producer settings
create table public.producer_settings (
    producer_id uuid references auth.users on delete cascade primary key,
    settings jsonb,
    notification_preferences jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create beats table
create table public.beats (
    id uuid primary key default gen_random_uuid(),
    producer_id uuid references profiles(id) on delete cascade,
    title text not null,
    description text,
    audio_url text,
    image_url text,
    bpm integer,
    key text,
    tags text[],
    is_public boolean default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create marketplace items
create table public.marketplace_items (
    id uuid primary key default gen_random_uuid(),
    producer_id uuid references profiles(id) on delete cascade,
    beat_id uuid references beats(id) on delete cascade,
    title text not null,
    description text,
    price decimal(10,2) not null,
    license_type license_type not null,
    is_active boolean default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create marketplace categories
create table public.marketplace_categories (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    description text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create marketplace sales
create table public.marketplace_sales (
    id uuid primary key default gen_random_uuid(),
    item_id uuid references marketplace_items(id) on delete set null,
    buyer_id uuid references profiles(id) on delete set null,
    amount decimal(10,2) not null,
    status text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create marketplace analytics
create table public.marketplace_analytics (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id) on delete cascade,
    event_type text not null,
    event_data jsonb,
    created_at timestamptz not null default now()
);

-- Create collaboration projects
create table public.collaboration_projects (
    id uuid primary key default gen_random_uuid(),
    created_by uuid references profiles(id) on delete cascade,
    title text not null,
    description text,
    status project_status not null default 'draft',
    settings jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create project collaborators
create table public.project_collaborators (
    project_id uuid references collaboration_projects(id) on delete cascade,
    user_id uuid references profiles(id) on delete cascade,
    role text not null,
    permissions jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (project_id, user_id)
);

-- Create project files
create table public.project_files (
    id uuid primary key default gen_random_uuid(),
    project_id uuid references collaboration_projects(id) on delete cascade,
    uploaded_by uuid references profiles(id) on delete set null,
    file_name text not null,
    file_type text not null,
    file_url text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create project notes
create table public.project_notes (
    id uuid primary key default gen_random_uuid(),
    project_id uuid references collaboration_projects(id) on delete cascade,
    created_by uuid references profiles(id) on delete set null,
    content text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create sound library
create table public.sound_library (
    id uuid primary key default gen_random_uuid(),
    producer_id uuid references profiles(id) on delete cascade,
    name text not null,
    description text,
    is_public boolean default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create sound library folders
create table public.sound_library_folders (
    id uuid primary key default gen_random_uuid(),
    library_id uuid references sound_library(id) on delete cascade,
    producer_id uuid references profiles(id) on delete cascade,
    name text not null,
    parent_folder_id uuid references sound_library_folders(id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create sound library files
create table public.sound_library_files (
    id uuid primary key default gen_random_uuid(),
    folder_id uuid references sound_library_folders(id) on delete cascade,
    file_name text not null,
    file_type text not null,
    file_url text not null,
    created_by uuid references profiles(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create messages
create table public.messages (
    id uuid primary key default gen_random_uuid(),
    sender_id uuid references profiles(id) on delete set null,
    receiver_id uuid references profiles(id) on delete set null,
    content text not null,
    is_read boolean default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create notifications
create table public.notifications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references profiles(id) on delete cascade,
    type text not null,
    content text not null,
    is_read boolean default false,
    data jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create reviews
create table public.reviews (
    id uuid primary key default gen_random_uuid(),
    reviewer_id uuid references profiles(id) on delete set null,
    item_id uuid references marketplace_items(id) on delete cascade,
    rating integer not null check (rating >= 1 and rating <= 5),
    content text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create basic RLS policies
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Create indexes
create index profiles_role_idx on profiles(role);
create index beats_producer_id_idx on beats(producer_id);
create index marketplace_items_producer_id_idx on marketplace_items(producer_id);
create index marketplace_items_beat_id_idx on marketplace_items(beat_id);
create index marketplace_sales_buyer_id_idx on marketplace_sales(buyer_id);
create index project_files_project_id_idx on project_files(project_id);
create index messages_sender_receiver_idx on messages(sender_id, receiver_id);
create index notifications_user_id_idx on notifications(user_id);
