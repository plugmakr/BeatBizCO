import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Loader2, Upload, Trash2 } from "lucide-react";
import { MediaThumbnail } from "@/components/shared/media/MediaThumbnail";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";
import { VideoPlayer } from "@/components/shared/media/VideoPlayer";

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
  const [previewFile, setPreviewFile] = useState<{
    url: string;
    type: string;
    filename: string;
  } | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: files, isLoading } = useQuery({
    queryKey: ["project-files", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_files")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
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
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${projectId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("project_files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from("project_files").insert({
        project_id: projectId,
        filename: file.name,
        file_path: filePath,
        file_type: file.type,
        size: file.size,
      });

      if (dbError) throw dbError;

      queryClient.invalidateQueries({ queryKey: ["project-files", projectId] });
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreview = async (filePath: string, filename: string, fileType: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("project_files")
        .createSignedUrl(filePath, 3600); // 1 hour expiry

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

      <div className="space-y-2">
        {files?.map((file) => (
          <Card key={file.id} className="bg-[#2A2F3C] border-[#9b87f5]/20">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handlePreview(file.file_path, file.filename, file.file_type)}
                  className="focus:outline-none"
                >
                  <MediaThumbnail type={file.file_type} />
                </button>
                <div className="flex-1">
                  <p className="text-white">{file.filename}</p>
                  <p className="text-sm text-gray-400">
                    {format(new Date(file.created_at), "PPP")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    deleteFileMutation.mutate({
                      id: file.id,
                      filePath: file.file_path,
                    })
                  }
                  className="text-gray-400 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewFile?.filename}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {previewFile?.type.startsWith("audio/") && (
              <AudioPlayer src={previewFile.url} title={previewFile.filename} />
            )}
            {previewFile?.type.startsWith("video/") && (
              <VideoPlayer src={previewFile.url} title={previewFile.filename} />
            )}
            {previewFile?.type.startsWith("image/") && (
              <img
                src={previewFile.url}
                alt={previewFile.filename}
                className="w-full rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}