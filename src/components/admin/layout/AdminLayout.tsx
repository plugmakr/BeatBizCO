import { useEffect, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { supabase } from "@/integrations/supabase/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeRole, setActiveRole] = useState<string>('admin');
  const navigate = useNavigate();
  const { toast } = useToast();

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
          setIsAdmin(profile.role === 'admin');
          const savedActiveRole = localStorage.getItem('activeRole');
          setActiveRole(savedActiveRole || profile.role);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleRoleSwitch = (newRole: string) => {
    setActiveRole(newRole);
    localStorage.setItem('activeRole', newRole);
    
    // Navigate to the appropriate dashboard based on the selected role
    switch (newRole) {
      case "admin":
        navigate("/admin");
        break;
      case "producer":
        navigate("/producer/dashboard");
        break;
      case "artist":
        navigate("/artist/dashboard");
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

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <div className="w-64 min-h-screen bg-background border-r">
          {isAdmin && (
            <div className="p-4 border-b">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium bg-secondary rounded-md hover:bg-secondary/80">
                  <UserCog className="h-4 w-4" />
                  <span>View as: {activeRole}</span>
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
            </div>
          )}
          <AdminSidebar />
        </div>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}