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
          handleRoleBasedRedirect(profile.role);
        }
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_UP" && session) {
        try {
          // First, ensure the profile exists
          const { data: existingProfile, error: profileCheckError } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", session.user.id)
            .single();

          if (profileCheckError) {
            // If profile doesn't exist, create it
            const { error: insertError } = await supabase
              .from("profiles")
              .insert({
                id: session.user.id,
                role: role,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });

            if (insertError) throw insertError;
          } else {
            // If profile exists, update it
            const { error: updateError } = await supabase
              .from("profiles")
              .update({
                role: role,
                updated_at: new Date().toISOString(),
              })
              .eq("id", session.user.id);

            if (updateError) throw updateError;
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
            description: "There was an issue setting up your profile. Please try again or contact support.",
            variant: "destructive",
          });
        }
      } else if (event === "SIGNED_IN" && session) {
        try {
          const { error } = await supabase
            .from("profiles")
            .update({
              role: role,
              updated_at: new Date().toISOString(),
            })
            .eq("id", session.user.id);

          if (error) throw error;

          toast({
            title: "Welcome back to BeatBiz!",
            description: "You've successfully signed in.",
          });
          
          handleRoleBasedRedirect(role);
        } catch (error) {
          console.error("Error updating role:", error);
          toast({
            title: "Error",
            description: "Failed to update user role. Please try again.",
            variant: "destructive",
          });
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
      default:
        navigate("/"); // Default route for other roles
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