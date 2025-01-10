import type { Database } from '@/integrations/supabase/types';

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export interface Client {
  id: string;
  producer_id: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  website: string | null;
  budget_range: string | null;
  genre_focus: string | null;
  project_type: string | null;
  social_media: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ClientFile {
  id: string;
  client_id: string;
  filename: string;
  file_path: string;
  file_type: string;
  size: number;
  uploaded_by: string | null;
  created_at: string | null;
  updated_at: string | null;
  parent_id: string | null;
  type: 'folder' | 'file';
  display_name: string | null;
  fromSoundLibrary?: boolean;
  projectName?: string;
}

export { Database };