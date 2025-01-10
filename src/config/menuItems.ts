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
  Handshake
} from "lucide-react";

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
        title: "Collaborations",
        url: "/artist/collaborations",
        icon: Handshake
      },
      {
        title: "Messages",
        url: "/artist/messages",
        icon: MessageSquare
      },
      {
        title: "Sales",
        url: "/artist/sales",
        icon: ShoppingBag
      }
    ]
  },
  {
    category: "Analytics",
    items: [
      {
        title: "Performance",
        url: "/artist/analytics",
        icon: BarChart2
      },
      {
        title: "Marketing",
        url: "/artist/marketing",
        icon: Megaphone
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
        icon: GlobeIcon
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
