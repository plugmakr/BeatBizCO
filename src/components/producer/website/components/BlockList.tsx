import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, LayoutTemplate } from "lucide-react";

interface BlockType {
  id: string;
  name: string;
  icon: any;
  description: string;
}

interface BlockListProps {
  blockTypes: BlockType[];
  onAddBlock: (blockType: string) => void;
}

export function BlockList({ blockTypes, onAddBlock }: BlockListProps) {
  return (
    <Card className="col-span-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Available Blocks</h3>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-3">
            {blockTypes.map((block) => (
              <Button
                key={block.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => onAddBlock(block.id)}
              >
                <block.icon className="mr-2 h-4 w-4" />
                {block.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}