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