
import type { Database } from '@/integrations/supabase/types';

// Export the Tables type helper
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export interface Client extends Tables<'clients'> {}
export interface ClientFile extends Tables<'client_files'> {
  fromSoundLibrary?: boolean;
  projectName?: string;
}

export interface Sound extends Tables<'sound_library'> {
  type: 'beat' | 'sound_kit' | 'midi_kit' | 'loop_kit' | 'drum_kit' | 'one_shot' | 'sample';
  title: string;
  bpm?: number;
  key?: string;
  genre?: string;
  tags?: string[];
  file_path: string;
  original_filename: string;
  size: number;
  folder_path?: string | null;
}

export interface Project extends Tables<'collaboration_projects'> {
  name: string;
  client_id?: string | null;
  deadline?: string | null;
}

export { Database };
