import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type UserRole = "producer" | "artist" | "buyer" | "admin";

const AuthForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mounted = useRef(true);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && mounted.current) {
        handleExistingUser(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user && mounted.current) {
        handleNewSignIn(session.user.id);
      }
    });

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleExistingUser = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (profile) {
        handleRoleBasedRedirect(profile.role);
      }
    } catch (error: any) {
      console.error('Error checking existing user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to check user profile",
        variant: "destructive",
      });
    }
  };

  const handleNewSignIn = async (userId: string) => {
    try {
      // Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) throw profileError;

      // If profile exists, redirect based on role
      if (profile) {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        handleRoleBasedRedirect(profile.role);
        return;
      }

      // If no profile exists, create one with default role
      const { error: createError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          role: 'buyer',
          updated_at: new Date().toISOString(),
        });

      if (createError) throw createError;

      toast({
        title: "Welcome to BeatBiz!",
        description: "Your account has been created successfully.",
      });
      handleRoleBasedRedirect('buyer');

    } catch (error: any) {
      console.error('Error handling sign in:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete sign in",
        variant: "destructive",
      });
    }
  };

  const handleRoleBasedRedirect = (role: string) => {
    if (!mounted.current) return;

    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "artist":
        navigate("/artist");
        break;
      case "producer":
        navigate("/producer");
        break;
      default:
        navigate("/");
        break;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome to BeatBiz</CardTitle>
        <CardDescription>
          Sign in to start creating, collaborating, and selling your music
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "rgb(var(--primary))",
                  brandAccent: "rgb(var(--primary))",
                },
              },
            },
          }}
          providers={[]}
          redirectTo={window.location.origin}
        />
      </CardContent>
    </Card>
  );
};

export default AuthForm;