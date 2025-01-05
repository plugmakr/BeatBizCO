import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "@/pages/Auth";
import Index from "@/pages/Index";
import AuthGuard from "@/components/auth/AuthGuard";
import RoleGuard from "@/components/auth/RoleGuard";
import AdminDashboard from "@/pages/admin/Dashboard";
import UserManagement from "@/pages/admin/UserManagement";
import ProducerDashboard from "@/pages/producer/Dashboard";
import Clients from "@/pages/producer/Clients";
import Funnels from "@/pages/producer/Funnels";
import Marketplace from "@/pages/producer/Marketplace";
import Messages from "@/pages/producer/Messages";
import Projects from "@/pages/producer/Projects";
import Settings from "@/pages/producer/Settings";
import SoundLibrary from "@/pages/producer/SoundLibrary";
import Support from "@/pages/producer/Support";
import Website from "@/pages/producer/Website";
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
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<UserManagement />} />
                </Routes>
              </RoleGuard>
            </AuthGuard>
          }
        />

        {/* Producer Routes */}
        <Route
          path="/producer/*"
          element={
            <AuthGuard>
              <RoleGuard allowedRoles={["producer", "admin"]}>
                <Routes>
                  <Route index element={<ProducerDashboard />} />
                  <Route path="dashboard" element={<ProducerDashboard />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="funnels" element={<Funnels />} />
                  <Route path="marketplace" element={<Marketplace />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="sound-library" element={<SoundLibrary />} />
                  <Route path="support" element={<Support />} />
                  <Route path="website" element={<Website />} />
                </Routes>
              </RoleGuard>
            </AuthGuard>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;