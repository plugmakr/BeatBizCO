import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Auth from "./pages/Auth";
import Marketplace from "./pages/Marketplace";
import ArtistProfile from "./pages/ArtistProfile";
import ProducerProfile from "./pages/producer/ProducerProfile";
import ArtistDashboard from "./pages/artist/Dashboard";
import ArtistWebsite from "./pages/artist/Website";
import ArtistMarketing from "./pages/artist/Marketing";
import ArtistSales from "./pages/artist/Sales";
import ArtistAnalytics from "./pages/artist/Analytics";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/artist/:slug" element={<ArtistProfile />} />
          <Route path="/producer/:slug" element={<ProducerProfile />} />
          <Route path="/artist/dashboard" element={<ArtistDashboard />} />
          <Route path="/artist/website" element={<ArtistWebsite />} />
          <Route path="/artist/marketing" element={<ArtistMarketing />} />
          <Route path="/artist/sales" element={<ArtistSales />} />
          <Route path="/artist/analytics" element={<ArtistAnalytics />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;