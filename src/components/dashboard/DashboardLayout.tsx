import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, User, Music, ShoppingCart, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  role: "producer" | "artist" | "buyer" | "admin";
}

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
      producer: [
        {
          title: "My Beats",
          icon: Music,
          url: "/dashboard/beats",
        },
      ],
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

    // Return only common items if role is not set or invalid
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