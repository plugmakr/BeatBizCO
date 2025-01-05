import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { ClientFile } from "@/types/database";

interface FolderSelectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (folderId: string | null) => void;
  title: string;
  clientId: string;
  currentFolderId: string | null;
}

export function FolderSelectDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  clientId,
  currentFolderId,
}: FolderSelectDialogProps) {
  const [folders, setFolders] = useState<ClientFile[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchFolders();
    }
  }, [open]);

  const fetchFolders = async () => {
    const { data, error } = await supabase
      .from("client_files")
      .select("*")
      .eq("client_id", clientId)
      .eq("type", "folder");

    if (!error && data) {
      setFolders(data);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedFolder);
    onOpenChange(false);
    setSelectedFolder(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] p-4">
          <div className="space-y-2">
            <Button
              variant={selectedFolder === null ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedFolder(null)}
            >
              <Folder className="h-4 w-4 mr-2" />
              Root Folder
            </Button>
            {folders
              .filter((folder) => folder.id !== currentFolderId)
              .map((folder) => (
                <Button
                  key={folder.id}
                  variant={selectedFolder === folder.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <Folder className="h-4 w-4 mr-2" />
                  {folder.display_name || folder.filename}
                </Button>
              ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}