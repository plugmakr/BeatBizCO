import { Button } from "@/components/ui/button";
import { Play, Pause, Heart, ShoppingCart } from "lucide-react";

interface Track {
  id: string;
  title: string;
  genre: string | null;
  price: number | null;
  audio_url: string | null;
  artwork_url: string | null;
  created_at: string;
  description?: string | null;
  artist_id: string | null;
  status: string | null;
}

interface MusicPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  artistName: string;
  onPlayToggle: () => void;
}

export function MusicPlayer({ currentTrack, isPlaying, artistName, onPlayToggle }: MusicPlayerProps) {
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-white/10 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onPlayToggle}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>
          <div>
            <h3 className="font-semibold">{currentTrack.title}</h3>
            <p className="text-sm text-muted-foreground">{artistName}</p>
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
  );
}