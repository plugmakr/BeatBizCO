import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";
import { VideoPlayer } from "@/components/shared/media/VideoPlayer";

interface FilePreviewDialogProps {
  file: {
    url: string;
    type: string;
    filename: string;
  } | null;
  onClose: () => void;
}

export function FilePreviewDialog({ file, onClose }: FilePreviewDialogProps) {
  if (!file) return null;

  return (
    <Dialog open={!!file} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{file.filename}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {file.type.startsWith("audio/") && (
            <AudioPlayer src={file.url} title={file.filename} />
          )}
          {file.type.startsWith("video/") && (
            <VideoPlayer src={file.url} title={file.filename} />
          )}
          {file.type.startsWith("image/") && (
            <img
              src={file.url}
              alt={file.filename}
              className="w-full rounded-lg"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}