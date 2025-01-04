import { 
  LayoutDashboard, 
  Music, 
  Users, 
  FileText, 
  Megaphone, 
  BarChart, 
  Star, 
  MessageSquare, 
  Bell,
  Settings,
  FolderKanban,
  Users2,
  Wallet,
  ShoppingBag,
  HelpCircle,
  Globe,
  Library,
  GitFork
} from "lucide-react";

export const getProducerMenuItems = () => [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/producer",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    url: "/producer/projects",
  },
  {
    title: "Clients",
    icon: Users2,
    url: "/producer/clients",
  },
  {
    title: "Finances",
    icon: Wallet,
    url: "/producer/finances",
  },
  {
    title: "Marketplace",
    icon: ShoppingBag,
    url: "/producer/marketplace",
  },
  {
    title: "Support",
    icon: HelpCircle,
    url: "/producer/support",
  },
  {
    title: "Website",
    icon: Globe,
    url: "/producer/website",
  },
  {
    title: "Sound Library",
    icon: Library,
    url: "/producer/sound-library",
  },
  {
    title: "Funnels",
    icon: GitFork,
    url: "/producer/funnels",
  },
  {
    title: "My Beats",
    icon: Music,
    url: "/producer/beats",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    url: "/producer/messages",
  },
  {
    title: "Notifications",
    icon: Bell,
    url: "/producer/notifications",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/producer/settings",
  },
];

export const getArtistMenuItems = () => [
  {
    title: "Profile",
    icon: User,
    url: "/dashboard/profile",
  },
  {
    title: "Browse Beats",
    icon: Music,
    url: "/dashboard/browse",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/dashboard/settings",
  },
];

export const getAdminMenuItems = () => [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/admin/settings",
  },
];