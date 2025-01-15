export interface MarketplaceItem {
  id: string;
  title: string;
  description: string | null;
  type: string;
  price: number;
  bpm?: number | null;
  key?: string | null;
  genre: string | null;
  tags?: string[] | null;
  preview_url: string | null;
  thumbnail_url: string | null;
  category: string | null;
  total_sales: number | null;
  total_downloads: number | null;
  total_plays: number | null;
  status: string | null;
  is_featured: boolean;
  profiles?: {
    username: string | null;
    full_name: string | null;
  };
}

export interface MarketplaceCategory {
  id: string;
  name: string;
  item_count: number;
  is_active: boolean;
}