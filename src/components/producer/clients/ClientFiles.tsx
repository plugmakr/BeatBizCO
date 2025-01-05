import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Client, ClientFile } from "@/types/database";
import { FileUploadButton } from "./FileUploadButton";
import { FilePreviewDialog } from "./files/FilePreviewDialog";
import { FileList } from "./FileList";
import { UploadProgress } from "@/components/shared/media/UploadProgress";
import { useClientFileUpload } from "@/hooks/use-client-file-upload";
import { useToast } from "@/hooks/use-toast";
import { FolderNavigation } from "./files/FolderNavigation";
import { CreateFolderDialog } from "./files/CreateFolderDialog";
import { FolderPlus } from "lucide-react";

interface ClientFilesProps {
  client: Client;
}

interface Breadcrumb {
  id: string | null;
  name: string;
}

export function ClientFiles({ client }: ClientFilesProps) {
  const [files, setFiles] = useState<ClientFile[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([{ id: null, name: "Root" }]);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<{
    url: string;
    type: string;
    filename: string;
  } | null>(null);
  const { toast } = useToast();

  const { 
    isUploading, 
    uploadProgress, 
    currentUpload, 
    uploadFile 
  } = useClientFileUpload(client, fetchFiles);

  async function fetchFiles() {
    const { data, error } = await supabase
      .from('client_files')
      .select('*')
      .eq('client_id', client.id)
      .eq('parent_id', currentFolder)
      .order('type', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching files:', error);
      return;
    }

    setFiles(data as ClientFile[]);
  }

  async function updateBreadcrumbs() {
    if (!currentFolder) {
      setBreadcrumbs([{ id: null, name: "Root" }]);
      return;
    }

    const breadcrumbs: Breadcrumb[] = [{ id: null, name: "Root" }];
    let currentId = currentFolder;

    while (currentId) {
      const { data, error } = await supabase
        .from('client_files')
        .select('id, display_name, parent_id')
        .eq('id', currentId)
        .single();

      if (error || !data) break;

      breadcrumbs.push({
        id: data.id,
        name: data.display_name || 'Unnamed Folder',
      });
      currentId = data.parent_id;
    }

    setBreadcrumbs(breadcrumbs.reverse());
  }

  useEffect(() => {
    fetchFiles();
    updateBreadcrumbs();
  }, [client.id, currentFolder]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadFile(file, currentFolder);
  };

  const handleCreateFolder = async (name: string) => {
    try {
      const { data, error } = await supabase
        .from('client_files')
        .insert({
          client_id: client.id,
          parent_id: currentFolder,
          type: 'folder',
          display_name: name,
          filename: name,
          file_path: '',
          file_type: 'folder',
          size: 0,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Folder created successfully",
      });

      fetchFiles();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create folder",
        variant: "destructive",
      });
    }
  };

  const handleNavigate = (folderId: string | null) => {
    setCurrentFolder(folderId);
  };

  const handlePreview = async (filePath: string, filename: string, fileType: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('client_files')
        .createSignedUrl(filePath, 3600);

      if (error) throw error;

      setPreviewFile({
        url: data.signedUrl,
        type: fileType,
        filename,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to preview file",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (fileId: string, filePath: string) => {
    try {
      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from('client_files')
          .remove([filePath]);

        if (storageError) throw storageError;
      }

      const { error: dbError } = await supabase
        .from('client_files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Item deleted successfully",
      });

      fetchFiles();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Files</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreateFolderOpen(true)}
              className="flex items-center gap-2"
            >
              <FolderPlus className="h-4 w-4" />
              New Folder
            </Button>
            <FileUploadButton
              isUploading={isUploading}
              onFileSelect={handleFileUpload}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FolderNavigation
          breadcrumbs={breadcrumbs}
          onNavigate={handleNavigate}
        />

        {isUploading && currentUpload && (
          <div className="mb-4">
            <UploadProgress
              progress={uploadProgress}
              fileName={currentUpload}
            />
          </div>
        )}

        <FileList
          files={files}
          onPreview={handlePreview}
          onDelete={handleDelete}
          onFolderClick={handleNavigate}
        />
      </CardContent>

      <CreateFolderDialog
        open={isCreateFolderOpen}
        onOpenChange={setIsCreateFolderOpen}
        onConfirm={handleCreateFolder}
      />

      <FilePreviewDialog
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </Card>
  );
}