
import type { Database } from '@/integrations/supabase/types';

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export interface Client extends Tables<'clients'> {}
export interface ClientFile extends Tables<'client_files'> {
  fromSoundLibrary?: boolean;
  projectName?: string;
}

export type SoundType = 'beat' | 'sound_kit' | 'midi_kit' | 'loop_kit' | 'drum_kit' | 'one_shot' | 'sample';
export type UserRole = 'guest' | 'artist' | 'producer' | 'admin';
export type ProjectStatus = 'draft' | 'in_progress' | 'completed' | 'archived';

export interface Profile extends Tables<'profiles'> {
  bio?: string;
  website?: string;
  subscription_plan?: string;
  full_name?: string;
  username?: string;
  role?: UserRole;
}

export interface Sound extends Tables<'sound_library'> {
  id: string;
  producer_id?: string;
  title?: string;
  description?: string;
  type?: SoundType;
  bpm?: number;
  key?: string;
  genre?: string;
  tags?: string[];
  file_path?: string;
  original_filename?: string;
  size?: number;
  folder_path?: string | null;
  is_public?: boolean;
  created_at: string;
  updated_at: string;
  name?: string;
}

export interface Project extends Tables<'collaboration_projects'> {
  id: string;
  title: string;
  description?: string;
  client_id?: string | null;
  deadline?: string | null;
  status: ProjectStatus;
  created_by: string;
  settings?: any;
  created_at: string;
  updated_at: string;
}

export interface SoundLibraryTag extends Tables<'sound_library_tags'> {
  id: string;
  name: string;
  color?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Funnel extends Tables<'funnels'> {
  id: string;
  name: string;
  status: string;
  created_by: string;
  created_at?: string;
  updated_at?: string;
  description?: string;
}

export interface FunnelStep extends Tables<'funnel_steps'> {
  id: string;
  funnel_id: string;
  name: string;
  type: string;
  content?: any;
  position?: number;
  website_blocks?: any;
  created_at?: string;
  updated_at?: string;
}

export interface FunnelAutomation extends Tables<'funnel_automations'> {
  id: string;
  funnel_id: string;
  name: string;
  trigger_type: string;
  actions?: any;
  created_at?: string;
  updated_at?: string;
}

export interface Transaction extends Tables<'transactions'> {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description?: string;
  category?: string;
  date: string;
  producer_id: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectFile extends Tables<'project_files'> {
  id: string;
  project_id?: string;
  uploaded_by?: string;
  file_name: string;
  file_type: string;
  file_url: string;
  file_path?: string;
  created_at: string;
  updated_at: string;
}

export interface MarketplaceCategory extends Tables<'marketplace_categories'> {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  item_count?: number;
  is_active?: boolean;
}

export { Database };
