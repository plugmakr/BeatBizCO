-- Create marketplace_categories table
create table if not exists public.marketplace_categories (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    item_count integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add is_featured column to marketplace_items
alter table public.marketplace_items 
add column if not exists is_featured boolean default false;

-- Enable RLS
alter table public.marketplace_categories enable row level security;

-- Create policies
create policy "Allow read access to all users"
    on marketplace_categories for select
    using (true);

create policy "Allow all actions for admin users"
    on marketplace_categories for all
    using (
        exists (
            select 1 from public.profiles
            where profiles.id = auth.uid()
            and profiles.role = 'admin'
        )
    );