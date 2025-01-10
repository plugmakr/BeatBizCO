import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import HowItWorks from "./pages/HowItWorks";
import Marketplace from "./pages/Marketplace";
import ProducerDashboard from "./pages/producer/Dashboard";
import ProducerProfile from "./pages/producer/ProducerProfile";
import ProducerClients from "./pages/producer/Clients";
import ProducerProjects from "./pages/producer/Projects";
import ProducerFinances from "./pages/producer/Finances";
import ProducerMarketplace from "./pages/producer/Marketplace";
import ProducerSoundLibrary from "./pages/producer/SoundLibrary";
import ProducerSupport from "./pages/producer/Support";
import ProducerWebsite from "./pages/producer/Website";
import ProducerFunnels from "./pages/producer/Funnels";
import ProducerMessages from "./pages/producer/Messages";
import ProducerSettings from "./pages/producer/Settings";
import ArtistDashboard from "./pages/artist/Dashboard";
import ArtistAnalytics from "./pages/artist/Analytics";
import ArtistMarketing from "./pages/artist/Marketing";
import ArtistSales from "./pages/artist/Sales";
import ArtistWebsite from "./pages/artist/Website";
import ArtistProfile from "./pages/ArtistProfile";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminMarketplace from "./pages/admin/Marketplace";
import AdminCollaborations from "./pages/admin/Collaborations";
import AdminContent from "./pages/admin/Content";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSupport from "./pages/admin/Support";
import AdminPayments from "./pages/admin/Payments";
import AdminPromotions from "./pages/admin/Promotions";
import AdminSettings from "./pages/admin/Settings";
import AdminLogs from "./pages/admin/Logs";
import AdminNotifications from "./pages/admin/Notifications";
import { ProducerLayout } from "./components/layouts/ProducerLayout";
import { ArtistLayout } from "./components/layouts/ArtistLayout";
import { AdminLayout } from "./components/layouts/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/marketplace" element={<Marketplace />} />
        
        {/* Producer Routes */}
        <Route path="/producer" element={<Navigate to="/producer/dashboard" replace />} />
        <Route path="/producer/*" element={
          <ProducerLayout>
            <Routes>
              <Route path="dashboard" element={<ProducerDashboard />} />
              <Route path="profile" element={<ProducerProfile />} />
              <Route path="clients" element={<ProducerClients />} />
              <Route path="projects" element={<ProducerProjects />} />
              <Route path="finances" element={<ProducerFinances />} />
              <Route path="marketplace" element={<ProducerMarketplace />} />
              <Route path="sound-library" element={<ProducerSoundLibrary />} />
              <Route path="support" element={<ProducerSupport />} />
              <Route path="website" element={<ProducerWebsite />} />
              <Route path="funnels" element={<ProducerFunnels />} />
              <Route path="messages" element={<ProducerMessages />} />
              <Route path="settings" element={<ProducerSettings />} />
            </Routes>
          </ProducerLayout>
        } />

        {/* Artist Routes */}
        <Route path="/artist" element={<Navigate to="/artist/dashboard" replace />} />
        <Route path="/artist/*" element={
          <ArtistLayout>
            <Routes>
              <Route path="dashboard" element={<ArtistDashboard />} />
              <Route path="analytics" element={<ArtistAnalytics />} />
              <Route path="marketing" element={<ArtistMarketing />} />
              <Route path="sales" element={<ArtistSales />} />
              <Route path="website" element={<ArtistWebsite />} />
              <Route path=":id" element={<ArtistProfile />} />
            </Routes>
          </ArtistLayout>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="marketplace" element={<AdminMarketplace />} />
              <Route path="collaborations" element={<AdminCollaborations />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="promotions" element={<AdminPromotions />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="logs" element={<AdminLogs />} />
            </Routes>
          </AdminLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;