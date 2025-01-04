import { useState } from "react";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MediaThumbnail } from "@/components/shared/media/MediaThumbnail";

interface ThumbnailUploadProps {
  onFileSelect: (file: File) => void;
}

export function ThumbnailUpload({ onFileSelect }: ThumbnailUploadProps) {
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
      <FormLabel>Thumbnail</FormLabel>
      <FormControl>
        <div className="space-y-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && (
            <div className="w-32 h-32">
              <MediaThumbnail type="image/jpeg" src={preview} />
            </div>
          )}
        </div>
      </FormControl>
    </FormItem>
  );
}