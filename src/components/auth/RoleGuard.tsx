import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
        console.log('RoleGuard: Checking role...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          console.log('RoleGuard: No session found');
          toast({
            title: "Authentication Required",
            description: "Please sign in to access this area.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }

        // Try to get role from localStorage first
        const cachedRole = localStorage.getItem('userRole');
        console.log('RoleGuard: Cached role:', cachedRole);

        // Always verify with database
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error("RoleGuard: Profile error:", profileError);
          toast({
            title: "Error",
            description: "Unable to verify your access level.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }

        const userRole = profile?.role;
        console.log('RoleGuard: Database role:', userRole);
        console.log('RoleGuard: Allowed roles:', allowedRoles);

        if (!userRole || !allowedRoles.includes(userRole)) {
          console.log('RoleGuard: Access denied');
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this area.",
            variant: "destructive",
          });
          
          if (userRole) {
            console.log('RoleGuard: Redirecting to user dashboard');
            navigate(`/${userRole}/dashboard`);
          } else {
            navigate("/auth");
          }
          return;
        }

        console.log('RoleGuard: Access granted');
        setIsAuthorized(true);
        localStorage.setItem('userRole', userRole);
      } catch (error) {
        console.error("RoleGuard: Error in checkRole:", error);
        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    checkRole();

    const handleAuthEvent = (event: any) => {
      console.log('RoleGuard: Auth event received:', event);
      checkRole();
    };

    window.addEventListener('userAuthenticated', handleAuthEvent);

    return () => {
      window.removeEventListener('userAuthenticated', handleAuthEvent);
    };
  }, [navigate, toast, allowedRoles, location.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return isAuthorized ? children : null;
};

export default RoleGuard;