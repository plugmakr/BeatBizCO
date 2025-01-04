import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileUp, Trash2 } from "lucide-react";
import { MediaThumbnail } from "@/components/shared/media/MediaThumbnail";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";
import { VideoPlayer } from "@/components/shared/media/VideoPlayer";
import type { Client, ClientFile } from "@/types/database";

interface ClientFilesProps {
  client: Client;
}

export function ClientFiles({ client }: ClientFilesProps) {
  const [files, setFiles] = useState<ClientFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState<{
    url: string;
    type: string;
    filename: string;
  } | null>(null);
  const { toast } = useToast();

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from('client_files')
      .select('*')
      .eq('client_id', client.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching files:', error);
      return;
    }

    setFiles(data as ClientFile[]);
  };

  useEffect(() => {
    fetchFiles();
  }, [client.id]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('clientId', client.id);

    try {
      const { error } = await supabase.functions.invoke('upload-client-file', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
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
        .from('client_files')
        .createSignedUrl(filePath, 3600); // 1 hour expiry

      if (error) throw error;

      setPreviewFile({
        url: data.signedUrl,
        type: fileType,
        filename,
      });
    } catch (error) {
      console.error('Error creating preview URL:', error);
      toast({
        title: "Error",
        description: "Failed to preview file",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (fileId: string, filePath: string) => {
    try {
      const { error: storageError } = await supabase.storage
        .from('client_files')
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('client_files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File deleted successfully",
      });

      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Files</span>
          <Button variant="outline" className="gap-2">
            <FileUp className="h-4 w-4" />
            <label className="cursor-pointer">
              Upload File
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handlePreview(file.file_path, file.filename, file.file_type)}
                  className="focus:outline-none"
                >
                  <MediaThumbnail type={file.file_type} />
                </button>
                <div>
                  <p className="font-medium">{file.filename}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(file.id, file.file_path)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
          {files.length === 0 && (
            <p className="text-center text-muted-foreground">No files uploaded yet</p>
          )}
        </div>
      </CardContent>

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
    </Card>
  );
}