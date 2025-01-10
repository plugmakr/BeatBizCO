import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <main className="flex-1 p-6">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;