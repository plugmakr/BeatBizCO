
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const { userRole, isLoading } = useAuth();
  
  useEffect(() => {
    console.log("RoleGuard - Current userRole:", userRole);
    console.log("RoleGuard - Allowed roles:", allowedRoles);
  }, [userRole, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!userRole) {
    console.log("RoleGuard - No user role, redirecting to auth");
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.log(`RoleGuard - User role ${userRole} not allowed, redirecting to dashboard`);
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  console.log("RoleGuard - Access granted");
  return <>{children}</>;
};

export default RoleGuard;
