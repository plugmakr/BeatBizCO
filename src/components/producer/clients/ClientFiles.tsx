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
import { FolderNavigation, type Breadcrumb } from "./files/FolderNavigation";
import { CreateFolderDialog } from "./files/CreateFolderDialog";
import { FolderPlus } from "lucide-react";
import { FileExplanation } from "./files/FileExplanation";
import { useDefaultFolders } from "./files/useDefaultFolders";

interface ClientFilesProps {
  client: Client;
}

interface SoundLibraryFile {
  id: string;
  title: string;
  file_path: string;
  type: string;
  size: number;
  created_at: string;
}

interface ProjectWithSoundLibrary {
  id: string;
  name: string;
  sound_library_project_files?: {
    sound_library: SoundLibraryFile;
    project?: {
      name: string;
    };
  }[];
}

export function ClientFiles({ client }: ClientFilesProps) {
  const [files, setFiles] = useState<ClientFile[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
    { id: null, name: "Root" },
  ]);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<{
    url: string;
    type: string;
    filename: string;
  } | null>(null);
  const { toast } = useToast();

  const { isUploading, uploadProgress, currentUpload, uploadFile } =
    useClientFileUpload(client, fetchFiles);

  // Initialize default folders
  useDefaultFolders(client.id, fetchFiles);

  async function fetchFiles() {
    try {
      // Fetch regular client files
      let query = supabase
        .from('client_files')
        .select('*')
        .eq('client_id', client.id)
        .order('type', { ascending: false })
        .order('created_at', { ascending: false });

      // Handle parent_id filtering
      if (currentFolder === null) {
        query = query.is('parent_id', null);
      } else {
        query = query.eq('parent_id', currentFolder);
      }

      const { data: clientFiles, error: clientFilesError } = await query;

      if (clientFilesError) throw clientFilesError;

      // Fetch project files if we're at root level
      if (currentFolder === null) {
        // First get all projects associated with this client
        const { data: projects, error: projectsError } = await supabase
          .from('collaboration_projects')
          .select(`
            id,
            name,
            sound_library_project_files (
              sound_library (
                id,
                title,
                file_path,
                type,
                size,
                created_at
              )
            )
          `)
          .eq('client_id', client.id) as { data: ProjectWithSoundLibrary[] | null, error: any };

        if (projectsError) throw projectsError;

        // Create virtual folder entries for each project
        const projectFolders: ClientFile[] = projects?.map(project => ({
          id: `project-${project.id}`,
          client_id: client.id,
          filename: project.name,
          display_name: project.name,
          file_path: '',
          file_type: 'folder',
          size: 0,
          type: 'folder',
          created_at: null,
          updated_at: null,
          parent_id: null,
          uploaded_by: null
        })) || [];

        setFiles([...(clientFiles || []), ...projectFolders]);
      } else if (currentFolder?.startsWith('project-')) {
        // If we're inside a project folder, show its sound library files
        const projectId = currentFolder.replace('project-', '');
        const { data: projectFiles, error: projectFilesError } = await supabase
          .from('sound_library_project_files')
          .select(`
            sound_library (
              id,
              title,
              file_path,
              type,
              size,
              created_at
            ),
            project:collaboration_projects(name)
          `)
          .eq('project_id', projectId);

        if (projectFilesError) throw projectFilesError;

        const soundLibraryFiles: ClientFile[] = (projectFiles || []).map(pf => ({
          id: pf.sound_library.id,
          client_id: client.id,
          filename: pf.sound_library.title,
          display_name: pf.sound_library.title,
          file_path: pf.sound_library.file_path,
          file_type: pf.sound_library.type,
          size: pf.sound_library.size,
          type: 'file',
          created_at: pf.sound_library.created_at,
          updated_at: null,
          parent_id: currentFolder,
          uploaded_by: null,
          fromSoundLibrary: true,
          projectName: pf.project?.name
        }));

        setFiles(soundLibraryFiles);
      } else {
        setFiles(clientFiles || []);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      toast({
        title: "Error",
        description: "Failed to fetch files",
        variant: "destructive",
      });
    }
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
      // If the file is from the sound library, the filePath is already a complete URL
      if (filePath.startsWith('http')) {
        setPreviewFile({
          url: filePath,
          type: fileType,
          filename,
        });
        return;
      }

      // For regular client files, create a signed URL
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
      console.error('Error getting preview URL:', error);
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
    <Card className="h-[500px] flex flex-col">
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
      <CardContent className="flex-1 overflow-hidden">
        <FileExplanation />
        
        <FolderNavigation breadcrumbs={breadcrumbs} onNavigate={handleNavigate} />

        {isUploading && currentUpload && (
          <div className="mb-4">
            <UploadProgress progress={uploadProgress} fileName={currentUpload} />
          </div>
        )}

        <FileList
          files={files}
          onPreview={handlePreview}
          onDelete={handleDelete}
          onFolderClick={handleNavigate}
          clientId={client.id}
          currentFolder={currentFolder}
          onFilesChange={fetchFiles}
        />
      </CardContent>

      <CreateFolderDialog
        open={isCreateFolderOpen}
        onOpenChange={setIsCreateFolderOpen}
        onConfirm={handleCreateFolder}
      />

      <FilePreviewDialog file={previewFile} onClose={() => setPreviewFile(null)} />
    </Card>
  );
}
