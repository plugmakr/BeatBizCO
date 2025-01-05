import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  MoreVertical, 
  Share2, 
  Star, 
  Tag,
  DollarSign,
  Shield,
  Folder
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface MarketplaceItemCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    type: string;
    price: number;
    bpm?: number;
    key?: string;
    genre: string;
    category: "Loops" | "Midi Kits" | "Sample Kits" | "Drum Kits" | "Beats";
    tags?: string[];
    preview_url: string;
    total_sales: number;
    total_downloads: number;
    total_plays: number;
  };
  thumbnailUrl: string;
  onPlay: (id: string, previewUrl: string) => void;
  onDelete: (id: string) => void;
}

export function MarketplaceItemCard({ 
  item, 
  thumbnailUrl, 
  onPlay, 
  onDelete 
}: MarketplaceItemCardProps) {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Card className="overflow-hidden w-full max-w-[200px]">
      <div className="aspect-video relative h-24">
        <img
          src={thumbnailUrl}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-1 right-1 flex gap-1">
          <Button
            variant="secondary"
            size="icon"
            className="h-6 w-6"
            onClick={() => onPlay(item.id, item.preview_url)}
          >
            <Play className="h-3 w-3" />
          </Button>
          {item.total_sales > 10 && (
            <Badge variant="secondary" className="bg-primary/20 text-xs py-0 h-6">
              <Star className="h-2 w-2 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="p-2 flex flex-row items-center justify-between">
        <div>
          <h3 className="font-semibold text-xs truncate max-w-[120px]">{item.title}</h3>
          <p className="text-[10px] text-muted-foreground">{item.type}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="h-3 w-3 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(item.id)} className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-2 space-y-1">
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-[10px] py-0">
            <Folder className="h-2 w-2 mr-1" />
            {item.category}
          </Badge>
          <Badge variant="outline" className="text-[10px] py-0">
            <Tag className="h-2 w-2 mr-1" />
            {item.genre}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center">
            <DollarSign className="h-2 w-2 mr-1" />
            <span className="font-semibold">${item.price}</span>
          </div>
          <Badge variant="secondary" className="text-[10px] py-0">
            <Shield className="h-2 w-2 mr-1" />
            Basic
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-2 flex justify-between text-[10px] text-muted-foreground">
        <span>{item.total_plays} plays</span>
        <span>•</span>
        <span>{item.total_downloads} dl</span>
      </CardFooter>
    </Card>
  );
}