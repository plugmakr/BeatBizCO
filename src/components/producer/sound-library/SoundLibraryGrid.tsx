import { Card } from "@/components/ui/card";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Trash2, Music2, Edit, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { FolderSelectDialog } from "./FolderSelectDialog";
import { SoundEditDialog } from "./SoundEditDialog";
import { AssignToProjectDialog } from "./AssignToProjectDialog";
import { useState } from "react";
import { Tables } from "@/integrations/supabase/types";

type Sound = Tables<"sound_library", never>;

interface SoundLibraryGridProps {
  sounds: Sound[];
  isLoading: boolean;
  onMoveFile: (soundId: string, folderId: string | null) => Promise<void>;
  onCopyFile: (soundId: string, folderId: string | null) => Promise<void>;
}

export function SoundLibraryGrid({
  sounds,
  isLoading,
  onMoveFile,
  onCopyFile,
}: SoundLibraryGridProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const handleDelete = async (sound: Sound) => {
    try {
      const { error: storageError } = await supabase.storage
        .from('sound_library')
        .remove([sound.file_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('sound_library')
        .delete()
        .eq('id', sound.id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Sound deleted successfully",
      });

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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, sound: Sound) => {
    e.dataTransfer.setData("fileId", sound.id);
  };

  const getFileType = (filename: string): string => {
    const ext = filename?.split('.').pop()?.toLowerCase() || '';
    switch (ext) {
      case 'mp3':
        return 'MP3';
      case 'wav':
        return 'WAV';
      case 'midi':
      case 'mid':
        return 'MIDI';
      case 'aiff':
        return 'AIFF';
      case 'flac':
        return 'FLAC';
      default:
        return ext.toUpperCase();
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex gap-4">
              <Skeleton className="h-24 w-24 rounded-lg" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sounds.map((sound) => (
          <ContextMenu key={sound.id}>
            <ContextMenuTrigger>
              <Card 
                className="p-4"
                draggable
                onDragStart={(e) => handleDragStart(e, sound)}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="h-24 w-24 rounded-lg bg-secondary flex items-center justify-center">
                      <Music2 className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold truncate">{sound.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {sound.bpm && <span>{sound.bpm} BPM</span>}
                            {sound.key && <span>• {sound.key}</span>}
                            {sound.genre && <span>• {sound.genre}</span>}
                          </div>
                          {sound.original_filename && (
                            <Badge variant="secondary" className="mt-1">
                              {getFileType(sound.original_filename)}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setSelectedSound(sound);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setSelectedSound(sound);
                              setIsAssignDialogOpen(true);
                            }}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDelete(sound)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {sound.tags && sound.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {sound.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <AudioPlayer src={sound.file_path} title={sound.title} compact />
                </div>
              </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                onClick={() => {
                  setSelectedSound(sound);
                  setIsMoveDialogOpen(true);
                }}
              >
                Move to...
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  setSelectedSound(sound);
                  setIsCopyDialogOpen(true);
                }}
              >
                Copy to...
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  setSelectedSound(sound);
                  setIsEditDialogOpen(true);
                }}
              >
                Edit...
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  setSelectedSound(sound);
                  setIsAssignDialogOpen(true);
                }}
              >
                Assign to Project...
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>

      <FolderSelectDialog
        open={isMoveDialogOpen}
        onOpenChange={setIsMoveDialogOpen}
        onConfirm={(folderId) => {
          if (selectedSound) {
            onMoveFile(selectedSound.id, folderId);
          }
        }}
        title="Move to Folder"
      />

      <FolderSelectDialog
        open={isCopyDialogOpen}
        onOpenChange={setIsCopyDialogOpen}
        onConfirm={(folderId) => {
          if (selectedSound) {
            onCopyFile(selectedSound.id, folderId);
          }
        }}
        title="Copy to Folder"
      />

      <SoundEditDialog
        sound={selectedSound}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <AssignToProjectDialog
        soundId={selectedSound?.id || null}
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
      />
    </>
  );
}
