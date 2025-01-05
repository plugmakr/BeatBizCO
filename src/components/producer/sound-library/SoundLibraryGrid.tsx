import { Card } from "@/components/ui/card";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Sound {
  id: string;
  title: string;
  type: string;
  bpm?: number;
  key?: string;
  genre?: string;
  tags?: string[];
  file_path: string;
}

interface SoundLibraryGridProps {
  sounds: Sound[];
  isLoading: boolean;
}

export function SoundLibraryGrid({ sounds, isLoading }: SoundLibraryGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4 space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sounds.map((sound) => (
        <Card key={sound.id} className="p-4 space-y-4">
          <AudioPlayer src={sound.file_path} title={sound.title} />
          <div>
            <h3 className="font-semibold">{sound.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {sound.bpm && <span>{sound.bpm} BPM</span>}
              {sound.key && <span>• {sound.key}</span>}
              {sound.genre && <span>• {sound.genre}</span>}
            </div>
          </div>
          {sound.tags && sound.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {sound.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}