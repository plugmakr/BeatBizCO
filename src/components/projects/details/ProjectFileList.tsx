
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Music2 } from "lucide-react";
import { MediaThumbnail } from "@/components/shared/media/MediaThumbnail";
import { CombinedProjectFile } from "./types/ProjectFileTypes";
import { FileActions } from "./file-management/FileActions";

interface ProjectFileListProps {
  files: CombinedProjectFile[];
  onPreview: (file: CombinedProjectFile) => void;
  onEdit: (file: CombinedProjectFile) => void;
  onDelete: (file: CombinedProjectFile) => void;
}

export function ProjectFileList({ files, onPreview, onEdit, onDelete }: ProjectFileListProps) {
  const getFileType = (file: CombinedProjectFile) => {
    if (file.type === 'regular') {
      return file.file.file_type;
    }
    return 'audio';
  };

  const getFileName = (file: CombinedProjectFile) => {
    if (file.type === 'regular') {
      return file.file.filename; // Changed from file_name to filename
    }
    return file.file.title;
  };

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <Card key={file.type === 'regular' ? file.file.id : file.file.assignment_id} 
          className="bg-[#2A2F3C] border-[#9b87f5]/20"
        >
          <CardContent className="pt-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => onPreview(file)} className="focus:outline-none">
                {file.type === 'regular' ? (
                  <MediaThumbnail type={file.file.file_type} />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                    <Music2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-white">{getFileName(file)}</p>
                  {file.type === 'sound_library' && (
                    <Badge variant="secondary">Sound Library</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {format(new Date(file.file.created_at || ''), "PPP")}
                </p>
              </div>
              <FileActions
                file={file}
                onPreview={onPreview}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
