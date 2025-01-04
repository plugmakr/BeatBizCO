import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectInfo from "./details/ProjectInfo";
import ProjectNotes from "./details/ProjectNotes";
import ProjectFiles from "./details/ProjectFiles";
import ProjectClient from "./details/ProjectClient";

type Project = {
  id: string;
  name: string;
  description: string | null;
  deadline: string | null;
  status: string;
  client_id: string | null;
};

interface ProjectDetailsDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailsDialog({
  project,
  open,
  onOpenChange,
}: ProjectDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("info");

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-[#1A1F2C] border-[#9b87f5]/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">{project.name}</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="client">Client</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <ProjectInfo project={project} />
          </TabsContent>
          <TabsContent value="notes">
            <ProjectNotes projectId={project.id} />
          </TabsContent>
          <TabsContent value="files">
            <ProjectFiles projectId={project.id} />
          </TabsContent>
          <TabsContent value="client">
            <ProjectClient project={project} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}