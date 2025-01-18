-- Set seth@audicode.com as admin
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'seth@audicode.com';
