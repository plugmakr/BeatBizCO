import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Folder, FolderPlus, Music2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SoundLibrarySidebarProps {
  selectedFolder: string | null;
  onFolderSelect: (folderId: string | null) => void;
  onFileDrop?: (fileId: string, folderId: string | null) => void;
}

export function SoundLibrarySidebar({
  selectedFolder,
  onFolderSelect,
  onFileDrop,
}: SoundLibrarySidebarProps) {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const { toast } = useToast();

  // Get the current session
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },
  });

  const { data: folders, refetch: refetchFolders } = useQuery({
    queryKey: ["sound-library-folders", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      
      const { data, error } = await supabase
        .from("sound_library_folders")
        .select("*")
        .eq("producer_id", session.user.id)
        .order("name");
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const createFolder = async () => {
    if (!newFolderName.trim()) return;

    const { error } = await supabase.from("sound_library_folders").insert({
      name: newFolderName,
      producer_id: (await supabase.auth.getSession()).data.session?.user.id,
    });

    if (!error) {
      setNewFolderName("");
      setIsCreateFolderOpen(false);
      refetchFolders();
    }
  };

  const handleDrop = (e: React.DragEvent, folderId: string | null) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-muted");
    const fileId = e.dataTransfer.getData("fileId");
    if (fileId && onFileDrop) {
      onFileDrop(fileId, folderId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-muted");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-muted");
  };

  return (
    <div className="w-64 border-r bg-muted/10 flex flex-col">
      <div className="p-4 border-b">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => setIsCreateFolderOpen(true)}
        >
          <FolderPlus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          <Button
            variant={selectedFolder === null ? "secondary" : "ghost"}
            className="w-full justify-start transition-colors"
            onClick={() => onFolderSelect(null)}
            onDrop={(e) => handleDrop(e, null)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Music2 className="mr-2 h-4 w-4" />
            All Sounds
          </Button>
          {folders?.map((folder) => (
            <Button
              key={folder.id}
              variant={selectedFolder === folder.id ? "secondary" : "ghost"}
              className="w-full justify-start transition-colors"
              onClick={() => onFolderSelect(folder.id)}
              onDrop={(e) => handleDrop(e, folder.id)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Folder className="mr-2 h-4 w-4" />
              {folder.name}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <Button onClick={createFolder} className="w-full">
              Create Folder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}