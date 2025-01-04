import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AuthForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<"producer" | "artist" | "buyer">("buyer");

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session) {
      // Update the user's role in their profile
      supabase
        .from("profiles")
        .update({ role })
        .eq("id", session.user.id)
        .then(({ error }) => {
          if (error) {
            console.error("Error updating role:", error);
            toast({
              title: "Error",
              description: "Failed to set user role. Please try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Welcome to BeatBiz!",
              description: "You've successfully signed in.",
            });
            navigate("/dashboard");
          }
        });
    }
  });

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