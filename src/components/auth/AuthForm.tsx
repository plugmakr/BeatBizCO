
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { RoleSelector } from "./components/RoleSelector";
import { AuthError } from "./components/AuthError";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/database";

const AuthForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("register") === "true";
  const [role, setRole] = useState<UserRole>("producer");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, role);
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? "Create an Account" : "Welcome Back"}</CardTitle>
          <CardDescription>
            {isSignUp
              ? "Sign up to start creating and sharing beats"
              : "Sign in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <AuthError error={error} />}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label>Select your role</Label>
                <RoleSelector value={role} onChange={setRole} />
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
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                <>{isSignUp ? "Create Account" : "Sign In"}</>
              )}
            </Button>

            <div className="text-center text-sm">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => navigate("/auth")}
                  >
                    Sign in
                  </Button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => navigate("/auth?register=true")}
                  >
                    Create one
                  </Button>
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
