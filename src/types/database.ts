import type { Database } from '@/integrations/supabase/types';

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type UserRole = 'guest' | 'artist' | 'producer' | 'admin';
export type ProjectStatus = 'draft' | 'in_progress' | 'completed' | 'archived' | 'active';
export type SoundType = 'beat' | 'sound_kit' | 'midi_kit' | 'loop_kit' | 'drum_kit' | 'one_shot' | 'sample';
export type LicenseType = 'basic' | 'premium' | 'exclusive';
export type FunnelStatus = 'draft' | 'archived' | 'active';

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone?: string | null;
  website?: string | null;
  budget_range?: string | null;
  genre_focus?: string | null;
  project_type?: string | null;
  social_media?: string | null;
  notes?: string | null;
  producer_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientFile {
  id: string;
  client_id?: string;
  uploaded_by?: string;
  filename: string;
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
  producer_id: string;
  name: string;
  title: string;
  description: string;
  type: SoundType;
  bpm: number;
  key: string;
  genre: string;
  tags: string[];
  file_path: string;
  original_filename: string;
  size: number;
  folder_path: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string | null;
  client_id?: string | null;
  deadline?: string | null;
  status: ProjectStatus;
  created_by: string;
  settings?: any;
  created_at: string;
  updated_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  uploaded_by: string;
  filename: string;
  file_type: string;
  file_url: string;
  file_path?: string;
  created_at: string;
  updated_at: string;
}

export interface Funnel {
  id: string;
  name: string;
  description?: string;
  status: FunnelStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description?: string;
  price: number;
  producer_id: string;
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
  download_url?: string;
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
  purchasedBeats: number;
  activeProjects: number;
  collaborations: number;
  releasedTracks: number;
}

export interface ProducerStats {
  totalBeats: number;
  totalRevenue: number;
  activeProjects: number;
  supportTickets?: number;
}

export interface ProducerStatsProps {
  stats: ProducerStats;
  isLoading: boolean;
}

export interface AdminStats {
  totalUsers: number;
  totalRevenue: number;
  activeProjects: number;
  supportTickets: number;
}

export type Message = {
  id: string;
  content: string;
  sender_id?: string;
  receiver_id?: string;
  is_read?: boolean;
  created_at: string;
  updated_at: string;
  data?: any;
  type?: string;
};

export type ProjectWithProfile = Project & {
  profiles?: {
    full_name: string | null;
  } | null;
};

export { Database };
