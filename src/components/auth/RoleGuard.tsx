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
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access this area.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profile || !allowedRoles.includes(profile.role)) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this area.",
          variant: "destructive",
        });
        
        if (profile) {
          switch (profile.role) {
            case "admin":
              navigate("/admin");
              break;
            case "producer":
              navigate("/producer");
              break;
            case "artist":
              navigate("/artist");
              break;
            default:
              navigate("/");
              break;
          }
        } else {
          navigate("/");
        }
        return;
      }

      setIsAuthorized(true);
    };

    checkRole();
  }, [navigate, allowedRoles, toast]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;