
import type { Database } from '@/integrations/supabase/types';

// Export the Tables type helper
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export interface Client extends Tables<'clients'> {}
export interface ClientFile extends Tables<'client_files'> {
  fromSoundLibrary?: boolean;
  projectName?: string;
}

export type SoundType = 'beat' | 'sound_kit' | 'midi_kit' | 'loop_kit' | 'drum_kit' | 'one_shot' | 'sample';

export interface Sound {
  id: string;
  producer_id: string;
  title: string;
  description?: string;
  type: SoundType;
  bpm?: number;
  key?: string;
  genre?: string;
  tags?: string[];
  file_path: string;
  original_filename: string;
  size: number;
  folder_path?: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project extends Tables<'collaboration_projects'> {
  name: string;
  client_id?: string | null;
  deadline?: string | null;
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
}

export interface SoundLibraryTag extends Tables<'sound_library_tags'> {
  name: string;
  color?: string;
}

export interface Funnel extends Tables<'funnels'> {
  name: string;
  status: string;
  created_by: string;
}

export interface FunnelStep extends Tables<'funnel_steps'> {
  funnel_id: string;
  name: string;
  type: string;
  content?: any;
  position?: number;
  website_blocks?: any;
}

export interface FunnelAutomation extends Tables<'funnel_automations'> {
  funnel_id: string;
  name: string;
  trigger_type: string;
  actions?: any;
}

export interface Transaction extends Tables<'transactions'> {
  type: 'income' | 'expense';
  amount: number;
  description?: string;
  category?: string;
  date: string;
  producer_id: string;
}

export { Database };
