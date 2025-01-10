-- Create music table
create table if not exists public.music (
    id bigint primary key generated always as identity,
    title text not null,
    genre text not null,
    price decimal(10,2) not null,
    description text,
    audio_url text not null,
    artwork_url text,
    artist_id uuid references auth.users(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.music enable row level security;

-- Create policies
create policy "Artists can insert their own music"
    on public.music for insert
    with check (auth.uid() = artist_id);

create policy "Artists can update their own music"
    on public.music for update
    using (auth.uid() = artist_id);

create policy "Artists can delete their own music"
    on public.music for delete
    using (auth.uid() = artist_id);

create policy "Everyone can view music"
    on public.music for select
    using (true);

-- Create storage buckets if they don't exist
insert into storage.buckets (id, name)
values ('music', 'music')
on conflict do nothing;

insert into storage.buckets (id, name)
values ('artwork', 'artwork')
on conflict do nothing;

-- Set up storage policies
create policy "Artists can upload music"
    on storage.objects for insert
    with check (bucket_id = 'music' and auth.role() = 'authenticated');

create policy "Artists can upload artwork"
    on storage.objects for insert
    with check (bucket_id = 'artwork' and auth.role() = 'authenticated');

create policy "Anyone can download music"
    on storage.objects for select
    using (bucket_id = 'music');

create policy "Anyone can view artwork"
    on storage.objects for select
    using (bucket_id = 'artwork');