import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssignToProjectDialogProps {
  soundId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignToProjectDialog({
  soundId,
  open,
  onOpenChange,
}: AssignToProjectDialogProps) {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [isAssigning, setIsAssigning] = useState(false);
  const { toast } = useToast();

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collaboration_projects")
        .select("*")
        .eq("created_by", (await supabase.auth.getSession()).data.session?.user.id)
        .eq("status", "active");

      if (error) throw error;
      return data;
    },
  });

  const handleAssign = async () => {
    if (!soundId || !selectedProject) return;
    setIsAssigning(true);

    try {
      // First check if the sound is already assigned to this project
      const { data: existingAssignment, error: checkError } = await supabase
        .from("sound_library_project_files")
        .select("id")
        .eq("sound_id", soundId)
        .eq("project_id", selectedProject)
        .maybeSingle(); // Changed from .single() to .maybeSingle()

      if (checkError) throw checkError;

      if (existingAssignment) {
        toast({
          title: "Already Assigned",
          description: "This sound is already assigned to the selected project",
          variant: "default",
        });
        onOpenChange(false);
        return;
      }

      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user.id;

      if (!userId) {
        toast({
          title: "Error",
          description: "You must be logged in to assign sounds to projects",
          variant: "destructive",
        });
        return;
      }

      const { error: insertError } = await supabase
        .from("sound_library_project_files")
        .insert({
          sound_id: soundId,
          project_id: selectedProject,
          created_by: userId,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Sound assigned to project successfully",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Assignment error:", error);
      toast({
        title: "Error",
        description: "Failed to assign sound to project",
        variant: "destructive",
      });
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign to Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select
            value={selectedProject}
            onValueChange={setSelectedProject}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects?.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleAssign}
          disabled={isAssigning || !selectedProject}
          className="w-full"
        >
          {isAssigning ? "Assigning..." : "Assign to Project"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}