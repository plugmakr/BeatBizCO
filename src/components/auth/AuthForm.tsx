import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Starting signup process...");
      console.log("Email:", email);
      console.log("Role:", role);
      console.log("Redirect URL:", REDIRECT_URL);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: REDIRECT_URL,
          data: { role }
        }
      });

      console.log("Signup response:", { data, error });

      if (error) {
        console.error("Signup error details:", {
          message: error.message,
          status: error.status,
          name: error.name
        });
        throw error;
      }

      // If we have a session, user was auto-confirmed
      if (data?.session) {
        console.log("User was auto-confirmed, redirecting...");
        handleAuthRedirect(role);
        return;
      }

      toast({
        title: "Check your email",
        description: "We sent you a confirmation link to complete your registration.",
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      setError(error?.message || "Unable to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Starting signin process...");
      console.log("Email:", email);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Signin error details:", {
          message: error.message,
          status: error.status,
          name: error.name
        });
        throw error;
      }

      handleAuthRedirect('guest');
    } catch (error: any) {
      console.error("Signin error:", error);
      setError(error?.message || "Invalid email or password");
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