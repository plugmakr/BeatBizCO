
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { LicenseType } from "@/types/database";

export function useMarketplaceUpload() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({
    thumbnail: 0,
    audio: 0,
    download: 0,
    preview: 0,
  });
  const [currentUpload, setCurrentUpload] = useState<string | null>(null);

  const uploadFileWithProgress = async (
    file: File,
    path: string,
    type: 'thumbnail' | 'audio' | 'download'
  ) => {
    setCurrentUpload(type);
    
    try {
      const { data, error } = await supabase.storage
        .from('marketplace')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Simulate upload progress since Supabase doesn't provide it
      setUploadProgress(prev => ({ ...prev, [type]: 100 }));
      
      return path;
    } catch (error: any) {
      console.error(`Upload error for ${type}:`, error);
      toast({
        title: "Upload Error",
        description: `Failed to upload ${type} file: ${error.message}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleUpload = async (
    values: any,
    thumbnailFile: File,
    audioFile: File,
    downloadFile: File | null,
  ) => {
    setIsUploading(true);
    setUploadProgress({
      thumbnail: 0,
      audio: 0,
      download: 0,
      preview: 0,
    });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      const timestamp = Date.now();
      const thumbnailPath = `${session.user.id}/${timestamp}_thumbnail_${thumbnailFile.name}`;
      const audioPath = `${session.user.id}/${timestamp}_audio_${audioFile.name}`;
      
      // Generate preview using edge function
      setCurrentUpload('preview');
      const formData = new FormData();
      formData.append('file', audioFile);
      
      const previewResponse = await supabase.functions.invoke('generate-audio-preview', {
        body: formData,
      });

      if (previewResponse.error) {
        throw new Error('Failed to generate preview');
      }

      setUploadProgress(prev => ({ ...prev, preview: 100 }));

      // Upload files
      const uploadPromises = [
        uploadFileWithProgress(thumbnailFile, thumbnailPath, 'thumbnail'),
        uploadFileWithProgress(audioFile, audioPath, 'audio'),
      ];

      let downloadPath = null;
      if (downloadFile) {
        downloadPath = `${session.user.id}/${timestamp}_download_${downloadFile.name}`;
        uploadPromises.push(
          uploadFileWithProgress(downloadFile, downloadPath, 'download')
        );
      }

      await Promise.all(uploadPromises);

      // Create marketplace item
      const { error: insertError } = await supabase.from("marketplace_items").insert({
        producer_id: session.user.id,
        title: values.title,
        description: values.description,
        type: values.type,
        price: parseFloat(values.price),
        bpm: values.bpm ? parseInt(values.bpm) : null,
        key: values.key,
        genre: values.genre,
        tags: values.tags ? values.tags.split(",").map((tag: string) => tag.trim()) : [],
        preview_url: previewResponse.data.previewPath,
        thumbnail_url: thumbnailPath,
        download_url: downloadPath,
        status: "published",
        license_type: values.license_type as LicenseType || 'basic',
      });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Item uploaded successfully",
      });

      return true;
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload item. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUploading(false);
      setCurrentUpload(null);
      setUploadProgress({
        thumbnail: 0,
        audio: 0,
        download: 0,
        preview: 0,
      });
    }
  };

  return {
    isUploading,
    uploadProgress,
    currentUpload,
    handleUpload,
  };
}
