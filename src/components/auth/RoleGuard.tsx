import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!profile) {
        toast({
          title: "Access Denied",
          description: "Profile not found.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      // If user is admin, they're authorized for all routes
      if (profile.role === 'admin') {
        setIsAuthorized(true);
        return;
      }

      // For non-admin users, check if their role is in allowedRoles
      if (!allowedRoles.includes(profile.role)) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this area.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAuthorized(true);
    };

    checkRole();
  }, [navigate, allowedRoles]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;