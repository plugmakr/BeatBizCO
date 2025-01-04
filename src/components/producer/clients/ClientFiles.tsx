import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Client, ClientFile } from "@/types/database";
import { FileUploadButton } from "./FileUploadButton";
import { FilePreviewDialog } from "./FilePreviewDialog";
import { FileList } from "./FileList";
import { UploadProgress } from "@/components/shared/media/UploadProgress";

interface ClientFilesProps {
  client: Client;
}

export function ClientFiles({ client }: ClientFilesProps) {
  const [files, setFiles] = useState<ClientFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState<string | null>(null);
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
    setUploadProgress(0);
    setCurrentUpload(file.name);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('clientId', client.id);

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
          toast({
            title: "Success",
            description: "File uploaded successfully",
          });
          fetchFiles();
        } else {
          throw new Error('Upload failed');
        }
      };

      xhr.onerror = () => {
        throw new Error('Upload failed');
      };

      xhr.open('POST', `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-client-file`);
      xhr.setRequestHeader('Authorization', `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`);
      xhr.send(formData);
    } catch (error) {
      console.error('Error uploading file:', error);
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