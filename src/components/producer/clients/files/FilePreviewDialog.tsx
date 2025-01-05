import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MediaThumbnail } from "@/components/shared/media/MediaThumbnail";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";

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
      <DialogContent className="sm:max-w-lg">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{file.filename}</h3>
          {file.type.startsWith('image/') ? (
            <div className="relative aspect-video">
              <img
                src={file.url}
                alt={file.filename}
                className="rounded-lg object-contain"
              />
            </div>
          ) : file.type.startsWith('audio/') ? (
            <AudioPlayer src={file.url} title={file.filename} />
          ) : (
            <MediaThumbnail type={file.type} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}