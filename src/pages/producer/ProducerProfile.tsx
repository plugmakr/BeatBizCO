import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, Play, Pause } from "lucide-react";
import TopNavigation from "@/components/navigation/TopNavigation";
import { toast } from "react-hot-toast";

const producerData = {
  name: "Metro Boomin",
  image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop",
  location: "Atlanta, GA",
  followers: "5.2M",
  bio: "Legendary producer behind countless platinum hits. Known for innovative sound design and genre-defining beats.",
  beats: [
    { 
      id: 1, 
      title: "Midnight Trap", 
      price: "$299",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop",
      preview: "https://example.com/preview1.mp3"
    },
    { 
      id: 2, 
      title: "Dark Paradise", 
      price: "$399",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop",
      preview: "https://example.com/preview2.mp3"
    },
  ],
  sampleKits: [
    { 
      id: 1, 
      title: "Future Bass Essentials", 
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=800&auto=format&fit=crop",
    },
    { 
      id: 2, 
      title: "Trap Universe", 
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1509310102085-2af0ddb8d7b9?w=800&auto=format&fit=crop",
    },
  ],
  drumKits: [
    { 
      id: 1, 
      title: "808 Mayhem", 
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop",
    },
    { 
      id: 2, 
      title: "Platinum Drums", 
      price: "$59.99",
      image: "https://images.unsplash.com/photo-1461784121038-f088ca1e7714?w=800&auto=format&fit=crop",
    },
  ],
  licenses: [
    { id: 1, title: "Basic License", price: "$29.99", features: ["MP3 File", "Personal Use"] },
    { id: 2, title: "Premium License", price: "$299.99", features: ["WAV Files", "Commercial Use", "Full Rights"] },
  ],
};

export default function ProducerProfile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);

  // Mock functions for TopNavigation props
  const handleLogout = () => {};
  const scrollToSection = (id: string) => {};
  const getDashboardRoute = () => "/dashboard";

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? "Unfollowed producer" : "Following producer");
  };

  const handleMessage = () => {
    toast.success("Message feature coming soon!");
  };

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
    // Add actual audio playback logic here
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <TopNavigation 
        session={null}
        userRole={null}
        handleLogout={handleLogout}
        scrollToSection={scrollToSection}
        getDashboardRoute={getDashboardRoute}
      />
      
      {/* Hero Section with Gradient */}
      <div className="relative h-[50vh] bg-gradient-to-r from-yellow-500/20 via-red-500/20 to-purple-500/20">
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end">
          <img
            src={producerData.image}
            alt={producerData.name}
            className="w-48 h-48 rounded-lg border-2 border-yellow-500 shadow-xl object-cover"
          />
          <div className="ml-8 mb-4 flex flex-col gap-4">
            <div>
              <h1 className="text-5xl font-bold text-white">{producerData.name}</h1>
              <p className="text-xl text-white/80 mt-2">
                {producerData.location} • {producerData.followers} followers
              </p>
              <p className="text-lg text-white/70 mt-2 max-w-2xl">
                {producerData.bio}
              </p>
            </div>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 gap-2"
                onClick={handleFollow}
              >
                <Heart className={`w-5 h-5 ${isFollowing ? 'fill-current' : ''}`} />
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/20 gap-2"
                onClick={handleMessage}
              >
                <MessageCircle className="w-5 h-5" />
                Message
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/20 gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="beats" className="max-w-7xl mx-auto px-4 py-12">
        <TabsList className="bg-background/50 backdrop-blur-sm">
          <TabsTrigger value="beats">Beats</TabsTrigger>
          <TabsTrigger value="sample-kits">Sample Kits</TabsTrigger>
          <TabsTrigger value="drum-kits">Drum Kits</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
        </TabsList>

        <TabsContent value="beats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {producerData.beats.map((beat) => (
              <Card key={beat.id} className="overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="relative h-48">
                  <img src={beat.image} alt={beat.title} className="w-full h-full object-cover" />
                  <Button
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-yellow-500/90 hover:bg-yellow-600"
                    onClick={() => togglePlay(beat.id)}
                  >
                    {playingId === beat.id ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{beat.title}</h3>
                  <p className="text-yellow-500 font-bold">{beat.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sample-kits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {producerData.sampleKits.map((kit) => (
              <Card key={kit.id} className="overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="relative h-48">
                  <img src={kit.image} alt={kit.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{kit.title}</h3>
                  <p className="text-yellow-500 font-bold">{kit.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drum-kits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {producerData.drumKits.map((kit) => (
              <Card key={kit.id} className="overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="relative h-48">
                  <img src={kit.image} alt={kit.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{kit.title}</h3>
                  <p className="text-yellow-500 font-bold">{kit.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {producerData.licenses.map((license) => (
              <Card key={license.id} className="glass-card hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{license.title}</h3>
                  <p className="text-3xl font-bold text-yellow-500 mb-6">{license.price}</p>
                  <ul className="space-y-2">
                    {license.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-yellow-500">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600">
                    Purchase License
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}