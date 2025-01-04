import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ShoppingCart, Heart, Pause } from "lucide-react";

interface Track {
  id: number;
  title: string;
  duration: string;
  price: number;
  plays: string;
}

interface Album {
  id: number;
  title: string;
  year: string;
  tracks: number;
}

interface Single {
  id: number;
  title: string;
  year: string;
}

interface Collaboration {
  id: number;
  title: string;
  artist: string;
  year: string;
}

interface SocialMedia {
  [key: string]: string;
}

interface ArtistTabsProps {
  featuredTracks: Track[];
  albums: Album[];
  singles: Single[];
  collaborations: Collaboration[];
  socialMedia: SocialMedia;
  currentTrack: number | null;
  isPlaying: boolean;
  onPlayToggle: (trackId: number) => void;
}

export function ArtistTabs({
  featuredTracks,
  albums,
  singles,
  collaborations,
  socialMedia,
  currentTrack,
  isPlaying,
  onPlayToggle,
}: ArtistTabsProps) {
  return (
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
          {featuredTracks.map((track) => (
            <Card key={track.id} className="glass-card hover:bg-white/5 transition-colors">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => onPlayToggle(track.id)}
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
          {albums.map((album) => (
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
          {singles.map((single) => (
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
          {collaborations.map((collab) => (
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
          {Object.entries(socialMedia).map(([platform, handle]) => (
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
  );
}