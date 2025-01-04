import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ShoppingCart, Heart, Share2, Pause, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopNavigation from "@/components/navigation/TopNavigation";
import { toast } from "react-hot-toast";

const artistData = {
  name: "J. Cole",
  coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
  profileImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
  bio: "Multi-platinum producer with a unique sound blending soul and hip-hop. Known for creating atmospheric beats that tell stories.",
  location: "New York, NY",
  followers: "2.5M",
  genres: ["Hip Hop", "R&B", "Soul"],
  featuredTracks: [
    { id: 1, title: "Summer Nights", duration: "3:45", price: 299, plays: "1.2M" },
    { id: 2, title: "City Lights", duration: "4:12", price: 349, plays: "980K" },
    { id: 3, title: "Midnight Drive", duration: "3:58", price: 299, plays: "850K" },
  ],
  socialMedia: {
    instagram: "@jcole",
    twitter: "@JColeNC",
    spotify: "J. Cole",
    youtube: "J. Cole Official"
  },
  albums: [
    { id: 1, title: "The Off-Season", year: "2021", tracks: 12 },
    { id: 2, title: "KOD", year: "2018", tracks: 12 },
    { id: 3, title: "4 Your Eyez Only", year: "2016", tracks: 10 }
  ],
  singles: [
    { id: 1, title: "p r i d e . i s . t h e . d e v i l", year: "2021" },
    { id: 2, title: "Middle Child", year: "2019" },
    { id: 3, title: "ATM", year: "2018" }
  ],
  collaborations: [
    { id: 1, title: "a lot", artist: "21 Savage", year: "2018" },
    { id: 2, title: "My Life", artist: "J. Cole & 21 Savage", year: "2021" },
    { id: 3, title: "Family and Loyalty", artist: "Gang Starr", year: "2019" }
  ]
};

export default function ArtistProfile() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock functions for TopNavigation props
  const handleLogout = () => {};
  const scrollToSection = (id: string) => {};
  const getDashboardRoute = () => "/dashboard";

  const togglePlay = (trackId: number) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? "Unfollowed artist" : "Following artist");
  };

  const handleMessage = () => {
    toast.success("Message feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <TopNavigation 
        session={null}
        userRole={null}
        handleLogout={handleLogout}
        scrollToSection={scrollToSection}
        getDashboardRoute={getDashboardRoute}
      />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${artistData.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end">
          <img
            src={artistData.profileImage}
            alt={artistData.name}
            className="w-40 h-40 rounded-full border-4 border-primary shadow-xl"
          />
          <div className="ml-8 mb-4 flex flex-col gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white">{artistData.name}</h1>
              <p className="text-xl text-white/80">{artistData.location} • {artistData.followers} followers</p>
            </div>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={handleFollow}
              >
                <Heart className={`w-5 h-5 ${isFollowing ? 'fill-current' : ''}`} />
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button 
                size="lg" 
                variant="secondary" 
                className="gap-2"
                onClick={handleMessage}
              >
                <MessageCircle className="w-5 h-5" />
                Message
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                <Share2 className="w-5 h-5" /> Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="tracks" className="space-y-8">
          <TabsList className="bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="tracks">Tracks</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="singles">Singles</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <TabsContent value="tracks" className="space-y-6">
            <div className="grid gap-4">
              {artistData.featuredTracks.map((track) => (
                <Card key={track.id} className="glass-card hover:bg-white/5 transition-colors">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => togglePlay(track.id)}
                      >
                        {isPlaying && currentTrack === track.id ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </Button>
                      <div>
                        <h3 className="font-semibold">{track.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {track.duration} • {track.plays} plays
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold">${track.price}</span>
                      <Button variant="secondary" size="sm" className="gap-2">
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="albums" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artistData.albums.map((album) => (
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
              {artistData.singles.map((single) => (
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
              {artistData.collaborations.map((collab) => (
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

          <TabsContent value="social" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(artistData.socialMedia).map(([platform, handle]) => (
                <Card key={platform} className="glass-card">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 capitalize">{platform}</h3>
                      <p className="text-muted-foreground">{handle}</p>
                    </div>
                    <Button variant="secondary">Follow</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Music Player */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-white/10 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </Button>
              <div>
                <h3 className="font-semibold">
                  {artistData.featuredTracks.find(t => t.id === currentTrack)?.title}
                </h3>
                <p className="text-sm text-muted-foreground">{artistData.name}</p>
              </div>
            </div>
            <div className="w-1/2 h-1 bg-white/20 rounded-full">
              <div className="w-1/3 h-full bg-primary rounded-full" />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="secondary" size="sm" className="gap-2">
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}