import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Music2, 
  ShoppingCart, 
  Mic2, 
  HeadphonesIcon, 
  AudioWaveform,
  DollarSign,
  BarChart3,
  Globe,
  Users,
  Mail,
  Calendar,
  LineChart
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Music2 className="h-6 w-6" />
            <span className="text-xl font-bold">BeatBiz</span>
          </div>
          <div className="space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/auth")}
            >
              Register
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Music Marketplace
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Connect with artists, producers, and music enthusiasts. Buy, sell, and collaborate on beats and tracks.
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/auth")}
          className="px-8"
        >
          Get Started
        </Button>
      </section>

      {/* Core Features */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <ShoppingCart className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Buy & Sell</h3>
              <p className="text-muted-foreground">
                Trade beats and tracks in a secure marketplace
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <HeadphonesIcon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Listen & Preview</h3>
              <p className="text-muted-foreground">
                Stream high-quality previews before purchase
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <AudioWaveform className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Track Management</h3>
              <p className="text-muted-foreground">
                Organize and manage your music portfolio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Management Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Business Tools</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <BarChart3 className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-muted-foreground">
              Track your sales, audience engagement, and revenue metrics
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <Globe className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Pro Website</h3>
            <p className="text-muted-foreground">
              Custom website builder with your portfolio and music store
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <Users className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">CRM Tools</h3>
            <p className="text-muted-foreground">
              Manage client relationships and collaborations effectively
            </p>
          </div>
        </div>
      </section>

      {/* Marketing & Growth */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Marketing & Growth</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <Mail className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Email Marketing</h3>
              <p className="text-muted-foreground">
                Build and engage your audience with automated campaigns
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <Calendar className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Release Planning</h3>
              <p className="text-muted-foreground">
                Schedule and coordinate your music releases
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <LineChart className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Growth Analytics</h3>
              <p className="text-muted-foreground">
                Monitor your audience growth and engagement metrics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Marketplace</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-card p-4 rounded-lg shadow-sm">
              <div className="bg-muted aspect-square rounded-md mb-4" />
              <h3 className="font-semibold mb-2">Featured Beat #{item}</h3>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Producer Name</span>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>29.99</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* For Artists & Producers */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center md:text-left">
              <div className="inline-block mb-6">
                <Mic2 className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">For Artists</h2>
              <p className="text-muted-foreground mb-6">
                Find the perfect beat for your next hit. Connect with talented producers
                and build lasting collaborations.
              </p>
              <Button
                onClick={() => navigate("/auth")}
                variant="secondary"
              >
                Join as Artist
              </Button>
            </div>
            <div className="text-center md:text-left">
              <div className="inline-block mb-6">
                <AudioWaveform className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">For Producers</h2>
              <p className="text-muted-foreground mb-6">
                Showcase your beats to a global audience. Sell your tracks and
                collaborate with artists worldwide.
              </p>
              <Button
                onClick={() => navigate("/auth")}
                variant="secondary"
              >
                Join as Producer
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;