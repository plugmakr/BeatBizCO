import type { Database } from '@/integrations/supabase/types';

// Export the Tables type helper
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export interface Client extends Tables<'clients'> {}
export interface ClientFile extends Tables<'client_files'> {
  fromSoundLibrary?: boolean;
  projectName?: string;
}
export type SoundLibraryFile = Tables<'sound_library'>;
export type Project = Tables<'collaboration_projects'>;

export { Database };