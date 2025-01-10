import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Session } from "@supabase/supabase-js";

type UserRole = "producer" | "artist" | "admin" | "guest";

const AuthForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<UserRole>("guest");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);
    
    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast({
            title: "Error",
            description: "Failed to fetch user profile",
            variant: "destructive",
          });
          return;
        }

        if (profile) {
          handleRoleBasedRedirect(profile.role);
        }
      }
    };

    checkExistingSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthStateChange = async (event: string, session: Session | null) => {
    if (event === 'SIGNED_UP' && session) {
      try {
        // Wait a short moment to allow the trigger to create the initial profile
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update the profile with the selected role
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            role: role,
            updated_at: new Date().toISOString(),
          })
          .eq('id', session.user.id);

        if (updateError) {
          console.error("Error updating profile:", updateError);
          toast({
            title: "Error",
            description: "There was an issue updating your profile. Please try again.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Welcome to BeatBiz!",
          description: "Your account has been created successfully.",
        });
        
        handleRoleBasedRedirect(role);
      } catch (error) {
        console.error("Error setting up profile:", error);
        toast({
          title: "Error",
          description: "There was an issue setting up your profile. Please try again.",
          variant: "destructive",
        });
      }
    } else if (event === 'SIGNED_IN' && session) {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error getting user role:", error);
          toast({
            title: "Error",
            description: "Failed to get user role. Please try again.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Welcome back to BeatBiz!",
          description: "You've successfully signed in.",
        });
        
        handleRoleBasedRedirect(profile.role);
      } catch (error) {
        console.error("Error getting user role:", error);
        toast({
          title: "Error",
          description: "Failed to get user role. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRoleBasedRedirect = (userRole: string) => {
    switch (userRole) {
      case "admin":
        navigate("/admin");
        break;
      case "producer":
        navigate("/producer");
        break;
      case "artist":
        navigate("/artist");
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
            <div className="grid grid-cols-4 gap-2">
              {(["producer", "artist", "admin", "guest"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setRole(option)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      role === option
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
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
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthForm;