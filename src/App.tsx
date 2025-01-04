import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthGuard from "./components/auth/AuthGuard";
import RoleGuard from "./components/auth/RoleGuard";
import ArtistDashboard from "./pages/artist/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import ProducerDashboard from "./pages/producer/Dashboard";
import ProducerProjects from "./pages/producer/Projects";
import ProducerClients from "./pages/producer/Clients";
import ProducerFinances from "./pages/producer/Finances";
import ProducerMarketplace from "./pages/producer/Marketplace";
import ProducerSupport from "./pages/producer/Support";
import ProducerWebsite from "./pages/producer/Website";
import ProducerSoundLibrary from "./pages/producer/SoundLibrary";
import ProducerFunnels from "./pages/producer/Funnels";
import HowItWorks from "./pages/HowItWorks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Index />
              </AuthGuard>
            }
          />
          <Route
            path="/producer/*"
            element={
              <AuthGuard>
                <RoleGuard allowedRoles={["producer"]}>
                  <Routes>
                    <Route path="/" element={<ProducerDashboard />} />
                    <Route path="/projects" element={<ProducerProjects />} />
                    <Route path="/clients" element={<ProducerClients />} />
                    <Route path="/finances" element={<ProducerFinances />} />
                    <Route path="/marketplace" element={<ProducerMarketplace />} />
                    <Route path="/support" element={<ProducerSupport />} />
                    <Route path="/website" element={<ProducerWebsite />} />
                    <Route path="/sound-library" element={<ProducerSoundLibrary />} />
                    <Route path="/funnels" element={<ProducerFunnels />} />
                  </Routes>
                </RoleGuard>
              </AuthGuard>
            }
          />
          <Route
            path="/artist"
            element={
              <AuthGuard>
                <RoleGuard allowedRoles={["artist"]}>
                  <ArtistDashboard />
                </RoleGuard>
              </AuthGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGuard>
                <RoleGuard allowedRoles={["admin"]}>
                  <AdminDashboard />
                </RoleGuard>
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;