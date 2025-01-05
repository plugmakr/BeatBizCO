import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaThumbnail } from "@/components/shared/media/MediaThumbnail";
import { Folder, Trash2 } from "lucide-react";
import type { ClientFile } from "@/types/database";
import { FileContextMenu } from "./files/FileContextMenu";
import { FolderSelectDialog } from "./files/FolderSelectDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileListProps {
  files: ClientFile[];
  onPreview: (filePath: string, filename: string, fileType: string) => void;
  onDelete: (fileId: string, filePath: string) => void;
  onFolderClick: (folderId: string) => void;
  clientId: string;
  currentFolder: string | null;
  onFilesChange: () => void;
}

export function FileList({
  files,
  onPreview,
  onDelete,
  onFolderClick,
  clientId,
  currentFolder,
  onFilesChange,
}: FileListProps) {
  const [draggedFile, setDraggedFile] = useState<ClientFile | null>(null);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [copyDialogOpen, setCopyDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ClientFile | null>(null);
  const { toast } = useToast();

  const handleDragStart = (file: ClientFile) => {
    setDraggedFile(file);
  };

  const handleDragOver = (e: React.DragEvent, file: ClientFile) => {
    e.preventDefault();
    if (file.type === "folder" && draggedFile && draggedFile.id !== file.id) {
      e.currentTarget.classList.add("bg-secondary");
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("bg-secondary");
  };

  const handleDrop = async (e: React.DragEvent, targetFolder: ClientFile) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-secondary");

    if (!draggedFile || targetFolder.type !== "folder" || draggedFile.id === targetFolder.id) {
      return;
    }

    await moveFile(draggedFile.id, targetFolder.id);
    setDraggedFile(null);
  };

  const moveFile = async (fileId: string, targetFolderId: string | null) => {
    try {
      const { error } = await supabase
        .from("client_files")
        .update({ parent_id: targetFolderId })
        .eq("id", fileId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "File moved successfully",
      });

      onFilesChange();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to move file",
        variant: "destructive",
      });
    }
  };

  const copyFile = async (file: ClientFile, targetFolderId: string | null) => {
    try {
      const { error } = await supabase.from("client_files").insert({
        client_id: clientId,
        filename: file.filename,
        file_path: file.file_path,
        file_type: file.file_type,
        size: file.size,
        parent_id: targetFolderId,
        type: file.type,
        display_name: file.display_name,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "File copied successfully",
      });

      onFilesChange();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy file",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative min-h-[400px] w-full">
      <ScrollArea className="h-[400px] w-full">
        <div className="space-y-2 pr-4">
          {files.map((file) => (
            <FileContextMenu
              key={file.id}
              onMove={() => {
                setSelectedFile(file);
                setMoveDialogOpen(true);
              }}
              onCopy={() => {
                setSelectedFile(file);
                setCopyDialogOpen(true);
              }}
            >
              <div
                className="flex items-center justify-between p-3 border rounded-lg transition-colors hover:bg-secondary/50"
                draggable={true}
                onDragStart={() => handleDragStart(file)}
                onDragOver={(e) => handleDragOver(e, file)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, file)}
              >
                <div className="flex items-center space-x-4">
                  {file.type === "folder" ? (
                    <button
                      onClick={() => onFolderClick(file.id)}
                      className="focus:outline-none"
                    >
                      <Folder className="h-6 w-6 text-blue-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        onPreview(file.file_path, file.filename, file.file_type)
                      }
                      className="focus:outline-none"
                    >
                      <MediaThumbnail type={file.file_type} />
                    </button>
                  )}
                  <div>
                    <p className="font-medium">
                      {file.display_name || file.filename}
                    </p>
                    {file.type !== "folder" && (
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(file.id, file.file_path)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </FileContextMenu>
          ))}
          {files.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              This folder is empty
            </p>
          )}
        </div>
      </ScrollArea>

      <FolderSelectDialog
        open={moveDialogOpen}
        onOpenChange={setMoveDialogOpen}
        onConfirm={(folderId) => {
          if (selectedFile) {
            moveFile(selectedFile.id, folderId);
          }
        }}
        title="Move to Folder"
        clientId={clientId}
        currentFolderId={currentFolder}
      />

      <FolderSelectDialog
        open={copyDialogOpen}
        onOpenChange={setCopyDialogOpen}
        onConfirm={(folderId) => {
          if (selectedFile) {
            copyFile(selectedFile, folderId);
          }
        }}
        title="Copy to Folder"
        clientId={clientId}
        currentFolderId={currentFolder}
      />
    </div>
  );
}