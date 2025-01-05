import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SoundLibraryFormFields } from "./SoundLibraryFormFields";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import type { Database } from "@/integrations/supabase/types";

type Sound = Database["public"]["Tables"]["sound_library"]["Row"];
type SoundType = Database["public"]["Enums"]["sound_type"];

interface SoundEditDialogProps {
  sound: Sound | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SoundEditDialog({ sound, open, onOpenChange }: SoundEditDialogProps) {
  const [title, setTitle] = useState(sound?.title || "");
  const [description, setDescription] = useState(sound?.description || "");
  const [type, setType] = useState<SoundType>(sound?.type || "sample");
  const [bpm, setBpm] = useState(sound?.bpm?.toString() || "");
  const [key, setKey] = useState(sound?.key || "");
  const [genre, setGenre] = useState(sound?.genre || "");
  const [tags, setTags] = useState(sound?.tags?.join(", ") || "");
  const [file, setFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleUpdate = async () => {
    if (!sound) return;
    setIsUpdating(true);

    try {
      let filePath = sound.file_path;

      // If a new file is selected, upload it
      if (file) {
        const { error: removeError } = await supabase.storage
          .from("sound_library")
          .remove([sound.file_path]);

        if (removeError) throw removeError;

        filePath = `${(await supabase.auth.getSession()).data.session?.user.id}/${crypto.randomUUID()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("sound_library")
          .upload(filePath, file);

        if (uploadError) throw uploadError;
      }

      const { error: updateError } = await supabase
        .from("sound_library")
        .update({
          title,
          description,
          type,
          bpm: bpm ? parseInt(bpm) : null,
          key,
          genre,
          tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
          file_path: filePath,
          original_filename: file?.name || sound.original_filename,
          size: file?.size || sound.size,
        })
        .eq("id", sound.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Sound updated successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["sounds"] });
      onOpenChange(false);
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update sound",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Sound</DialogTitle>
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
          onClick={handleUpdate}
          disabled={isUpdating}
          className="w-full mt-6"
        >
          {isUpdating ? "Updating..." : "Update Sound"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}