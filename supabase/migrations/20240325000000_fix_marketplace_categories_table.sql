-- Create the marketplace_categories table if it doesn't exist
create table if not exists public.marketplace_categories (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    item_count integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.marketplace_categories enable row level security;

-- Create policies
create policy "Enable read access for all users"
    on public.marketplace_categories for select
    using (true);

create policy "Enable write access for admin users"
    on public.marketplace_categories for all
    using (
        exists (
            select 1 from auth.users
            where auth.uid() = id
            and raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Insert default categories if they don't exist
insert into public.marketplace_categories (name, is_active)
select name, true
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