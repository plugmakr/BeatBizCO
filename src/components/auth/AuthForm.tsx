import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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

type UserRole = Database["public"]["Enums"]["user_role"];

const AuthForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("register") === "true";
  const [role, setRole] = useState<UserRole>("producer");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateAuthState = async (userId: string, userRole: string) => {
    try {
      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // Store auth data
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userId', userId);
      if (profile) {
        localStorage.setItem('userProfile', JSON.stringify(profile));
      }

      // Dispatch auth event
      const event = new CustomEvent('userAuthenticated', {
        detail: { 
          user: { id: userId },
          role: userRole,
          profile
        }
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error updating auth state:', error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('No user data returned');

      // 2. Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            role: role,
            email: email,
            created_at: new Date().toISOString(),
          }
        ]);

      if (profileError) throw profileError;

      // 3. Auto sign in
      const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (!session) throw new Error('No session after sign in');

      // 4. Update auth state
      await updateAuthState(authData.user.id, role);

      toast({
        title: "Account created successfully",
        description: "Redirecting to dashboard...",
      });

      // 5. Redirect to dashboard
      navigate(`/${role}/dashboard`, { replace: true });
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Sign in
      const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (!session?.user) throw new Error('No session after sign in');

      // 2. Get user profile and role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile?.role) throw new Error('User role not found');

      // 3. Update auth state
      await updateAuthState(session.user.id, profile.role);

      toast({
        title: "Signed in successfully",
        description: "Redirecting to dashboard...",
      });

      // 4. Redirect to dashboard
      navigate(`/${profile.role}/dashboard`, { replace: true });
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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
              <Label>Select your role</Label>
              <RoleSelector value={role} onValueChange={setRole} />
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? "Creating account..." : "Signing in..."}
              </>
            ) : (
              isSignUp ? "Create account" : "Sign in"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;