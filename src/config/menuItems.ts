import {
  LayoutDashboard,
  Users,
  FolderKanban,
  DollarSign,
  Store,
  Music2,
  LifeBuoy,
  Globe,
  Workflow,
  MessageSquare,
  Settings,
  ChartBar,
  Rocket,
  Receipt,
  ShoppingCart,
  TrendingUp,
  Gauge,
  Briefcase,
  FileText,
  Album,
  Mic2,
  HeadphonesIcon,
  Share2,
} from "lucide-react";

// Producer Menu Items
export const getProducerMenuItems = () => [
  {
    category: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/producer",
        icon: LayoutDashboard,
      },
      {
        title: "Profile",
        url: "/producer/profile",
        icon: Users,
      },
    ],
  },
  {
    category: "Business",
    items: [
      {
        title: "Clients",
        url: "/producer/clients",
        icon: Users,
      },
      {
        title: "Projects",
        url: "/producer/projects",
        icon: FolderKanban,
      },
      {
        title: "Finances",
        url: "/producer/finances",
        icon: DollarSign,
      },
    ],
  },
  {
    category: "Content",
    items: [
      {
        title: "Marketplace",
        url: "/producer/marketplace",
        icon: Store,
      },
      {
        title: "Sound Library",
        url: "/producer/sound-library",
        icon: Music2,
      },
      {
        title: "Website",
        url: "/producer/website",
        icon: Globe,
      },
      {
        title: "Funnels",
        url: "/producer/funnels",
        icon: Workflow,
      },
    ],
  },
  {
    category: "Support",
    items: [
      {
        title: "Messages",
        url: "/producer/messages",
        icon: MessageSquare,
      },
      {
        title: "Help",
        url: "/producer/support",
        icon: LifeBuoy,
      },
      {
        title: "Settings",
        url: "/producer/settings",
        icon: Settings,
      },
    ],
  },
];

// Artist Menu Items
export const getArtistMenuItems = () => [
  {
    category: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/artist",
        icon: LayoutDashboard,
      },
      {
        title: "Profile",
        url: "/artist/profile",
        icon: Users,
      },
    ],
  },
  {
    category: "Music",
    items: [
      {
        title: "My Releases",
        url: "/artist/releases",
        icon: Album,
      },
      {
        title: "Browse Beats",
        url: "/artist/browse",
        icon: HeadphonesIcon,
      },
      {
        title: "Recording",
        url: "/artist/recording",
        icon: Mic2,
      },
    ],
  },
  {
    category: "Business",
    items: [
      {
        title: "Analytics",
        url: "/artist/analytics",
        icon: ChartBar,
      },
      {
        title: "Marketing",
        url: "/artist/marketing",
        icon: Rocket,
      },
      {
        title: "Sales",
        url: "/artist/sales",
        icon: Receipt,
      },
    ],
  },
  {
    category: "Promotion",
    items: [
      {
        title: "Website",
        url: "/artist/website",
        icon: Globe,
      },
      {
        title: "Social Media",
        url: "/artist/social",
        icon: Share2,
      },
    ],
  },
];

// Admin Menu Items
export const getAdminMenuItems = () => [
  {
    category: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: Gauge,
      },
    ],
  },
  {
    category: "Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "Subscriptions",
        url: "/admin/subscriptions",
        icon: Briefcase,
      },
      {
        title: "Content",
        url: "/admin/content",
        icon: FileText,
      },
    ],
  },
  {
    category: "Business",
    items: [
      {
        title: "Marketplace",
        url: "/admin/marketplace",
        icon: ShoppingCart,
      },
      {
        title: "Revenue",
        url: "/admin/revenue",
        icon: TrendingUp,
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];