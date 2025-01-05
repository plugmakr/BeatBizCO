import { useState, useEffect } from "react";
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
  const [role, setRole] = useState<UserRole>("buyer");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleBasedRedirect = (userRole: string) => {
    switch (userRole) {
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

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (session && mounted) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          if (profile && mounted) {
            handleRoleBasedRedirect(profile.role);
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        if (mounted) {
          toast({
            title: "Error",
            description: "There was a problem checking your session.",
            variant: "destructive",
          });
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session && mounted) {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (profileError) throw profileError;

          if (mounted) {
            toast({
              title: "Welcome to BeatBiz!",
              description: "You've successfully signed in.",
            });
            
            // Ensure we're using the correct role from the profile
            const userRole = profile?.role || role;
            console.log("Redirecting user with role:", userRole);
            handleRoleBasedRedirect(userRole);
          }
        } catch (error) {
          console.error("Error during sign in:", error);
          if (mounted) {
            toast({
              title: "Error",
              description: "There was a problem signing you in. Please try again.",
              variant: "destructive",
            });
          }
        } finally {
          if (mounted) {
            setIsLoading(false);
          }
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, role, toast]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome to BeatBiz</CardTitle>
        <CardDescription>
          Sign in to start creating, collaborating, and selling your music
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I am a...
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["producer", "artist", "buyer"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setRole(option)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${role === option
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
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
            additionalData={{
              role: role
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthForm;