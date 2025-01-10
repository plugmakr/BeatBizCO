import { 
  LayoutDashboard, 
  Users2,
  Wallet,
  ShoppingBag,
  HelpCircle,
  Globe,
  Library,
  GitFork,
  MessageSquare,
  Settings,
  FolderKanban,
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
    title: "Messages",
    icon: MessageSquare,
    url: "/producer/messages",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/producer/settings",
  },
];

export const getArtistMenuItems = () => [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/artist",
  },
  {
    title: "Profile",
    icon: Users2,
    url: "/artist/profile",
  },
  {
    title: "Browse Beats",
    icon: Library,
    url: "/artist/browse",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    url: "/artist/messages",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/artist/settings",
  },
];

export const getAdminMenuItems = () => [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin",
  },
  {
    title: "Users",
    icon: Users2,
    url: "/admin/users",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/admin/settings",
  },
];