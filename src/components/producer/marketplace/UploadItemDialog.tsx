import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { ThumbnailUpload } from "./upload/ThumbnailUpload";
import { AudioUpload } from "./upload/AudioUpload";
import { DownloadUpload } from "./upload/DownloadUpload";
import { ItemForm } from "./upload/ItemForm";
import { UploadProgress } from "@/components/shared/media/UploadProgress";
import { useMarketplaceUpload } from "@/hooks/use-marketplace-upload";
import { useUploadAutosave } from "@/hooks/use-upload-autosave";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [downloadFile, setDownloadFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const { 
    isUploading, 
    uploadProgress, 
    currentUpload,
    handleUpload 
  } = useMarketplaceUpload();

  const {
    autoSaveEnabled,
    setAutoSaveEnabled,
    saveDraft,
    loadDraft,
    clearDraft
  } = useUploadAutosave();

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

  // Load saved draft when dialog opens
  useEffect(() => {
    if (open) {
      const draft = loadDraft();
      if (draft) {
        Object.entries(draft).forEach(([key, value]) => {
          if (key !== 'autoSaveEnabled' && key !== 'thumbnailFile' && 
              key !== 'audioFile' && key !== 'downloadFile') {
            form.setValue(key as any, value);
          }
        });
        setAutoSaveEnabled(draft.autoSaveEnabled ?? true);
        
        // Show toast about found draft
        toast({
          title: "Draft Found",
          description: "Your previous upload attempt has been restored.",
        });
      }
    }
  }, [open]);

  // Auto-save form data when it changes
  useEffect(() => {
    const subscription = form.watch((data) => {
      saveDraft({
        ...data,
        thumbnailFile,
        audioFile,
        downloadFile,
      });
    });
    return () => subscription.unsubscribe();
  }, [form.watch, thumbnailFile, audioFile, downloadFile, autoSaveEnabled]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = await handleUpload(values, thumbnailFile!, audioFile!, downloadFile);
    if (success) {
      clearDraft(); // Clear the draft on successful upload
      onSuccess();
      onOpenChange(false);
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
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-save"
                checked={autoSaveEnabled}
                onCheckedChange={setAutoSaveEnabled}
              />
              <Label htmlFor="auto-save">Auto-save progress</Label>
            </div>
            
            <ItemForm form={form} />
            
            <div className="space-y-4">
              <ThumbnailUpload onFileSelect={setThumbnailFile} />
              <AudioUpload onFileSelect={setAudioFile} />
              <DownloadUpload onFileSelect={setDownloadFile} />
              <p className="text-sm text-muted-foreground">
                Note: ZIP file is optional. If provided, it will be available for download after purchase.
              </p>
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
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  clearDraft();
                  onOpenChange(false);
                }}
              >
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