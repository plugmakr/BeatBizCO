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
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log("Initial session check:", { session, error: sessionError });
        
        if (sessionError) {
          console.error("Session check error:", sessionError);
          throw sessionError;
        }

        if (session?.user) {
          console.log("Found existing session for user:", session.user.id);
          handleAuthSuccess(session);
        }
      } catch (error: any) {
        console.error("Session check failed:", error);
        const errorMessage = error.message || "Failed to check session";
        setError(errorMessage);
        toast({
          title: "Session Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted.current) return;

      console.log("Auth state change:", { event, session });

      if (event === 'SIGNED_IN' && session?.user) {
        handleAuthSuccess(session);
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        setError(null);
      } else if (event === 'USER_UPDATED') {
        console.log('User profile updated');
      }
    });

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleAuthSuccess = async (session: any) => {
    try {
      console.log("Handling auth success for user:", session.user.id);
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        throw profileError;
      }

      console.log("Retrieved profile:", profile);

      if (profile) {
        toast({
          title: "Welcome!",
          description: "You've successfully signed in.",
        });
        
        switch (profile.role) {
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
      } else {
        console.error('No profile found for user:', session.user.id);
        setError("Unable to retrieve user profile. Please try again.");
      }
    } catch (error: any) {
      console.error('Auth success handling error:', error);
      const errorMessage = error.message || "An unexpected error occurred";
      setError(errorMessage);
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
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
          redirectTo={window.location.origin}
          magicLink={false}
        />
      </CardContent>
    </Card>
  );
};

export default AuthForm;