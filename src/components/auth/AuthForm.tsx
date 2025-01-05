import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
      if (event === "SIGNED_IN" && session) {
        try {
          const { error } = await supabase
            .from("profiles")
            .upsert({
              id: session.user.id,
              role: role,
              updated_at: new Date().toISOString(),
            }, {
              onConflict: 'id'
            });

          if (error) throw error;

          toast({
            title: "Welcome to BeatBiz!",
            description: "You've successfully signed in.",
          });
          
          handleRoleBasedRedirect(role);
        } catch (error) {
          console.error("Error updating role:", error);
          toast({
            title: "Error",
            description: "Failed to set user role. Please try again.",
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
      case "producer":
        navigate("/producer");
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
            <Label>I am a...</Label>
            <RadioGroup
              defaultValue={role}
              onValueChange={(value) => setRole(value as UserRole)}
              className="grid grid-cols-2 gap-4"
            >
              {(["admin", "producer", "artist", "buyer"] as const).map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="capitalize">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
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