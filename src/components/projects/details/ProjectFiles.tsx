import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";
import { FilePreviewDialog } from "@/components/producer/clients/FilePreviewDialog";
import { UploadProgress } from "@/components/shared/media/UploadProgress";
import { ProjectFileList } from "./ProjectFileList";
import { FileEditDialog } from "./file-management/FileEditDialog";
import { CombinedProjectFile } from "./types/ProjectFileTypes";

const ALLOWED_FILE_TYPES = [
  "application/zip",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "video/mp4",
  "video/webm",
  "video/ogg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

interface ProjectFilesProps {
  projectId: string;
}

export default function ProjectFiles({ projectId }: ProjectFilesProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<{
    url: string;
    type: string;
    filename: string;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<CombinedProjectFile | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch both regular project files and sound library files
  const { data: combinedFiles, isLoading } = useQuery({
    queryKey: ["project-files", projectId],
    queryFn: async () => {
      const [projectFilesResult, soundLibraryFilesResult] = await Promise.all([
        supabase
          .from("project_files")
          .select("*")
          .eq("project_id", projectId)
          .order("created_at", { ascending: false }),
        supabase
          .from("sound_library_project_files")
          .select(`
            id,
            sound_library (*)
          `)
          .eq("project_id", projectId)
      ]);

      if (projectFilesResult.error) throw projectFilesResult.error;
      if (soundLibraryFilesResult.error) throw soundLibraryFilesResult.error;

      const regularFiles: CombinedProjectFile[] = (projectFilesResult.data || []).map(file => ({
        type: 'regular',
        file: file
      }));

      const soundLibraryFiles: CombinedProjectFile[] = (soundLibraryFilesResult.data || []).map(record => ({
        type: 'sound_library',
        file: {
          ...record.sound_library,
          assignment_id: record.id
        }
      }));

      return [...regularFiles, ...soundLibraryFiles].sort((a, b) => {
        const dateA = new Date(a.file.created_at || '');
        const dateB = new Date(b.file.created_at || '');
        return dateB.getTime() - dateA.getTime();
      });
    },
  });

  const deleteFileMutation = useMutation({
    mutationFn: async ({ id, filePath }: { id: string; filePath: string }) => {
      const { error: storageError } = await supabase.storage
        .from("project_files")
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("project_files")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-files", projectId] });
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Error",
        description: "Invalid file type",
        variant: "destructive",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Error",
        description: "File size exceeds 100MB limit",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setCurrentUpload(file.name);

    try {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      });

      xhr.onload = async () => {
        if (xhr.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["project-files", projectId] });
          toast({
            title: "Success",
            description: "File uploaded successfully",
          });
        } else {
          throw new Error('Upload failed');
        }
      };

      xhr.onerror = () => {
        throw new Error('Upload failed');
      };

      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId);

      xhr.open('POST', `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-project-file`);
      xhr.setRequestHeader('Authorization', `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`);
      xhr.send(formData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setCurrentUpload(null);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (file: CombinedProjectFile) => {
    try {
      if (file.type === 'regular') {
        const { error: storageError } = await supabase.storage
          .from("project_files")
          .remove([file.file.file_path]);

        if (storageError) throw storageError;

        const { error: dbError } = await supabase
          .from("project_files")
          .delete()
          .eq("id", file.file.id);

        if (dbError) throw dbError;
      } else {
        const { error } = await supabase
          .from("sound_library_project_files")
          .delete()
          .eq("id", file.file.assignment_id);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "File removed successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["project-files", projectId] });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to remove file",
        variant: "destructive",
      });
    }
  };

  const handlePreview = async (file: CombinedProjectFile) => {
    try {
      const bucket = file.type === 'regular' ? 'project_files' : 'sound_library';
      const filePath = file.type === 'regular' 
        ? file.file.file_path 
        : file.file.file_path;

      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(filePath, 3600);

      if (error) throw error;

      let metadata = undefined;
      
      if (file.type === 'sound_library') {
        metadata = {
          title: file.file.title,
          description: file.file.description,
          bpm: file.file.bpm,
          key: file.file.key,
          genre: file.file.genre,
          tags: file.file.tags,
        };
      }

      setPreviewFile({
        url: data.signedUrl,
        type: getFileType(file),
        filename: getFileName(file),
        metadata
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to preview file",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (file: CombinedProjectFile) => {
    setSelectedFile(file);
    setEditDialogOpen(true);
  };

  const getFileType = (file: CombinedProjectFile) => {
    if (file.type === 'regular') {
      return file.file.file_type;
    }
    return 'audio';
  };

  const getFileName = (file: CombinedProjectFile) => {
    if (file.type === 'regular') {
      return file.file.filename;
    }
    return file.file.title;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileUpload}
          accept={ALLOWED_FILE_TYPES.join(",")}
        />
        <Button
          onClick={() => document.getElementById("file-upload")?.click()}
          disabled={isUploading}
          className="w-full bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          Upload File
        </Button>
      </div>

      {isUploading && currentUpload && (
        <div className="mb-4">
          <UploadProgress
            progress={uploadProgress}
            fileName={currentUpload}
          />
        </div>
      )}

      <ProjectFileList 
        files={combinedFiles || []}
        onPreview={handlePreview}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FilePreviewDialog
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />

      <FileEditDialog
        file={selectedFile}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdate={() => queryClient.invalidateQueries({ queryKey: ["project-files", projectId] })}
      />
    </div>
  );
}