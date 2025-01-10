import { LucideIcon } from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface MenuSection {
  category: string;
  items: MenuItem[];
}

export const getProducerMenuItems = (): MenuSection[] => [];
export const getArtistMenuItems = (): MenuSection[] => [];
export const getAdminMenuItems = (): MenuSection[] => [];