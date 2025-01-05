import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";
import { MarketplaceItemCard } from "./MarketplaceItemCard";

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  bpm?: number;
  key?: string;
  genre: string;
  tags?: string[];
  preview_url: string;
  thumbnail_url: string;
  total_sales: number;
  total_downloads: number;
  total_plays: number;
}

interface MarketplaceItemListProps {
  items: MarketplaceItem[];
  onRefresh: () => void;
}

export function MarketplaceItemList({ items, onRefresh }: MarketplaceItemListProps) {
  const { toast } = useToast();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [thumbnailUrls, setThumbnailUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadThumbnails = async () => {
      const urls: { [key: string]: string } = {};
      for (const item of items) {
        try {
          const { data: { publicUrl } } = supabase
            .storage
            .from('marketplace')
            .getPublicUrl(item.thumbnail_url);
          urls[item.id] = publicUrl;
        } catch (error) {
          console.error("Error getting thumbnail URL:", error);
        }
      }
      setThumbnailUrls(urls);
    };

    loadThumbnails();
  }, [items]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("marketplace_items")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item deleted successfully",
      });

      onRefresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const handlePlay = async (id: string, previewUrl: string) => {
    try {
      setPlayingId(id);
      
      // First check if the file exists
      const { data: fileExists, error: checkError } = await supabase
        .storage
        .from('marketplace')
        .list('', {
          search: previewUrl
        });

      if (checkError || !fileExists || fileExists.length === 0) {
        throw new Error("Preview file not found");
      }

      // Get the signed URL for the preview audio
      const { data, error } = await supabase
        .storage
        .from('marketplace')
        .createSignedUrl(previewUrl, 3600); // 1 hour expiry

      if (error) throw error;

      if (data?.signedUrl) {
        setAudioPreviewUrl(data.signedUrl);
        
        // Log the play event
        await supabase.from("marketplace_analytics").insert({
          item_id: id,
          event_type: "play",
        });
      }
    } catch (error: any) {
      console.error("Play analytics error:", error);
      toast({
        title: "Error",
        description: "Failed to play audio preview. The file might be missing or inaccessible.",
        variant: "destructive",
      });
      setPlayingId(null);
      setAudioPreviewUrl(null);
    }
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MarketplaceItemCard
            key={item.id}
            item={item}
            thumbnailUrl={thumbnailUrls[item.id] || ''}
            onPlay={handlePlay}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Dialog open={!!audioPreviewUrl} onOpenChange={() => setAudioPreviewUrl(null)}>
        <DialogContent>
          {audioPreviewUrl && (
            <AudioPlayer src={audioPreviewUrl} title="Audio Preview" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}