import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface DownloadUploadProps {
  onFileSelect: (file: File) => void;
}

export function DownloadUpload({ onFileSelect }: DownloadUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <FormItem>
      <FormLabel>Download File (ZIP)</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept=".zip"
          onChange={handleFileChange}
        />
      </FormControl>
    </FormItem>
  );
}