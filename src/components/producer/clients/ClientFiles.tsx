import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import type { Client, ClientFile } from "@/types/database";
import { FileUploadButton } from "./FileUploadButton";
import { FilePreviewDialog } from "./files/FilePreviewDialog";
import { FileList } from "./FileList";
import { UploadProgress } from "@/components/shared/media/UploadProgress";
import { useClientFileUpload } from "@/hooks/use-client-file-upload";
import { useToast } from "@/hooks/use-toast";

interface ClientFilesProps {
  client: Client;
}

export function ClientFiles({ client }: ClientFilesProps) {
  const [files, setFiles] = useState<ClientFile[]>([]);
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
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching files:', error);
      return;
    }

    setFiles(data as ClientFile[]);
  }

  useEffect(() => {
    fetchFiles();
  }, [client.id]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
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
          <FileUploadButton
            isUploading={isUploading}
            onFileSelect={handleFileUpload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
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
        />
      </CardContent>

      <FilePreviewDialog
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </Card>
  );
}