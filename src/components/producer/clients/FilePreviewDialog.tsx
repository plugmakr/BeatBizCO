import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";
import { VideoPlayer } from "@/components/shared/media/VideoPlayer";
import { Badge } from "@/components/ui/badge";
import { Music2 } from "lucide-react";

interface FilePreviewDialogProps {
  file: {
    url: string;
    type: string;
    filename: string;
    metadata?: {
      title?: string;
      description?: string;
      bpm?: number;
      key?: string;
      genre?: string;
      tags?: string[];
    };
  } | null;
  onClose: () => void;
}

export function FilePreviewDialog({ file, onClose }: FilePreviewDialogProps) {
  if (!file) return null;

  const showMetadata = file.metadata && (
    file.metadata.bpm || 
    file.metadata.key || 
    file.metadata.genre || 
    file.metadata.tags?.length
  );

  return (
    <Dialog open={!!file} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{file.metadata?.title || file.filename}</DialogTitle>
          {file.metadata?.description && (
            <DialogDescription>
              {file.metadata.description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {showMetadata && (
            <div className="flex flex-wrap gap-2">
              {file.metadata?.bpm && (
                <Badge variant="secondary">
                  {file.metadata.bpm} BPM
                </Badge>
              )}
              {file.metadata?.key && (
                <Badge variant="secondary">
                  Key: {file.metadata.key}
                </Badge>
              )}
              {file.metadata?.genre && (
                <Badge variant="secondary">
                  {file.metadata.genre}
                </Badge>
              )}
              {file.metadata?.tags?.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="rounded-lg overflow-hidden">
            {file.type.startsWith("audio/") && (
              <div className="bg-muted p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center">
                    <Music2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <AudioPlayer src={file.url} title={file.metadata?.title || file.filename} />
              </div>
            )}
            {file.type.startsWith("video/") && (
              <VideoPlayer src={file.url} title={file.metadata?.title || file.filename} />
            )}
            {file.type.startsWith("image/") && (
              <img
                src={file.url}
                alt={file.metadata?.title || file.filename}
                className="w-full rounded-lg"
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}