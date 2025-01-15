import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Session, AuthError } from "@supabase/supabase-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ShoppingCart, 
  Music2, 
  Mic2, 
  Shield 
} from "lucide-react";

type UserRole = "producer" | "artist" | "admin" | "guest";

interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
  icon: JSX.Element;
}

const AuthForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("mode") === "signup";
  const [role, setRole] = useState<UserRole>("guest");
  const [error, setError] = useState<string | null>(null);

  const roleOptions: RoleOption[] = [
    {
      value: "guest",
      label: "Guest",
      description: "Browse and purchase beats and music",
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      value: "producer",
      label: "Producer",
      description: "Sell beats and manage your business",
      icon: <Music2 className="h-5 w-5" />
    },
    {
      value: "artist",
      label: "Artist",
      description: "Share and sell your music",
      icon: <Mic2 className="h-5 w-5" />
    },
    {
      value: "admin",
      label: "Admin",
      description: "Manage platform and users",
      icon: <Shield className="h-5 w-5" />
    }
  ];

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
          setError("Failed to fetch user profile. Please try again.");
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
    setError(null);

    if (event === 'SIGNED_UP' && session) {
      try {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            role: role,
            updated_at: new Date().toISOString()
          })
          .eq('id', session.user.id);

        if (profileError) {
          console.error("Error updating profile:", profileError);
          setError("There was an issue creating your profile. Please try again.");
          await supabase.auth.signOut();
          return;
        }

        toast({
          title: "Welcome to BeatBiz!",
          description: "Your account has been created successfully.",
        });
        
        handleRoleBasedRedirect(role);
      } catch (error) {
        console.error("Error setting up profile:", error);
        setError("There was an issue setting up your profile. Please try again.");
        await supabase.auth.signOut();
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
          setError("Failed to get user role. Please try again.");
          return;
        }

        toast({
          title: "Welcome back to BeatBiz!",
          description: "You've successfully signed in.",
        });
        
        handleRoleBasedRedirect(profile.role);
      } catch (error) {
        console.error("Error getting user role:", error);
        setError("Failed to get user role. Please try again.");
      }
    } else if (event === 'SIGNED_OUT') {
      navigate('/');
    }
  };

  const handleRoleBasedRedirect = (userRole: string) => {
    switch (userRole) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "producer":
        navigate("/producer/dashboard");
        break;
      case "artist":
        navigate("/artist/dashboard");
        break;
      default:
        navigate("/");
        break;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">
          {isSignUp ? "Create your BeatBiz account" : "Welcome back to BeatBiz"}
        </CardTitle>
        <CardDescription>
          {isSignUp 
            ? "Sign up to start creating, collaborating, and selling your music"
            : "Sign in to continue your music journey"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I am a...
              </label>
              <div className="grid grid-cols-1 gap-2">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRole(option.value)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
                      ${
                        role === option.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                  >
                    <div className={`${role === option.value ? "text-primary-foreground" : "text-primary"}`}>
                      {option.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm opacity-90">{option.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <Auth
            supabaseClient={supabase}
            view={isSignUp ? "sign_up" : "sign_in"}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "rgb(var(--primary))",
                    brandAccent: "rgb(var(--primary))",
                    inputText: "white",
                    inputPlaceholder: "rgb(156 163 175)",
                  },
                },
              },
              className: {
                input: "!text-white !placeholder-gray-400",
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