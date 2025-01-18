-- Drop existing trigger and function
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- Create function to handle new user creation with retry logic
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  max_retries constant int := 3;
  current_retry int := 0;
  success boolean := false;
begin
  -- Retry loop
  while current_retry < max_retries and not success loop
    begin
      -- Attempt to insert profile
      insert into public.profiles (id, role, created_at, updated_at)
      values (new.id, 'guest', now(), now())
      on conflict (id) do nothing;
      
      success := true;
    exception when others then
      -- Wait a bit before retrying (100ms, 200ms, 300ms)
      perform pg_sleep((current_retry + 1) * 0.1);
      current_retry := current_retry + 1;
      
      -- On last retry, raise the error
      if current_retry = max_retries then
        raise;
      end if;
    end;
  end loop;
  
  return new;
end;
$$;

-- Create trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Ensure RLS policies are in place
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can update own profile role'
    ) THEN
        create policy "Users can update own profile role"
            on profiles
            for update using (auth.uid() = id)
            with check (
                auth.uid() = id
                and (
                    case when auth.role() = 'authenticated' then
                        case 
                            when old.role = 'guest' then true  -- Allow changing from guest
                            else role = old.role              -- Don't allow changing existing role
                        end
                    else false
                    end
                )
            );
    END IF;
END $$;
