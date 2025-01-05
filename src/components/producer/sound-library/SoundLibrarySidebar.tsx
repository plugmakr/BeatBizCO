import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Folder, FolderPlus, Music2 } from "lucide-react";

interface SoundLibrarySidebarProps {
  selectedFolder: string | null;
  onFolderSelect: (folderId: string | null) => void;
}

export function SoundLibrarySidebar({
  selectedFolder,
  onFolderSelect,
}: SoundLibrarySidebarProps) {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const { data: folders, refetch: refetchFolders } = useQuery({
    queryKey: ["sound-library-folders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sound_library_folders")
        .select("*")
        .eq("producer_id", (await supabase.auth.getSession()).data.session?.user.id)
        .order("name");
      
      if (error) throw error;
      return data;
    },
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
            className="w-full justify-start"
            onClick={() => onFolderSelect(null)}
          >
            <Music2 className="mr-2 h-4 w-4" />
            All Sounds
          </Button>
          {folders?.map((folder) => (
            <Button
              key={folder.id}
              variant={selectedFolder === folder.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onFolderSelect(folder.id)}
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