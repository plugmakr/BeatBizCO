import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import TopNavigation from "@/components/navigation/TopNavigation";
import { toast } from "react-hot-toast";

const producerData = {
  name: "Producer Name",
  image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
  location: "Los Angeles, CA",
  followers: "1.2M",
  bio: "Renowned music producer known for chart-topping hits.",
  albums: [
    { id: 1, title: "Hit Album 1", year: "2020", tracks: 10 },
    { id: 2, title: "Hit Album 2", year: "2021", tracks: 12 },
  ],
  singles: [
    { id: 1, title: "Smash Hit 1", year: "2021" },
    { id: 2, title: "Smash Hit 2", year: "2022" },
  ],
  collaborations: [
    { id: 1, title: "Collab Hit 1", artist: "Artist A", year: "2021" },
    { id: 2, title: "Collab Hit 2", artist: "Artist B", year: "2022" },
  ],
};

export default function ProducerProfile() {
  const [isFollowing, setIsFollowing] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <TopNavigation 
        session={null}
        userRole={null}
        handleLogout={handleLogout}
        scrollToSection={scrollToSection}
        getDashboardRoute={getDashboardRoute}
      />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-yellow-500/20 to-red-500/20">
        <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end">
          <img
            src={producerData.image}
            alt={producerData.name}
            className="w-40 h-40 rounded-lg border-2 border-yellow-500 shadow-xl"
          />
          <div className="ml-8 mb-4 flex flex-col gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white">{producerData.name}</h1>
              <p className="text-xl text-white/80">
                {producerData.location} • {producerData.followers} followers
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

      <Tabs defaultValue="albums" className="max-w-7xl mx-auto px-4 py-12">
        <TabsList className="bg-background/50 backdrop-blur-sm">
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="singles">Singles</TabsTrigger>
          <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
        </TabsList>

        <TabsContent value="albums" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {producerData.albums.map((album) => (
              <Card key={album.id} className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{album.title}</h3>
                  <p className="text-muted-foreground">
                    Released: {album.year} • {album.tracks} tracks
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="singles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {producerData.singles.map((single) => (
              <Card key={single.id} className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{single.title}</h3>
                  <p className="text-muted-foreground">Released: {single.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collaborations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {producerData.collaborations.map((collab) => (
              <Card key={collab.id} className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{collab.title}</h3>
                  <p className="text-muted-foreground">
                    With: {collab.artist} • {collab.year}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
