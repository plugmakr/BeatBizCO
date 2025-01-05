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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
      setError(error.message || "Failed to check user profile");
      toast({
        title: "Error",
        description: error.message || "Failed to check user profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSignIn = async (userId: string) => {
    setIsLoading(true);
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
      let errorMessage = error.message || "Failed to complete sign in";
      
      // Handle specific error cases
      if (error.status === 500) {
        errorMessage = "Our authentication service is temporarily unavailable. Please try again in a few minutes.";
      } else if (error.message?.includes("Database error")) {
        errorMessage = "There was an issue with your account creation. Please try again or contact support.";
      }
      
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  // Get the current URL for redirect
  const redirectTo = typeof window !== 'undefined' ? window.location.origin : '';

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
              input: "text-white placeholder-gray-400",
              label: "text-gray-200",
            },
          }}
          providers={[]}
          redirectTo={redirectTo}
        />
      </CardContent>
    </Card>
  );
};

export default AuthForm;