import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { ThumbnailUpload } from "./upload/ThumbnailUpload";
import { AudioUpload } from "./upload/AudioUpload";
import { DownloadUpload } from "./upload/DownloadUpload";
import { ItemForm } from "./upload/ItemForm";
import { UploadProgress } from "@/components/shared/media/UploadProgress";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["beat", "drum_kit", "sample_kit", "preset_pack"]),
  price: z.string().min(1, "Price is required"),
  bpm: z.string().optional(),
  key: z.string().optional(),
  genre: z.string().min(1, "Genre is required"),
  tags: z.string().optional(),
});

interface UploadItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function UploadItemDialog({ open, onOpenChange, onSuccess }: UploadItemDialogProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [downloadFile, setDownloadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({
    thumbnail: 0,
    audio: 0,
    download: 0,
    preview: 0,
  });
  const [currentUpload, setCurrentUpload] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "beat",
      price: "",
      bpm: "",
      key: "",
      genre: "",
      tags: "",
    },
  });

  const uploadFileWithProgress = async (
    file: File,
    path: string,
    bucket: string,
    type: 'thumbnail' | 'audio' | 'download'
  ) => {
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

      // Prepare form data for the XHR request
      const formData = new FormData();
      formData.append('file', file);

      xhr.open('POST', `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/${bucket}/${path}`);
      xhr.setRequestHeader('Authorization', `Bearer ${supabase.auth.getSession()}`);
      xhr.send(formData);
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!thumbnailFile || !audioFile || !downloadFile) {
      toast({
        title: "Missing files",
        description: "Please upload all required files",
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
      const downloadPath = `${session.user.id}/${timestamp}_download_${downloadFile.name}`;

      // Upload files with progress
      const [thumbnailUploadPath, audioUploadPath, downloadUploadPath] = await Promise.all([
        uploadFileWithProgress(thumbnailFile, thumbnailPath, 'marketplace', 'thumbnail'),
        uploadFileWithProgress(audioFile, audioPath, 'marketplace', 'audio'),
        uploadFileWithProgress(downloadFile, downloadPath, 'marketplace', 'download'),
      ]);

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
        tags: values.tags ? values.tags.split(",").map(tag => tag.trim()) : [],
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

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload item. Please try again.",
        variant: "destructive",
      });
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload New Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ItemForm form={form} />
            <div className="space-y-4">
              <ThumbnailUpload onFileSelect={setThumbnailFile} />
              <AudioUpload onFileSelect={setAudioFile} />
              <DownloadUpload onFileSelect={setDownloadFile} />
            </div>
            
            {isUploading && (
              <div className="space-y-2">
                {currentUpload === 'preview' && (
                  <UploadProgress
                    progress={uploadProgress.preview}
                    fileName="Generating preview..."
                  />
                )}
                {currentUpload === 'thumbnail' && (
                  <UploadProgress
                    progress={uploadProgress.thumbnail}
                    fileName="Uploading thumbnail..."
                  />
                )}
                {currentUpload === 'audio' && (
                  <UploadProgress
                    progress={uploadProgress.audio}
                    fileName="Uploading audio..."
                  />
                )}
                {currentUpload === 'download' && (
                  <UploadProgress
                    progress={uploadProgress.download}
                    fileName="Uploading download file..."
                  />
                )}
              </div>
            )}
            
            <div className="flex justify-end gap-2 sticky bottom-0 bg-background py-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Upload Item
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}