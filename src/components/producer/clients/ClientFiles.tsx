import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileUp, Trash2, Download } from "lucide-react";
import type { Client } from "@/types/database";

interface ClientFile {
  id: string;
  filename: string;
  file_type: string;
  size: number;
  created_at: string;
}

interface ClientFilesProps {
  client: Client;
}

export function ClientFiles({ client }: ClientFilesProps) {
  const [files, setFiles] = useState<ClientFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
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

    setFiles(data);
  };

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

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('client_files')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Error",
        description: "Failed to download file",
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
              <div className="flex-1">
                <p className="font-medium">{file.filename}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(file.file_path, file.filename)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(file.id, file.file_path)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          {files.length === 0 && (
            <p className="text-center text-muted-foreground">No files uploaded yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}