import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
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

        if (profileError) {
          console.error("Profile error:", profileError);
          toast({
            title: "Error",
            description: "Unable to verify your access level.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }

        if (!profile || !allowedRoles.includes(profile.role)) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this area.",
            variant: "destructive",
          });
          
          // Redirect based on user's role
          if (profile?.role) {
            navigate(`/${profile.role}/dashboard`);
          } else {
            navigate("/auth");
          }
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Role check error:", error);
        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    checkRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkRole();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast, allowedRoles]);

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