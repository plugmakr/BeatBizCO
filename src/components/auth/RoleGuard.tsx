import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const { userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    if (userRole) {
      window.location.href = `${window.location.origin}/${userRole}/dashboard`;
      return null;
    }
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;