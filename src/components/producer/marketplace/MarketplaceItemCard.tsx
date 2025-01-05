import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={thumbnailUrl}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-2 right-2"
          onClick={() => onPlay(item.id, item.preview_url)}
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
            <DropdownMenuItem onClick={() => onDelete(item.id)}>
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
  );
}