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