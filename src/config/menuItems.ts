import { 
  LayoutDashboard,
  Music2,
  Users,
  MessageSquare,
  CreditCard,
  BarChart2,
  Megaphone,
  Settings,
  HelpCircle,
  ShoppingBag,
  Users2,
  UserCircle,
  FileText,
  StoreIcon,
  Globe,
  Bell,
  FileEdit,
  PieChart,
  Wallet,
  Target,
  Cog,
  ClipboardList,
  Library,
  MessageCircle,
  HeadphonesIcon
} from "lucide-react";
import type { MenuSection } from "@/types/menu";

export const getArtistMenuItems = () => [
  {
    category: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/artist/dashboard",
        icon: LayoutDashboard
      },
      {
        title: "My Music",
        url: "/artist/my-music",
        icon: Music2
      }
    ]
  },
  {
    category: "Business",
    items: [
      {
        title: "Analytics",
        url: "/artist/analytics",
        icon: BarChart2
      },
      {
        title: "Marketing",
        url: "/artist/marketing",
        icon: Megaphone
      },
      {
        title: "Sales",
        url: "/artist/sales",
        icon: ShoppingBag
      }
    ]
  },
  {
    category: "Content",
    items: [
      {
        title: "Website",
        url: "/artist/website",
        icon: Globe
      },
      {
        title: "Messages",
        url: "/artist/messages",
        icon: MessageCircle
      }
    ]
  },
  {
    category: "Support",
    items: [
      {
        title: "Settings",
        url: "/artist/settings",
        icon: Settings
      },
      {
        title: "Help Center",
        url: "/artist/help",
        icon: HelpCircle
      }
    ]
  }
];

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
        icon: FileText
      },
      {
        title: "Finances",
        url: "/producer/finances",
        icon: CreditCard
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
        icon: StoreIcon
      },
      {
        title: "Website",
        url: "/producer/website",
        icon: Globe
      },
      {
        title: "Funnels",
        url: "/producer/funnels",
        icon: Users2
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
        icon: Megaphone
      },
      {
        title: "Settings",
        url: "/producer/settings",
        icon: Settings
      }
    ]
  }
];

export const getAdminMenuItems = (): MenuSection[] => [
  {
    category: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard
      },
      {
        title: "Notifications",
        url: "/admin/notifications",
        icon: Bell
      }
    ]
  },
  {
    category: "Users & Content",
    items: [
      {
        title: "User Management",
        url: "/admin/users",
        icon: Users
      },
      {
        title: "Marketplace",
        url: "/admin/marketplace",
        icon: StoreIcon
      },
      {
        title: "Collaborations",
        url: "/admin/collaborations",
        icon: Users2
      },
      {
        title: "Content Management",
        url: "/admin/content",
        icon: FileEdit
      }
    ]
  },
  {
    category: "Business",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: PieChart
      },
      {
        title: "Support",
        url: "/admin/support",
        icon: MessageSquare
      },
      {
        title: "Payments",
        url: "/admin/payments",
        icon: Wallet
      },
      {
        title: "Promotions",
        url: "/admin/promotions",
        icon: Target
      }
    ]
  },
  {
    category: "System",
    items: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Cog
      },
      {
        title: "Audit Logs",
        url: "/admin/logs",
        icon: ClipboardList
      }
    ]
  }
];