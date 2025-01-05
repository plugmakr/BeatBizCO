import { Button } from "@/components/ui/button";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { CombinedProjectFile } from "../types/ProjectFileTypes";

interface FileActionsProps {
  file: CombinedProjectFile;
  onPreview: (file: CombinedProjectFile) => void;
  onEdit: (file: CombinedProjectFile) => void;
  onDelete: (file: CombinedProjectFile) => void;
}

export function FileActions({ file, onPreview, onEdit, onDelete }: FileActionsProps) {
  return (
    <div className="flex space-x-2">
      <Button
        variant="secondary"
        size="icon"
        onClick={() => onPreview(file)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => onEdit(file)}
      >
        <Edit2 className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(file)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}