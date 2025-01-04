import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
    file: File | null,
    path: string,
    bucket: string,
    type: 'thumbnail' | 'audio' | 'download'
  ) => {
    if (!file) return null;
    
    setCurrentUpload(type);
    const xhr = new XMLHttpRequest();
    
    return new Promise<string>((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(prev => ({ ...prev, [type]: progress }));
        }
      });

      xhr.onload = async () => {
        if (xhr.status === 200) {
          const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file, {
              contentType: file.type,
              upsert: false,
            });
          
          if (error) reject(error);
          else resolve(path);
        } else {
          reject(new Error('Upload failed'));
        }
      };

      xhr.onerror = () => reject(new Error('Upload failed'));

      const formData = new FormData();
      formData.append('file', file);

      xhr.open('POST', `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/${bucket}/${path}`);
      xhr.setRequestHeader('Authorization', `Bearer ${supabase.auth.getSession()}`);
      xhr.send(formData);
    });
  };

  const handleUpload = async (
    values: any,
    thumbnailFile: File,
    audioFile: File,
    downloadFile: File | null,
  ) => {
    if (!thumbnailFile || !audioFile) {
      toast({
        title: "Missing files",
        description: "Please upload thumbnail and audio files",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Generate audio preview
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

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      const timestamp = Date.now();
      const thumbnailPath = `${session.user.id}/${timestamp}_thumbnail_${thumbnailFile.name}`;
      const audioPath = `${session.user.id}/${timestamp}_audio_${audioFile.name}`;
      
      // Upload files with progress
      const uploadPromises = [
        uploadFileWithProgress(thumbnailFile, thumbnailPath, 'marketplace', 'thumbnail'),
        uploadFileWithProgress(audioFile, audioPath, 'marketplace', 'audio'),
      ];

      let downloadPath = null;
      if (downloadFile) {
        downloadPath = `${session.user.id}/${timestamp}_download_${downloadFile.name}`;
        uploadPromises.push(
          uploadFileWithProgress(downloadFile, downloadPath, 'marketplace', 'download')
        );
      }

      const [thumbnailUploadPath, audioUploadPath, downloadUploadPath] = await Promise.all(uploadPromises);

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
      });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Item uploaded successfully",
      });

      return true;
    } catch (error) {
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