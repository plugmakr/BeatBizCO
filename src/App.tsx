import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ArtistDashboard from "./pages/artist/Dashboard";
import ArtistAnalytics from "./pages/artist/Analytics";
import ArtistMarketing from "./pages/artist/Marketing";
import ArtistSales from "./pages/artist/Sales";
import ArtistWebsite from "./pages/artist/Website";
import ArtistProfile from "./pages/ArtistProfile";
import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/marketplace" element={<Marketplace />} />
        
        {/* Producer Routes */}
        <Route path="/producer" element={<ProducerDashboard />} />
        <Route path="/producer/profile" element={<ProducerProfile />} />
        <Route path="/producer/clients" element={<ProducerClients />} />
        <Route path="/producer/projects" element={<ProducerProjects />} />
        <Route path="/producer/finances" element={<ProducerFinances />} />
        <Route path="/producer/marketplace" element={<ProducerMarketplace />} />
        <Route path="/producer/sound-library" element={<ProducerSoundLibrary />} />
        <Route path="/producer/support" element={<ProducerSupport />} />
        <Route path="/producer/website" element={<ProducerWebsite />} />
        <Route path="/producer/funnels" element={<ProducerFunnels />} />

        {/* Artist Routes */}
        <Route path="/artist" element={<ArtistDashboard />} />
        <Route path="/artist/analytics" element={<ArtistAnalytics />} />
        <Route path="/artist/marketing" element={<ArtistMarketing />} />
        <Route path="/artist/sales" element={<ArtistSales />} />
        <Route path="/artist/website" element={<ArtistWebsite />} />
        <Route path="/artist/:id" element={<ArtistProfile />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;