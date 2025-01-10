import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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

  const { data: session } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },
  });

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error("No authenticated user");

      const { data, error } = await supabase
        .from("collaboration_projects")
        .select("*")
        .eq("created_by", session.user.id)
        .eq("status", "active");

      if (error) throw error;
      return data || [];
    },
    enabled: !!session?.user?.id,
  });

  const handleAssign = async () => {
    if (!soundId || !selectedProject || !session?.user?.id) {
      toast({
        title: "Error",
        description: "Missing required information",
        variant: "destructive",
      });
      return;
    }

    setIsAssigning(true);

    try {
      const { data: existingAssignment, error: checkError } = await supabase
        .from("sound_library_project_files")
        .select("id")
        .eq("sound_id", soundId)
        .eq("project_id", selectedProject)
        .maybeSingle();

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

      const { error: insertError } = await supabase
        .from("sound_library_project_files")
        .insert({
          sound_id: soundId,
          project_id: selectedProject,
          created_by: session.user.id,
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

  if (!session?.user?.id) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign to Project</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center text-muted-foreground">
            Please sign in to assign sounds to projects
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign to Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
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
          )}
        </div>
        <Button
          onClick={handleAssign}
          disabled={isAssigning || !selectedProject || isLoading}
          className="w-full"
        >
          {isAssigning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Assigning...
            </>
          ) : (
            "Assign to Project"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}