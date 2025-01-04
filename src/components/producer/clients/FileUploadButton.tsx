import { Button } from "@/components/ui/button";
import { FileUp, Loader2 } from "lucide-react";

interface FileUploadButtonProps {
  isUploading: boolean;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUploadButton({ isUploading, onFileSelect }: FileUploadButtonProps) {
  return (
    <Button variant="outline" className="gap-2">
      {isUploading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileUp className="h-4 w-4" />
      )}
      <label className="cursor-pointer">
        Upload File
        <input
          type="file"
          className="hidden"
          onChange={onFileSelect}
          disabled={isUploading}
        />
      </label>
    </Button>
  );
}