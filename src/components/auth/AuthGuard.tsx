import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('AuthGuard: Checking auth...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("AuthGuard: Auth error:", error);
          toast({
            title: "Authentication Error",
            description: "Please sign in again.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }

        if (!session?.user) {
          console.log('AuthGuard: No session found, redirecting to auth');
          navigate("/auth");
          return;
        }

        // Get user's role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError || !profile?.role) {
          console.error("AuthGuard: Profile error:", profileError);
          toast({
            title: "Error",
            description: "Unable to verify your access level.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }

        // Store role in localStorage
        localStorage.setItem('userRole', profile.role);
        console.log('AuthGuard: User authenticated with role:', profile.role);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("AuthGuard: Error in checkAuth:", error);
        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthGuard: Auth state changed:', event);
      
      if (!session) {
        console.log('AuthGuard: Session ended, redirecting to auth');
        setIsAuthenticated(false);
        localStorage.removeItem('userRole');
        navigate("/auth");
      } else {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile?.role) {
          console.log('AuthGuard: Session valid, role:', profile.role);
          localStorage.setItem('userRole', profile.role);
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast, location.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default AuthGuard;