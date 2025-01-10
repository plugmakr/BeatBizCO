import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getProducerMenuItems, getArtistMenuItems, getAdminMenuItems } from "@/config/menuItems";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<string>("");

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
          // Redirect if user is on wrong portal
          const currentPath = window.location.pathname;
          if (profile.role === 'admin' && !currentPath.startsWith('/admin')) {
            navigate('/admin');
          } else if (profile.role === 'artist' && !currentPath.startsWith('/artist')) {
            navigate('/artist');
          } else if (profile.role === 'producer' && !currentPath.startsWith('/producer')) {
            navigate('/producer');
          }
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const getMenuItems = () => {
    switch (role) {
      case "producer":
        return getProducerMenuItems();
      case "artist":
        return getArtistMenuItems();
      case "admin":
        return getAdminMenuItems();
      default:
        return [];
    }
  };

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <Accordion type="single" collapsible className="w-full">
                  {getMenuItems().map((section, index) => (
                    <AccordionItem value={`section-${index}`} key={index}>
                      <AccordionTrigger className="px-2">
                        {section.category}
                      </AccordionTrigger>
                      <AccordionContent>
                        <SidebarMenu>
                          {section.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                              <Link to={item.url} className="w-full">
                                <SidebarMenuButton className="w-full">
                                  <div className="flex items-center gap-2">
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                  </div>
                                </SidebarMenuButton>
                              </Link>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2 w-full mt-4">
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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