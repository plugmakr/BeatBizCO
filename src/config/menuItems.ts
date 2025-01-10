import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag,
  UsersRound,
  FileText,
  BarChart2,
  MessageSquare,
  CreditCard,
  Megaphone,
  Settings,
  FileSearch,
  Activity,
  Bell,
  UserCheck,
  Store,
  Handshake,
  FileEdit,
  PieChart,
  Shield,
  Wallet,
  Target,
  Cog,
  ClipboardList
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
        icon: UsersRound
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
        icon: Store
      },
      {
        title: "Website",
        url: "/producer/website",
        icon: Globe
      },
      {
        title: "Funnels",
        url: "/producer/funnels",
        icon: Handshake
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

export const getArtistMenuItems = (): MenuSection[] => [
  {
    category: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/artist/dashboard",
        icon: LayoutDashboard
      },
      {
        title: "Analytics",
        url: "/artist/analytics",
        icon: BarChart2
      }
    ]
  },
  {
    category: "Business",
    items: [
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
        icon: Store
      },
      {
        title: "Collaborations",
        url: "/admin/collaborations",
        icon: Handshake
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
