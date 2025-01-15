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
  const [isResetMode, setIsResetMode] = useState(false);

  const handleAuthError = (error: AuthError) => {
    console.error("Auth error details:", {
      message: error.message,
      name: error.name,
      status: error instanceof AuthApiError ? error.status : 'unknown',
      details: error,
      stack: error.stack
    });
    
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

    const userMessage = errorMessages[error.message] || error.message;
    setError(userMessage);
    
    if (error.message.includes("database_error") || 
        error.message.includes("Database error saving new user")) {
      toast({
        title: "System Error",
        description: "We're experiencing technical difficulties. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Use Netlify form submission
      const formData = new FormData();
      formData.append("form-name", "password-reset");
      formData.append("email", email);

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      toast({
        title: "Password Reset Request Sent",
        description: "Please check your email for further instructions.",
      });
      setIsResetMode(false);
    } catch (error: any) {
      setError("Failed to send password reset request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
        console.log("Signup successful. User data:", {
          id: data.user.id,
          email: data.user.email,
          metadata: data.user.user_metadata
        });
        
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error("Error verifying profile creation:", profileError);
          throw profileError;
        }

        console.log("Profile created successfully:", profile);
        toast({
          title: "Success!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      console.error("Signup error details:", {
        error,
        message: error.message,
        status: error instanceof AuthApiError ? error.status : 'unknown',
        metadata: error.metadata || {},
        stack: error.stack
      });
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
      console.error("Signin error details:", {
        error,
        message: error.message,
        status: error instanceof AuthApiError ? error.status : 'unknown'
      });
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">
          {isResetMode 
            ? "Reset Password"
            : isSignUp 
              ? "Create your BeatBiz account" 
              : "Welcome back to BeatBiz"}
        </CardTitle>
        <CardDescription>
          {isResetMode 
            ? "Enter your email to receive password reset instructions"
            : isSignUp 
              ? "Sign up to start creating, collaborating, and selling your music"
              : "Sign in to continue your music journey"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthErrorComponent error={error} />
        {/* Add hidden Netlify form */}
        <form name="password-reset" data-netlify="true" hidden>
          <input type="email" name="email" />
        </form>
        <form 
          onSubmit={isResetMode ? handlePasswordReset : isSignUp ? handleSignUp : handleSignIn} 
          className="space-y-4"
          // Add these attributes for Netlify form handling when in reset mode
          {...(isResetMode ? {
            name: "password-reset",
            method: "POST",
            "data-netlify": "true"
          } : {})}
        >
          {isSignUp && !isResetMode && (
            <RoleSelector selectedRole={role} onRoleSelect={setRole} />
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {!isResetMode && (
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
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isResetMode 
              ? "Send Reset Instructions"
              : isSignUp 
                ? "Create Account" 
                : "Sign In"}
          </Button>
          
          {!isSignUp && !isResetMode && (
            <Button
              type="button"
              variant="ghost"
              className="w-full mt-2"
              onClick={() => setIsResetMode(true)}
            >
              Forgot Password?
            </Button>
          )}
          
          {isResetMode && (
            <Button
              type="button"
              variant="ghost"
              className="w-full mt-2"
              onClick={() => setIsResetMode(false)}
            >
              Back to Sign In
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
