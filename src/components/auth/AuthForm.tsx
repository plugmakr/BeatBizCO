import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ShoppingCart, 
  Music2, 
  Mic2,
  Loader2
} from "lucide-react";
import { AuthError } from "@supabase/supabase-js";

type UserRole = "producer" | "artist" | "admin" | "guest";

interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
  icon: JSX.Element;
}

const REDIRECT_URL = 'https://beatbiz.co/auth';

const AuthForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("mode") === "signup";
  const [role, setRole] = useState<UserRole>("guest");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    }
  ];

  const handleAuthError = (error: AuthError) => {
    console.error("Auth error:", error);
    
    // Map specific error messages to user-friendly messages
    const errorMessages: Record<string, string> = {
      "invalid_credentials": "Invalid email or password. Please try again.",
      "user_not_found": "No account found with this email. Please sign up.",
      "email_taken": "An account with this email already exists.",
      "database_error": "There was a problem creating your account. Please try again.",
      "invalid_email": "Please enter a valid email address.",
      "weak_password": "Password should be at least 6 characters long."
    };

    // Get user-friendly message or use error message directly
    const userMessage = errorMessages[error.message] || error.message;
    setError(userMessage);
    
    // Show toast for critical errors
    if (error.message.includes("database_error")) {
      toast({
        title: "System Error",
        description: "We're experiencing technical difficulties. Please try again later.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);
    
    const checkExistingSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log("Existing session found:", session);
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            console.log("User profile found:", profile);
            handleRoleBasedRedirect(profile.role);
          } else {
            console.log("No profile found for user:", session.user.id);
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
      }
    };

    checkExistingSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting signup with role:", role);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role
          },
          emailRedirectTo: REDIRECT_URL
        }
      });

      if (error) throw error;

      if (data.user) {
        console.log("Signup successful:", data.user);
        toast({
          title: "Success!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting signin");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        console.log("Signin successful:", data.user);
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      }
    } catch (error: any) {
      console.error("Signin error:", error);
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthStateChange = async (event: string, session: any) => {
    setError(null);
    console.log("Auth state changed:", event, session);

    if (event === 'SIGNED_IN' && session) {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error getting user role:", error);
          throw error;
        }

        console.log("User profile retrieved:", profile);
        toast({
          title: "Welcome to BeatBiz!",
          description: "You've successfully signed in.",
        });
        
        handleRoleBasedRedirect(profile.role);
      } catch (error) {
        console.error("Error in auth state change:", error);
        setError("Failed to get user role. Please try again.");
      }
    } else if (event === 'SIGNED_OUT') {
      navigate('/');
    }
  };

  const handleRoleBasedRedirect = (userRole: string) => {
    console.log("Redirecting based on role:", userRole);
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
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I am a...
              </label>
              <div className="grid grid-cols-1 gap-2">
                {roleOptions.map((option) => (
                  <button
                    type="button"
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
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;