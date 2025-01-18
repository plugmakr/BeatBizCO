import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuthRedirect = (role: UserRole) => {
    const routes: Record<UserRole, string> = {
      admin: "/admin",
      producer: "/producer",
      artist: "/artist",
      guest: "/"
    };

    const route = routes[role] || "/";
    navigate(route);

    toast({
      title: "Welcome!",
      description: "You've successfully signed in.",
    });
  };

  return { handleAuthRedirect };
};
