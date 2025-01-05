import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { CombinedProjectFile } from "../types/ProjectFileTypes";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileEditDialogProps {
  file: CombinedProjectFile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export function FileEditDialog({ file, open, onOpenChange, onUpdate }: FileEditDialogProps) {
  const [title, setTitle] = useState(file?.type === 'regular' ? file.file.filename : file?.file.title || '');
  const [description, setDescription] = useState(file?.type === 'sound_library' ? file.file.description || '' : '');
  const [bpm, setBpm] = useState(file?.type === 'sound_library' ? file.file.bpm?.toString() || '' : '');
  const [key, setKey] = useState(file?.type === 'sound_library' ? file.file.key || '' : '');
  const [genre, setGenre] = useState(file?.type === 'sound_library' ? file.file.genre || '' : '');
  const [tags, setTags] = useState(file?.type === 'sound_library' ? file.file.tags?.join(', ') || '' : '');
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleUpdate = async () => {
    if (!file) return;
    setIsUpdating(true);

    try {
      if (file.type === 'regular') {
        const { error } = await supabase
          .from('project_files')
          .update({ filename: title })
          .eq('id', file.file.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('sound_library')
          .update({
            title,
            description,
            bpm: bpm ? parseInt(bpm) : null,
            key,
            genre,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
          })
          .eq('id', file.file.id);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "File updated successfully",
      });

      onUpdate();
      onOpenChange(false);
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update file",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit File</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter file name"
            />
          </div>

          {file?.type === 'sound_library' && (
            <>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div>
                <Label>Genre</Label>
                <Input
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="Enter genre"
                />
              </div>

              <div>
                <Label>Tags (comma-separated)</Label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., dark, trap, melodic"
                />
              </div>
            </>
          )}

          <Button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="w-full"
          >
            {isUpdating ? "Updating..." : "Update File"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}