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

        {/* Producer Routes - Using nested route configuration */}
        <Route
          path="/producer/*"
          element={
            <AuthGuard>
              <RoleGuard allowedRoles={["producer", "admin"]}>
                <Routes>
                  <Route index element={<ProducerDashboard />} />
                  <Route path="dashboard" element={<ProducerDashboard />} />
                  <Route path="clients" element={<ProducerDashboard />} />
                  <Route path="funnels" element={<ProducerDashboard />} />
                  <Route path="marketplace" element={<ProducerDashboard />} />
                  <Route path="messages" element={<ProducerDashboard />} />
                  <Route path="projects" element={<ProducerDashboard />} />
                  <Route path="settings" element={<ProducerDashboard />} />
                  <Route path="sound-library" element={<ProducerDashboard />} />
                  <Route path="support" element={<ProducerDashboard />} />
                  <Route path="website" element={<ProducerDashboard />} />
                </Routes>
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