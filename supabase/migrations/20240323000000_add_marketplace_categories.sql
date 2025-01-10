-- Create marketplace_categories table if it doesn't exist
create table if not exists public.marketplace_categories (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    item_count integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add is_featured column to marketplace_items if it doesn't exist
do $$ 
begin
    if not exists (select 1 from information_schema.columns 
                  where table_name = 'marketplace_items' 
                  and column_name = 'is_featured') then
        alter table public.marketplace_items 
        add column is_featured boolean default false;
    end if;
end $$;

-- Enable RLS
alter table public.marketplace_categories enable row level security;

-- Drop existing policies if they exist
do $$ 
begin
    if exists (select 1 from pg_policies where tablename = 'marketplace_categories' and policyname = 'Allow read access to all users') then
        drop policy "Allow read access to all users" on marketplace_categories;
    end if;
    if exists (select 1 from pg_policies where tablename = 'marketplace_categories' and policyname = 'Allow all actions for admin users') then
        drop policy "Allow all actions for admin users" on marketplace_categories;
    end if;
end $$;

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

-- Insert default categories if they don't exist
insert into public.marketplace_categories (name)
select name
from (
    values 
        ('Beats'),
        ('Loop Kits'),
        ('MIDI Kits'),
        ('Sample Kits'),
        ('Drum Kits'),
        ('Stem Kits'),
        ('Albums'),
        ('Singles')
) as categories(name)
where not exists (
    select 1 from public.marketplace_categories 
    where marketplace_categories.name = categories.name
);