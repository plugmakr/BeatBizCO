import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          switch (profile.role) {
            case "admin":
              navigate("/admin");
              break;
            case "artist":
              navigate("/artist");
              break;
            default:
              navigate("/");
              break;
          }
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          switch (profile.role) {
            case "admin":
              navigate("/admin");
              break;
            case "artist":
              navigate("/artist");
              break;
            default:
              navigate("/");
              break;
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <AuthForm />
    </div>
  );
};

export default Auth;