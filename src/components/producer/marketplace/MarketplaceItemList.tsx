import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Download, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AudioPlayer } from "@/components/shared/media/AudioPlayer";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
      const { data: fileExists } = await supabase
        .storage
        .from('marketplace')
        .list('', {
          search: previewUrl
        });

      if (!fileExists || fileExists.length === 0) {
        throw new Error('Audio preview file not found');
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
        description: error.message || "Failed to play audio preview",
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
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={thumbnailUrls[item.id]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-2 right-2"
                onClick={() => handlePlay(item.id, item.preview_url)}
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.type}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{item.genre}</Badge>
                {item.bpm && <Badge variant="secondary">{item.bpm} BPM</Badge>}
                {item.key && <Badge variant="secondary">Key: {item.key}</Badge>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm space-x-2">
                <span>{item.total_plays} plays</span>
                <span>•</span>
                <span>{item.total_downloads} downloads</span>
              </div>
              <p className="font-semibold">${item.price}</p>
            </CardFooter>
          </Card>
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