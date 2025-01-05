import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [newName, setNewName] = useState(file?.type === 'regular' ? file.file.filename : file?.file.title || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleUpdate = async () => {
    if (!file) return;
    setIsUpdating(true);

    try {
      if (file.type === 'regular') {
        const { error } = await supabase
          .from('project_files')
          .update({ filename: newName })
          .eq('id', file.file.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('sound_library')
          .update({ title: newName })
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
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter file name"
            />
          </div>
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