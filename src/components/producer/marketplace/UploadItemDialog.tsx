import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

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

export function UploadItemDialog({ 
  open, 
  onOpenChange,
  onSuccess 
}: UploadItemDialogProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [downloadFile, setDownloadFile] = useState<File | null>(null);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!previewFile || !thumbnailFile || !downloadFile) {
      toast({
        title: "Missing files",
        description: "Please upload all required files",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      const timestamp = Date.now();
      const previewPath = `${session.user.id}/${timestamp}_preview_${previewFile.name}`;
      const thumbnailPath = `${session.user.id}/${timestamp}_thumbnail_${thumbnailFile.name}`;
      const downloadPath = `${session.user.id}/${timestamp}_download_${downloadFile.name}`;

      // Upload files
      const [previewUpload, thumbnailUpload, downloadUpload] = await Promise.all([
        supabase.storage.from("marketplace").upload(previewPath, previewFile),
        supabase.storage.from("marketplace").upload(thumbnailPath, thumbnailFile),
        supabase.storage.from("marketplace").upload(downloadPath, downloadFile),
      ]);

      if (previewUpload.error || thumbnailUpload.error || downloadUpload.error) {
        throw new Error("Failed to upload files");
      }

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
        preview_url: previewPath,
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload New Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beat">Beat</SelectItem>
                        <SelectItem value="drum_kit">Drum Kit</SelectItem>
                        <SelectItem value="sample_kit">Sample Kit</SelectItem>
                        <SelectItem value="preset_pack">Preset Pack</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bpm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BPM (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma-separated)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FormItem>
                <FormLabel>Preview File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="audio/*,video/*"
                    onChange={(e) => setPreviewFile(e.target.files?.[0] || null)}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Download File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => setDownloadFile(e.target.files?.[0] || null)}
                  />
                </FormControl>
              </FormItem>
            </div>
            <div className="flex justify-end gap-2">
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