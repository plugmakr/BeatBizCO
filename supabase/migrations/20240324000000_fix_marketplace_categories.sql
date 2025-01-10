-- Create marketplace_categories table if it doesn't exist
create table if not exists public.marketplace_categories (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    item_count integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.marketplace_categories enable row level security;

create policy "Enable read access for all users"
    on public.marketplace_categories for select
    using (true);

create policy "Enable write access for authenticated users only"
    on public.marketplace_categories for all
    using (auth.role() = 'authenticated');

-- Insert some default categories
insert into public.marketplace_categories (name) values
    ('Beats'),
    ('Loop Kits'),
    ('MIDI Kits'),
    ('Sample Kits'),
    ('Drum Kits'),
    ('Stem Kits'),
    ('Albums'),
    ('Singles');