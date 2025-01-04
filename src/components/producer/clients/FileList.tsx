import { Button } from "@/components/ui/button";
import { MediaThumbnail } from "@/components/shared/media/MediaThumbnail";
import { Trash2 } from "lucide-react";
import type { ClientFile } from "@/types/database";

interface FileListProps {
  files: ClientFile[];
  onPreview: (filePath: string, filename: string, fileType: string) => void;
  onDelete: (fileId: string, filePath: string) => void;
}

export function FileList({ files, onPreview, onDelete }: FileListProps) {
  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div key={file.id} className="flex items-center justify-between p-2 border rounded">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onPreview(file.file_path, file.filename, file.file_type)}
              className="focus:outline-none"
            >
              <MediaThumbnail type={file.file_type} />
            </button>
            <div>
              <p className="font-medium">{file.filename}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(file.id, file.file_path)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
      {files.length === 0 && (
        <p className="text-center text-muted-foreground">No files uploaded yet</p>
      )}
    </div>
  );
}