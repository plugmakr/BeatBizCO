
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";
import { useRef } from "react";

type UserRole = Database["public"]["Enums"]["user_role"];

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isProcessingRef = useRef(false);

  const handleRoleBasedRedirect = (userRole: string) => {
    console.log("Redirecting based on role:", userRole);
    switch (userRole) {
      case "admin":
        navigate("/admin/dashboard", { replace: true });
        break;
      case "producer":
        navigate("/producer/dashboard", { replace: true });
        break;
      case "artist":
        navigate("/artist/dashboard", { replace: true });
        break;
      default:
        console.log("No valid role found, redirecting to home");
        navigate("/", { replace: true });
        break;
    }
  };

  useEffect(() => {
    const handleAuthStateChange = async (event: string, session: any) => {
      console.log("Auth state changed:", event, session);

      if (isProcessingRef.current) {
        console.log("Already processing auth state change, skipping");
        return;
      }

      try {
        isProcessingRef.current = true;

        if (event === 'SIGNED_IN' && session?.user?.id) {
          console.log("User signed in, fetching profile");
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("Error getting user role:", profileError);
            throw profileError;
          }

          if (profile?.role) {
            console.log("User profile retrieved:", profile);
            // Store role in localStorage for persistence
            localStorage.setItem('userRole', profile.role);
            localStorage.setItem('userId', session.user.id);
            
            toast({
              title: "Welcome to BeatBiz!",
              description: "You've successfully signed in.",
            });
            
            handleRoleBasedRedirect(profile.role);
          } else {
            console.error("No role found for user");
            navigate("/", { replace: true });
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out, clearing storage and redirecting");
          localStorage.removeItem('userRole');
          localStorage.removeItem('userId');
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        toast({
          title: "Error",
          description: "Failed to get user role. Please try again.",
          variant: "destructive"
        });
        navigate("/", { replace: true });
      } finally {
        isProcessingRef.current = false;
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        handleAuthStateChange('SIGNED_IN', session);
      }
    };
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return { handleRoleBasedRedirect };
};
