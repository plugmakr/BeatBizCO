
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Client } from "@/types/database";
import { FileOptions } from "@supabase/storage-js";

export function useClientFileUpload(client: Client, onSuccess: () => void) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState<string | null>(null);
  const { toast } = useToast();

  const uploadFile = async (file: File, parentId: string | null = null) => {
    setIsUploading(true);
    setUploadProgress(0);
    setCurrentUpload(file.name);

    try {
      // First, upload to Supabase Storage
      const filePath = `${client.id}/${file.name}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from('client_files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        } as FileOptions);

      if (storageError) throw storageError;

      // Then, create a record in the client_files table
      const { error: dbError } = await supabase.from('client_files').insert({
        client_id: client.id,
        file_name: file.name,
        display_name: file.name,
        file_path: filePath,
        file_type: file.type,
        size: file.size,
        parent_id: parentId,
        type: 'file'
      });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      onSuccess();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setCurrentUpload(null);
      setUploadProgress(0);
    }
  };

  return {
    isUploading,
    uploadProgress,
    currentUpload,
    uploadFile,
  };
}
