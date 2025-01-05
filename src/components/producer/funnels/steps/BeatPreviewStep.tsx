import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Music2 } from "lucide-react";

interface BeatPreviewStepProps {
  config: {
    layout: string;
    itemsPerRow: number;
    showFilters: boolean;
  };
}

export function BeatPreviewStep({ config }: BeatPreviewStepProps) {
  const beats = [
    { id: 1, title: "Summer Vibes", price: 29.99, genre: "Hip Hop" },
    { id: 2, title: "Night Rider", price: 39.99, genre: "Trap" },
    { id: 3, title: "Ocean Waves", price: 34.99, genre: "R&B" },
  ];

  return (
    <div className="space-y-6">
      {config.showFilters && (
        <div className="flex gap-4 mb-6">
          <select className="p-2 rounded-md border">
            <option>All Genres</option>
            <option>Hip Hop</option>
            <option>Trap</option>
            <option>R&B</option>
          </select>
          <select className="p-2 rounded-md border">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-${config.itemsPerRow} gap-6`}>
        {beats.map((beat) => (
          <Card key={beat.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music2 className="h-5 w-5" />
                {beat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{beat.genre}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="font-bold">${beat.price}</span>
              <Button size="sm">Preview</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}