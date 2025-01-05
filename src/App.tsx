import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "@/pages/Auth";
import Index from "@/pages/Index";
import AuthGuard from "@/components/auth/AuthGuard";
import RoleGuard from "@/components/auth/RoleGuard";
import AdminDashboard from "@/pages/admin/Dashboard";
import ProducerDashboard from "@/pages/producer/Dashboard";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <AuthGuard>
              <RoleGuard allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleGuard>
            </AuthGuard>
          }
        />

        {/* Producer Routes */}
        <Route
          path="/producer"
          element={
            <AuthGuard>
              <RoleGuard allowedRoles={["producer", "admin"]}>
                <ProducerDashboard />
              </RoleGuard>
            </AuthGuard>
          }
        />
        <Route
          path="/producer/dashboard"
          element={
            <AuthGuard>
              <RoleGuard allowedRoles={["producer", "admin"]}>
                <ProducerDashboard />
              </RoleGuard>
            </AuthGuard>
          }
        />

        {/* Add other routes here */}
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;