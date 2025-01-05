import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeRole, setActiveRole] = useState<string>("admin");

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
          setActiveRole(profile.role);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleRoleSwitch = (newRole: string) => {
    setActiveRole(newRole);
    toast({
      title: "Role Switched",
      description: `Viewing dashboard as ${newRole}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {isAdmin && (
            <div className="mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent">
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
          {children}
        </main>
      </div>
    </div>
  );
}