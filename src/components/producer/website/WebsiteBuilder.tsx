import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  LayoutTemplate,
  Image,
  ShoppingCart,
  FileText,
  Menu,
  Plus,
} from "lucide-react";

interface WebsiteBuilderProps {
  currentTemplate: string | null;
  onSave: () => void;
}

const blockTypes = [
  {
    id: "navigation",
    name: "Navigation Menu",
    icon: Menu,
    description: "Add a navigation menu to your site",
  },
  {
    id: "hero",
    name: "Hero Section",
    icon: Image,
    description: "Add a hero section with image and text",
  },
  {
    id: "products",
    name: "Products Grid",
    icon: ShoppingCart,
    description: "Display your beats and products",
  },
  {
    id: "licensing",
    name: "Licensing Options",
    icon: FileText,
    description: "Show your licensing terms and prices",
  },
];

export const WebsiteBuilder = ({ currentTemplate, onSave }: WebsiteBuilderProps) => {
  const [blocks, setBlocks] = useState<any[]>([]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBlocks(items);
  };

  const addBlock = (blockType: string) => {
    setBlocks([...blocks, { id: `${blockType}-${Date.now()}`, type: blockType }]);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Block Library */}
      <Card className="col-span-3">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Available Blocks</h3>
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-3">
              {blockTypes.map((block) => (
                <Button
                  key={block.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addBlock(block.id)}
                >
                  <block.icon className="mr-2 h-4 w-4" />
                  {block.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Builder Canvas */}
      <div className="col-span-9">
        <Card>
          <CardContent className="p-6">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="website-blocks">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[calc(100vh-300px)] space-y-4"
                  >
                    {blocks.map((block, index) => (
                      <Draggable
                        key={block.id}
                        draggableId={block.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-card p-4 rounded-lg border"
                          >
                            <div className="flex items-center">
                              <LayoutTemplate className="mr-2 h-4 w-4" />
                              {blockTypes.find((b) => b.id === block.type)?.name}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {blocks.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
                        <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Drag and drop blocks here to build your website
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};