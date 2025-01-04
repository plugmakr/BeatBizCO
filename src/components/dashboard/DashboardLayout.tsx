import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  LogOut, 
  User, 
  Music, 
  ShoppingCart, 
  Settings,
  LayoutDashboard,
  Users,
  FileText,
  Megaphone,
  BarChart,
  Star,
  MessageSquare,
  Bell
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setRole(profile.role);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
      navigate("/auth");
    }
  };

  const getMenuItems = () => {
    if (role === "producer") {
      return [
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          url: "/producer/dashboard",
        },
        {
          title: "My Beats",
          icon: Music,
          url: "/producer/beats",
        },
        {
          title: "Collaboration",
          icon: Users,
          url: "/producer/collaboration",
        },
        {
          title: "Licensing",
          icon: FileText,
          url: "/producer/licensing",
        },
        {
          title: "Marketing",
          icon: Megaphone,
          url: "/producer/marketing",
        },
        {
          title: "Analytics",
          icon: BarChart,
          url: "/producer/analytics",
        },
        {
          title: "Reviews",
          icon: Star,
          url: "/producer/reviews",
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
    }

    // Return default menu items for other roles
    const commonItems = [
      {
        title: "Profile",
        icon: User,
        url: "/dashboard/profile",
      },
      {
        title: "Settings",
        icon: Settings,
        url: "/dashboard/settings",
      },
    ];

    const roleSpecificItems = {
      artist: [
        {
          title: "Browse Beats",
          icon: Music,
          url: "/dashboard/browse",
        },
      ],
      buyer: [
        {
          title: "Shop",
          icon: ShoppingCart,
          url: "/dashboard/shop",
        },
      ],
      admin: [
        {
          title: "Dashboard",
          icon: ShoppingCart,
          url: "/admin",
        },
      ],
    };

    if (!role || !roleSpecificItems[role as keyof typeof roleSpecificItems]) {
      return commonItems;
    }

    return [...(roleSpecificItems[role as keyof typeof roleSpecificItems] || []), ...commonItems];
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {getMenuItems().map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2 w-full">
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;