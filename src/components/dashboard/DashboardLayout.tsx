import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, UserCog } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getProducerMenuItems, getArtistMenuItems, getAdminMenuItems } from "@/config/producerMenuItems";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeRole, setActiveRole] = useState<string | null>(null);

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
          setIsAdmin(profile.role === 'admin');
          const savedActiveRole = localStorage.getItem('activeRole');
          setActiveRole(savedActiveRole || profile.role);
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
      localStorage.removeItem('activeRole');
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
      navigate("/auth");
    }
  };

  const handleRoleSwitch = (newRole: string) => {
    setActiveRole(newRole);
    localStorage.setItem('activeRole', newRole);
    
    // Navigate to the appropriate dashboard based on the selected role
    switch (newRole) {
      case "admin":
        navigate("/admin");
        break;
      case "producer":
        navigate("/producer");
        break;
      case "artist":
        navigate("/artist");
        break;
      case "buyer":
        navigate("/marketplace");
        break;
      default:
        navigate("/");
    }

    toast({
      title: "Role Switched",
      description: `Viewing dashboard as ${newRole}`,
    });
  };

  const getMenuItems = () => {
    if (isAdmin) {
      switch (activeRole) {
        case "producer":
          return getProducerMenuItems();
        case "artist":
          return getArtistMenuItems();
        case "admin":
          return getAdminMenuItems();
        case "buyer":
          return [];
        default:
          return getAdminMenuItems();
      }
    }
    
    switch (role) {
      case "producer":
        return getProducerMenuItems();
      case "artist":
        return getArtistMenuItems();
      case "admin":
        return getAdminMenuItems();
      case "buyer":
        return [];
      default:
        return [];
    }
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
                  {isAdmin && (
                    <SidebarMenuItem className="mb-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuButton className="flex items-center gap-2 w-full">
                            <UserCog className="h-4 w-4" />
                            <span>View as: {activeRole}</span>
                          </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleRoleSwitch('admin')}>
                            Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleSwitch('producer')}>
                            Producer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleSwitch('artist')}>
                            Artist
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleSwitch('buyer')}>
                            Buyer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  )}
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