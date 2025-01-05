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
  Menu,
  Plus,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NavigationEditor } from "./block-editors/NavigationEditor";
import { HeroEditor } from "./block-editors/HeroEditor";
import { ProductsEditor } from "./block-editors/ProductsEditor";
import { ServicesEditor } from "./block-editors/ServicesEditor";
import { LicensingEditor } from "./block-editors/LicensingEditor";
import { MusicPlayerEditor } from "./block-editors/MusicPlayerEditor";
import { ContactEditor } from "./block-editors/ContactEditor";
import { TestimonialsEditor } from "./block-editors/TestimonialsEditor";
import { BookingEditor } from "./block-editors/BookingEditor";
import { SocialLinksEditor } from "./block-editors/SocialLinksEditor";
import { useToast } from "@/hooks/use-toast";

interface WebsiteBuilderProps {
  currentTemplate: string | null;
  onSave: () => void;
  blocks: any[];
  onBlocksChange: (blocks: any[]) => void;
}

const getDefaultContent = (blockType: string) => {
  switch (blockType) {
    case "navigation":
      return { links: [] };
    case "hero":
      return { title: "Welcome", subtitle: "", imageUrl: "" };
    case "products":
      return { title: "My Beats", items: [] };
    case "services":
      return { title: "Services", services: [] };
    case "licensing":
      return { title: "Licensing Options", licenses: [] };
    case "music-player":
      return { title: "Featured Tracks", tracks: [] };
    case "testimonials":
      return { title: "What People Say", testimonials: [] };
    case "booking":
      return { title: "Book a Session", description: "", showCalendar: true };
    case "social":
      return { title: "Connect With Me", links: [] };
    case "contact":
      return { heading: "Get in Touch", fields: ["name", "email", "message"], showSocials: false };
    default:
      return {};
  }
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
    icon: LayoutTemplate,
    description: "Add a hero section with image and text",
  },
  {
    id: "products",
    name: "Beat Store",
    icon: LayoutTemplate,
    description: "Display your beats and products",
  },
  {
    id: "services",
    name: "Services",
    icon: LayoutTemplate,
    description: "Showcase your production services",
  },
  {
    id: "licensing",
    name: "Licensing Options",
    icon: LayoutTemplate,
    description: "Show your licensing terms and prices",
  },
  {
    id: "music-player",
    name: "Music Player",
    icon: LayoutTemplate,
    description: "Add an embedded music player",
  },
  {
    id: "testimonials",
    name: "Testimonials",
    icon: LayoutTemplate,
    description: "Display client testimonials",
  },
  {
    id: "booking",
    name: "Studio Booking",
    icon: LayoutTemplate,
    description: "Add studio booking calendar",
  },
  {
    id: "social",
    name: "Social Links",
    icon: LayoutTemplate,
    description: "Add social media links",
  },
  {
    id: "contact",
    name: "Contact Form",
    icon: LayoutTemplate,
    description: "Add a contact form",
  },
];

export const WebsiteBuilder = ({
  currentTemplate,
  onSave,
  blocks,
  onBlocksChange,
}: WebsiteBuilderProps) => {
  const [editingBlock, setEditingBlock] = useState<any>(null);
  const { toast } = useToast();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onBlocksChange(items);
  };

  const addBlock = (blockType: string) => {
    const blockConfig = blockTypes.find((b) => b.id === blockType);
    if (!blockConfig) return;

    onBlocksChange([
      ...blocks,
      {
        id: `${blockType}-${Date.now()}`,
        type: blockType,
        content: getDefaultContent(blockType),
      },
    ]);
  };

  const updateBlockContent = (blockId: string, newContent: any) => {
    onBlocksChange(
      blocks.map((block) =>
        block.id === blockId
          ? { ...block, content: { ...block.content, ...newContent } }
          : block
      )
    );
    setEditingBlock(null);
  };

  const deleteBlock = (blockId: string) => {
    onBlocksChange(blocks.filter((block) => block.id !== blockId));
  };

  const renderBlockEditor = (block: any) => {
    switch (block.type) {
      case "navigation":
        return (
          <NavigationEditor
            content={block.content}
            onSave={(content) => updateBlockContent(block.id, content)}
          />
        );
      case "hero":
        return (
          <HeroEditor
            content={block.content}
            onSave={(content) => updateBlockContent(block.id, content)}
          />
        );
      case "products":
        return (
          <ProductsEditor
            content={block.content}
            onSave={(content) => updateBlockContent(block.id, content)}
          />
        );
      case "services":
        return (
          <ServicesEditor
            content={block.content}
            onSave={(content) => updateBlockContent(block.id, content)}
          />
        );
      case "licensing":
        return (
          <LicensingEditor
            content={block.content}
            onSave={(content) => updateBlockContent(block.id, content)}
          />
        );
      case "music-player":
        return (
          <MusicPlayerEditor
            content={block.content}
            onSave={(content) => updateBlockContent(block.id, content)}
          />
        );
      case "testimonials":
        return (
          <TestimonialsEditor
            content={block.content}
            onSave={(content) => updateBlockContent(block.id, content)}
          />
        );
      case "booking":
        return (
          <BookingEditor
            content={block.content}
            onSave={(content) => updateBlockContent(block.id, content)}
          />
        );
      case "social":
        return (
          <SocialLinksEditor
            content={block.content}
            onSave={(content) => updateBlockContent(block.id, content)}
          />
        );
      case "contact":
        return (
          <ContactEditor
            content={block.content}
            onSave={(content) => updateBlockContent(block.id, content)}
          />
        );
      default:
        return (
          <div className="p-4 text-center">
            <p className="text-muted-foreground">
              Editor not yet implemented for {block.type} block type
            </p>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <Card className="col-span-3">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Available Blocks</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
            >
              <Plus className="w-4 h-4 mr-2" />
              Save Template
            </Button>
          </div>
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
                            className="bg-card p-4 rounded-lg border group relative"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <LayoutTemplate className="mr-2 h-4 w-4" />
                                {blockTypes.find((b) => b.id === block.type)?.name}
                              </div>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setEditingBlock(block)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Edit {blockTypes.find((b) => b.id === block.type)?.name}
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                      {renderBlockEditor(block)}
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteBlock(block.id)}
                                >
                                  <Plus className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
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
