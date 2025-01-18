import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { AuthError } from "@supabase/supabase-js";
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

  const handleAuthError = (error: Error) => {
    console.error("Auth error:", error);
    
    const errorMessages: Record<string, string> = {
      "Invalid login credentials": "Invalid email or password",
      "User already registered": "Email already in use",
      "Email not confirmed": "Please check your email to confirm your account",
      "Invalid email": "Please enter a valid email",
      "Password should be at least 6 characters": "Password must be at least 6 characters",
    };

    const message = errorMessages[error.message] || "An error occurred. Please try again.";
    setError(message);
    setIsLoading(false);
  };

  const createProfile = async (userId: string) => {
    const { error } = await supabase
      .from('profiles')
      .insert([{
        id: userId,
        email,
        role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Profile creation error:', error);
      // Continue even if profile creation fails - it will be handled by the trigger
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: REDIRECT_URL
        }
      });

      if (error) throw error;
      if (!data?.user) throw new Error("No user data returned");

      await createProfile(data.user.id);

      toast({
        title: "Check your email",
        description: "We sent you a confirmation link to complete your registration.",
      });
    } catch (error) {
      handleAuthError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (!data?.user) throw new Error("No user data returned");

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      handleAuthRedirect(profile?.role || 'guest');
    } catch (error) {
      handleAuthError(error as Error);
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