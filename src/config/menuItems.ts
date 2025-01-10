import { 
  LayoutDashboard, 
  Users, 
  Folder, 
  Wallet, 
  ShoppingBag, 
  Music2, 
  Globe, 
  Share2, 
  MessageSquare, 
  HelpCircle, 
  Settings,
  UserCircle
} from "lucide-react";
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

export const getProducerMenuItems = (): MenuSection[] => [
  {
    category: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/producer/dashboard",
        icon: LayoutDashboard
      },
      {
        title: "Profile",
        url: "/producer/profile",
        icon: UserCircle
      }
    ]
  },
  {
    category: "Business",
    items: [
      {
        title: "Clients",
        url: "/producer/clients",
        icon: Users
      },
      {
        title: "Projects",
        url: "/producer/projects",
        icon: Folder
      },
      {
        title: "Finances",
        url: "/producer/finances",
        icon: Wallet
      }
    ]
  },
  {
    category: "Content",
    items: [
      {
        title: "Marketplace",
        url: "/producer/marketplace",
        icon: ShoppingBag
      },
      {
        title: "Sound Library",
        url: "/producer/sound-library",
        icon: Music2
      },
      {
        title: "Website",
        url: "/producer/website",
        icon: Globe
      },
      {
        title: "Funnels",
        url: "/producer/funnels",
        icon: Share2
      }
    ]
  },
  {
    category: "Support",
    items: [
      {
        title: "Messages",
        url: "/producer/messages",
        icon: MessageSquare
      },
      {
        title: "Help",
        url: "/producer/support",
        icon: HelpCircle
      },
      {
        title: "Settings",
        url: "/producer/settings",
        icon: Settings
      }
    ]
  }
];

// Placeholder functions for other user types - to be implemented later
export const getArtistMenuItems = (): MenuSection[] => [];
export const getAdminMenuItems = (): MenuSection[] => [];