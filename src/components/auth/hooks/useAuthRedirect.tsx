
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
        navigate("/", { replace: true });
        break;
    }
  };

  useEffect(() => {
    const handleAuthStateChange = async (event: string, session: any) => {
      console.log("Auth state changed:", event, session);

      // Prevent multiple simultaneous auth state processing
      if (isProcessingRef.current) {
        console.log("Already processing auth state change, skipping");
        return;
      }

      try {
        isProcessingRef.current = true;

        if (event === 'SIGNED_IN' && session) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("Error getting user role:", profileError);
            throw profileError;
          }

          console.log("User profile retrieved:", profile);
          toast({
            title: "Welcome to BeatBiz!",
            description: "You've successfully signed in.",
          });
          
          handleRoleBasedRedirect(profile.role);
        } else if (event === 'SIGNED_OUT') {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        toast({
          title: "Error",
          description: "Failed to get user role. Please try again.",
          variant: "destructive"
        });
      } finally {
        isProcessingRef.current = false;
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return { handleRoleBasedRedirect };
};
