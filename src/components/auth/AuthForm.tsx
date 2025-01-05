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

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (session) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          if (profile) {
            handleRoleBasedRedirect(profile.role);
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        toast({
          title: "Error",
          description: "There was a problem checking your session.",
          variant: "destructive",
        });
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setIsLoading(true);
        try {
          // Add a small delay to allow the trigger to complete
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (profileError) throw profileError;

          toast({
            title: "Welcome to BeatBiz!",
            description: "You've successfully signed in.",
          });
          
          handleRoleBasedRedirect(profile?.role || role);
        } catch (error) {
          console.error("Error during sign in:", error);
          toast({
            title: "Error",
            description: "There was a problem signing you in. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, role, toast]);

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