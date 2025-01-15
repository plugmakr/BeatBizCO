import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UploadProgress } from "@/components/shared/media/UploadProgress";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";

const musicUploadSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  genre: z.string().min(2, "Genre must be at least 2 characters"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  description: z.string().optional(),
});

interface MusicUploadProps {
  onSuccess?: () => void;
}

export function MusicUpload({ onSuccess }: MusicUploadProps) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof musicUploadSchema>>({
    resolver: zodResolver(musicUploadSchema),
    defaultValues: {
      title: "",
      genre: "",
      price: "",
      description: "",
    },
  });

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleArtworkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArtworkFile(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof musicUploadSchema>) => {
    if (!audioFile) {
      toast({
        title: "Error",
        description: "Please select an audio file to upload",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      // Upload audio file
      const audioFileName = `${session.user.id}/${Date.now()}_${audioFile.name}`;
      const { error: audioError } = await supabase.storage
        .from("sound_library")
        .upload(audioFileName, audioFile);

      if (audioError) throw audioError;

      // Upload artwork if provided
      let artworkFileName = null;
      if (artworkFile) {
        artworkFileName = `${session.user.id}/${Date.now()}_${artworkFile.name}`;
        const { error: artworkError } = await supabase.storage
          .from("artwork")
          .upload(artworkFileName, artworkFile);

        if (artworkError) throw artworkError;
      }

      // Create music entry in database
      const { error: dbError } = await supabase
        .from("beats")
        .insert({
          title: values.title,
          genre: values.genre,
          price: parseFloat(values.price),
          description: values.description,
          audio_url: audioFileName,
          artwork_url: artworkFileName,
          producer_id: session.user.id,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Music uploaded successfully",
      });

      // Reset form
      form.reset();
      setAudioFile(null);
      setArtworkFile(null);
      setPreviewUrl(null);
      setUploadProgress(0);
      
      // Call onSuccess callback if provided
      onSuccess?.();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload music",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} type="number" step="0.01" />
                </FormControl>
                <FormDescription>
                  Set your price in USD
                </FormDescription>
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormItem>
              <FormLabel>Audio File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioChange}
                />
              </FormControl>
            </FormItem>

            {previewUrl && (
              <div className="rounded-lg border p-4">
                <AudioPlayer src={previewUrl} title="Preview" />
              </div>
            )}

            <FormItem>
              <FormLabel>Artwork</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleArtworkChange}
                />
              </FormControl>
            </FormItem>
          </div>

          {uploadProgress > 0 && (
            <UploadProgress
              progress={uploadProgress}
              fileName={audioFile?.name || ""}
            />
          )}

          <Button type="submit" disabled={uploadProgress > 0}>
            Upload Music
          </Button>
        </form>
      </Form>
    </div>
  );
}
