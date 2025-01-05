import { Card } from "@/components/ui/card";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

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
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (sound: Sound) => {
    try {
      // Delete the file from storage
      const { error: storageError } = await supabase.storage
        .from('sound_library')
        .remove([sound.file_path]);

      if (storageError) throw storageError;

      // Delete the record from the database
      const { error: dbError } = await supabase
        .from('sound_library')
        .delete()
        .eq('id', sound.id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Sound deleted successfully",
      });

      // Refresh the sounds list
      queryClient.invalidateQueries({ queryKey: ['sounds'] });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete sound",
      });
    }
  };

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
          <div className="relative">
            <AudioPlayer src={sound.file_path} title={sound.title} />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-0 right-0 -mt-2 -mr-2"
              onClick={() => handleDelete(sound)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
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