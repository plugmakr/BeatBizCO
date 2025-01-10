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
  Palette,
  CreditCard,
  LineChart,
  Building2,
  ShieldCheck,
  Gauge,
  Briefcase,
  FileText,
  ShoppingCart,
  TrendingUp,
  BarChart,
} from "lucide-react";

export const getProducerMenuItems = () => [
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
    title: "Support",
    url: "/producer/support",
    icon: LifeBuoy,
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
  {
    title: "Messages",
    url: "/producer/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    url: "/producer/settings",
    icon: Settings,
  },
];

export const getArtistMenuItems = () => [
  {
    title: "Dashboard",
    url: "/artist",
    icon: LayoutDashboard,
  },
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
  {
    title: "Website",
    url: "/artist/website",
    icon: Globe,
  },
];

export const getAdminMenuItems = () => [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Gauge,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Subscription Plans",
    url: "/admin/subscriptions",
    icon: Briefcase,
  },
  {
    title: "Content Management",
    url: "/admin/content",
    icon: FileText,
  },
  {
    title: "Marketplace Management",
    url: "/admin/marketplace",
    icon: ShoppingCart,
  },
  {
    title: "Revenue Analytics",
    url: "/admin/revenue",
    icon: TrendingUp,
  },
  {
    title: "Site Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];