import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import type { Database } from "@/integrations/supabase/types";
import { SoundLibraryFormFields } from "./SoundLibraryFormFields";

type SoundType = Database["public"]["Enums"]["sound_type"];

interface SoundLibraryUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentFolder: string | null;
}

export function SoundLibraryUpload({
  open,
  onOpenChange,
  currentFolder,
}: SoundLibraryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<SoundType | "">("");
  const [bpm, setBpm] = useState("");
  const [key, setKey] = useState("");
  const [genre, setGenre] = useState("");
  const [tags, setTags] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleUpload = async () => {
    if (!file || !title || !type) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const userId = (await supabase.auth.getSession()).data.session?.user.id;
      const filePath = `${userId}/${crypto.randomUUID()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("sound_library")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from("sound_library").insert({
        producer_id: userId,
        title,
        description,
        type: type as SoundType,
        bpm: bpm ? parseInt(bpm) : null,
        key,
        genre,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        file_path: filePath,
        folder_path: currentFolder,
        size: file.size,
        original_filename: file.name,
      });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Sound uploaded successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["sounds"] });
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload sound",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle("");
    setDescription("");
    setType("");
    setBpm("");
    setKey("");
    setGenre("");
    setTags("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Sound</DialogTitle>
        </DialogHeader>
        <SoundLibraryFormFields
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          type={type}
          setType={setType}
          bpm={bpm}
          setBpm={setBpm}
          key={key}
          setKey={setKey}
          genre={genre}
          setGenre={setGenre}
          tags={tags}
          setTags={setTags}
          file={file}
          setFile={setFile}
        />
        <Button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full mt-6"
        >
          {isUploading ? "Uploading..." : "Upload Sound"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}