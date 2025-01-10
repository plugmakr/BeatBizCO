import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Trash2, Music2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Track {
  id: number;
  title: string;
  genre: string;
  price: number;
  audio_url: string;
  artwork_url: string | null;
  created_at: string;
  description?: string;
}

interface MusicGridProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
  onDelete: (trackId: number) => void;
}

export function MusicGrid({ tracks, onPlay, onDelete }: MusicGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tracks.map((track) => (
        <Card key={track.id} className="overflow-hidden group">
          <CardContent className="p-0">
            <div className="relative aspect-square">
              {track.artwork_url ? (
                <img
                  src={track.artwork_url}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <Music2 className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => onPlay(track)}
                >
                  <Play className="h-6 w-6" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="destructive">
                      <Trash2 className="h-6 w-6" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Track</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{track.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(track.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold truncate">{track.title}</h3>
              <p className="text-sm text-muted-foreground">{track.genre}</p>
              <p className="text-sm font-medium mt-2">${track.price}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}