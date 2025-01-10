-- Add missing tables and relationships

-- Add artist_profiles table for extended artist information
create table if not exists public.artist_profiles (
    id uuid references auth.users on delete cascade primary key,
    genre text[],
    bio text,
    social_links jsonb,
    achievements text[],
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add buyer_profiles table for extended buyer information
create table if not exists public.buyer_profiles (
    id uuid references auth.users on delete cascade primary key,
    preferences jsonb,
    purchase_history jsonb[],
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add producer_settings table for producer-specific settings
create table if not exists public.producer_settings (
    producer_id uuid references auth.users on delete cascade primary key,
    marketplace_settings jsonb,
    notification_preferences jsonb,
    billing_info jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add analytics table for tracking various metrics
create table if not exists public.analytics (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users on delete cascade,
    event_type text not null,
    event_data jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add comments table for beats and marketplace items
create table if not exists public.comments (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users on delete cascade,
    item_type text not null,
    item_id uuid not null,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add playlists table
create table if not exists public.playlists (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users on delete cascade,
    name text not null,
    description text,
    is_public boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add playlist_items table
create table if not exists public.playlist_items (
    playlist_id uuid references public.playlists on delete cascade,
    beat_id uuid references public.beats on delete cascade,
    position integer not null,
    added_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (playlist_id, beat_id)
);

-- Add RLS policies
alter table public.artist_profiles enable row level security;
alter table public.buyer_profiles enable row level security;
alter table public.producer_settings enable row level security;
alter table public.analytics enable row level security;
alter table public.comments enable row level security;
alter table public.playlists enable row level security;
alter table public.playlist_items enable row level security;

-- Create policies for artist_profiles
create policy "Users can view their own artist profile"
    on artist_profiles for select
    using ( auth.uid() = id );

create policy "Users can update their own artist profile"
    on artist_profiles for update
    using ( auth.uid() = id );

-- Create policies for buyer_profiles
create policy "Users can view their own buyer profile"
    on buyer_profiles for select
    using ( auth.uid() = id );

create policy "Users can update their own buyer profile"
    on buyer_profiles for update
    using ( auth.uid() = id );

-- Create policies for producer_settings
create policy "Producers can view their own settings"
    on producer_settings for select
    using ( auth.uid() = producer_id );

create policy "Producers can update their own settings"
    on producer_settings for update
    using ( auth.uid() = producer_id );

-- Create policies for comments
create policy "Anyone can view comments"
    on comments for select
    using ( true );

create policy "Users can create their own comments"
    on comments for insert
    with check ( auth.uid() = user_id );

-- Create policies for playlists
create policy "Users can view public playlists"
    on playlists for select
    using ( is_public = true or auth.uid() = user_id );

create policy "Users can manage their own playlists"
    on playlists for all
    using ( auth.uid() = user_id );

-- Create policies for playlist_items
create policy "Users can view items in accessible playlists"
    on playlist_items for select
    using (
        exists (
            select 1 from playlists
            where id = playlist_items.playlist_id
            and (is_public = true or user_id = auth.uid())
        )
    );

create policy "Users can manage items in their playlists"
    on playlist_items for all
    using (
        exists (
            select 1 from playlists
            where id = playlist_items.playlist_id
            and user_id = auth.uid()
        )
    );

-- Add triggers for updated_at timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger handle_artist_profiles_updated_at
    before update on artist_profiles
    for each row
    execute procedure handle_updated_at();

create trigger handle_buyer_profiles_updated_at
    before update on buyer_profiles
    for each row
    execute procedure handle_updated_at();

create trigger handle_producer_settings_updated_at
    before update on producer_settings
    for each row
    execute procedure handle_updated_at();

create trigger handle_comments_updated_at
    before update on comments
    for each row
    execute procedure handle_updated_at();

create trigger handle_playlists_updated_at
    before update on playlists
    for each row
    execute procedure handle_updated_at();