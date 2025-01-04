import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ShoppingCart, Heart, Share2, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  ]
};

export default function ArtistProfile() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);

  const togglePlay = (trackId: number) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
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
          <div className="ml-8 mb-4">
            <h1 className="text-4xl font-bold text-white">{artistData.name}</h1>
            <p className="text-xl text-white/80">{artistData.location} • {artistData.followers} followers</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Bio Section */}
        <div className="space-y-4">
          <div className="flex gap-2">
            {artistData.genres.map((genre) => (
              <Badge key={genre} variant="secondary" className="px-4 py-1">
                {genre}
              </Badge>
            ))}
          </div>
          <p className="text-lg text-white/80">{artistData.bio}</p>
          <div className="flex gap-4">
            <Button size="lg" className="gap-2">
              <Heart className="w-5 h-5" /> Follow
            </Button>
            <Button size="lg" variant="secondary" className="gap-2">
              <Share2 className="w-5 h-5" /> Share
            </Button>
          </div>
        </div>

        {/* Featured Tracks */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Featured Tracks</h2>
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
    </div>
  );
}