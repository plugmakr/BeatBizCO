export interface MarketplaceItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string | null;
  status: string | null;
  is_featured: boolean;
  producer_id: string | null;
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