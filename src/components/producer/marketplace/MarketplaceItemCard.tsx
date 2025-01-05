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
  Shield
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
    <Card className="overflow-hidden w-full max-w-sm">
      <div className="aspect-video relative h-36">
        <img
          src={thumbnailUrl}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPlay(item.id, item.preview_url)}
          >
            <Play className="h-4 w-4" />
          </Button>
          {item.total_sales > 10 && (
            <Badge variant="secondary" className="bg-primary/20">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="p-3 flex flex-row items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm">{item.title}</h3>
          <p className="text-xs text-muted-foreground">{item.type}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(item.id)} className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-3 space-y-2">
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            <Tag className="h-3 w-3 mr-1" />
            {item.genre}
          </Badge>
          {item.bpm && (
            <Badge variant="outline" className="text-xs">
              {item.bpm} BPM
            </Badge>
          )}
          {item.key && (
            <Badge variant="outline" className="text-xs">
              Key: {item.key}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <DollarSign className="h-3 w-3 mr-1" />
            <span className="font-semibold">${item.price}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            <Shield className="h-3 w-3 mr-1" />
            Basic License
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-3 flex justify-between text-xs text-muted-foreground">
        <span>{item.total_plays} plays</span>
        <span>•</span>
        <span>{item.total_downloads} downloads</span>
      </CardFooter>
    </Card>
  );
}