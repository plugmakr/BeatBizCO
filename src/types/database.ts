
import type { Database } from '@/integrations/supabase/types';

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type UserRole = 'guest' | 'artist' | 'producer' | 'admin';
export type ProjectStatus = 'draft' | 'in_progress' | 'completed' | 'archived';
export type SoundType = 'beat' | 'sound_kit' | 'midi_kit' | 'loop_kit' | 'drum_kit' | 'one_shot' | 'sample';
export type LicenseType = 'basic' | 'premium' | 'exclusive';

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  budget_range?: string;
  genre_focus?: string;
  project_type?: string;
  social_media?: string;
  notes?: string;
  producer_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientFile {
  id: string;
  client_id?: string;
  uploaded_by?: string;
  file_name: string;
  file_type: string;
  file_path?: string;
  display_name?: string;
  type: string;
  size: number;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  role: UserRole;
  bio?: string;
  website?: string;
  subscription_plan?: string;
  full_name?: string;
  username?: string;
  support_tickets?: number;
  created_at: string;
  updated_at: string;
}

export interface Sound {
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
}

export interface Project {
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

export interface MarketplaceItem {
  id: string;
  title: string;
  description?: string;
  price: number;
  producer_id?: string;
  license_type: LicenseType;
  status?: string;
  tags?: string[];
  bpm?: number;
  key?: string;
  genre?: string;
  category?: string;
  is_active?: boolean;
  is_featured?: boolean;
  preview_url?: string;
  thumbnail_url?: string;
  total_sales?: number;
  total_downloads?: number;
  total_plays?: number;
  created_at: string;
  updated_at: string;
}

export interface FunnelAutomation {
  id: string;
  funnel_id: string;
  name: string;
  trigger_type: string;
  actions?: any;
  config?: any;
  created_at?: string;
  updated_at?: string;
}

export interface Track {
  id: string;
  title: string;
  genre?: string;
  price?: number;
  audio_url?: string;
  artwork_url?: string;
  description?: string;
  status?: string;
  artist_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ArtistStats {
  released_tracks: number;
  active_projects: number;
  collaborations: number;
  purchased_beats: number;
}

export interface ProducerStats {
  totalBeats: number;
  totalRevenue: number;
  activeProjects: number;
}

export { Database };
