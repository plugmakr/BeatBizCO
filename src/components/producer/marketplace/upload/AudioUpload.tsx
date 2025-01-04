import { useState } from "react";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";

interface AudioUploadProps {
  onFileSelect: (file: File) => void;
}

export function AudioUpload({ onFileSelect }: AudioUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormItem>
      <FormLabel>Audio File (Full Version)</FormLabel>
      <FormControl>
        <div className="space-y-4">
          <Input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
          />
          {preview && (
            <AudioPlayer src={preview} title="Audio Preview" />
          )}
        </div>
      </FormControl>
    </FormItem>
  );
}