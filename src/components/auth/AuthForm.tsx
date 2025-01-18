import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";
import { RoleSelector } from "./components/RoleSelector";
import { AuthError as AuthErrorComponent } from "./components/AuthError";
import { useAuthRedirect } from "./hooks/useAuthRedirect";

type UserRole = Database["public"]["Enums"]["user_role"];

const REDIRECT_URL = 'https://beatbiz.co/auth';

const AuthForm = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("mode") === "signup";
  const [role, setRole] = useState<UserRole>("guest");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleAuthRedirect } = useAuthRedirect();

  const handleAuthError = (error: AuthError | Error) => {
    console.error("Auth error:", error);
    
    const errorMessages: Record<string, string> = {
      "invalid_credentials": "Invalid email or password. Please try again.",
      "user_not_found": "No account found with this email. Please sign up.",
      "email_taken": "An account with this email already exists.",
      "database_error": "There was a problem creating your account. Please try again.",
      "invalid_email": "Please enter a valid email address.",
      "weak_password": "Password should be at least 6 characters long.",
      "Database error saving new user": "Unable to create account. Please try again later.",
      "Database error finding user": "Unable to access user information. Please try again."
    };

    const message = error instanceof AuthError && errorMessages[error.message] 
      ? errorMessages[error.message] 
      : error.message;
      
    setError(message);
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Create auth user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: REDIRECT_URL,
          data: {
            role: role
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error("No user data returned");

      // Step 2: Create profile (will be handled by trigger)
      toast({
        title: "Check your email",
        description: "We sent you a confirmation link to complete your registration.",
      });

    } catch (error) {
      if (error instanceof AuthError || error instanceof Error) {
        handleAuthError(error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (!authData.user) throw new Error("No user data returned");

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error("No profile found");

      handleAuthRedirect(profile.role);

    } catch (error) {
      if (error instanceof AuthError || error instanceof Error) {
        handleAuthError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">
          {isSignUp ? "Create an account" : "Welcome back"}
        </CardTitle>
        <CardDescription>
          {isSignUp
            ? "Enter your email to create your account"
            : "Enter your email to sign in to your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
          {error && <AuthErrorComponent message={error} />}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
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

          {isSignUp && (
            <div className="space-y-2">
              <Label>I am a...</Label>
              <RoleSelector role={role} onRoleChange={setRole} />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSignUp ? "Sign up" : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;