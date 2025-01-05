import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

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
  const [type, setType] = useState<string>("");
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
        type,
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
        <div className="space-y-6">
          <div>
            <Label>Audio File</Label>
            <Input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beat">Beat</SelectItem>
                  <SelectItem value="sound_kit">Sound Kit</SelectItem>
                  <SelectItem value="midi_kit">MIDI Kit</SelectItem>
                  <SelectItem value="loop_kit">Loop Kit</SelectItem>
                  <SelectItem value="drum_kit">Drum Kit</SelectItem>
                  <SelectItem value="one_shot">One Shot</SelectItem>
                  <SelectItem value="sample">Sample</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>BPM</Label>
              <Input
                type="number"
                value={bpm}
                onChange={(e) => setBpm(e.target.value)}
                placeholder="Enter BPM"
              />
            </div>
            <div>
              <Label>Key</Label>
              <Input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter key"
              />
            </div>
            <div>
              <Label>Genre</Label>
              <Input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Enter genre"
              />
            </div>
          </div>
          <div>
            <Label>Tags (comma-separated)</Label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., dark, trap, melodic"
            />
          </div>
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? "Uploading..." : "Upload Sound"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}