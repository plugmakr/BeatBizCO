import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const AuthForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mounted = useRef(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check active session on mount
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && mounted.current) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            handleRoleBasedRedirect(profile.role);
          }
        }
      } catch (error: any) {
        console.error('Session check error:', error);
        setError(error.message);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user && mounted.current) {
        try {
          // Check if profile exists
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          if (profile) {
            toast({
              title: "Welcome back!",
              description: "You've successfully signed in.",
            });
            handleRoleBasedRedirect(profile.role);
            return;
          }

          // Create new profile if none exists
          const { error: createError } = await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
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
          console.error('Auth state change error:', error);
          setError(error.message);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        }
      }
    });

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

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
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "rgb(var(--primary))",
                  brandAccent: "rgb(var(--primary))",
                  inputText: "#FFFFFF",
                  inputBackground: "#2A2F3C",
                  inputPlaceholder: "#9CA3AF",
                },
              },
            },
            className: {
              input: "text-white bg-[#2A2F3C] placeholder-gray-400",
              label: "text-gray-200",
              button: "bg-primary hover:bg-primary/90",
            },
          }}
          providers={[]}
          view="sign_in"
          showLinks={true}
          redirectTo={`${window.location.origin}/auth/callback`}
        />
      </CardContent>
    </Card>
  );
};

export default AuthForm;