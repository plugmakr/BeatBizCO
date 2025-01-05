import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { BlockList } from "./components/BlockList";
import { BlockEditorDialog } from "./components/BlockEditorDialog";

interface WebsiteBuilderProps {
  currentTemplate: string | null;
  onSave: () => void;
  blocks: any[];
  onBlocksChange: (blocks: any[]) => void;
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

const getDefaultContent = (blockType: string) => {
  switch (blockType) {
    case "navigation":
      return { 
        links: [
          { label: "Home", url: "#" },
          { label: "Beats", url: "#beats" },
          { label: "Contact", url: "#contact" }
        ]
      };
    case "hero":
      return { 
        heading: "Welcome to My Studio",
        subheading: "Professional Beat Making & Music Production",
        ctaText: "Browse Beats",
        ctaUrl: "#beats",
        backgroundImage: "" 
      };
    case "products":
      return { 
        heading: "Featured Beats",
        description: "Check out my latest productions",
        itemsPerRow: 3,
        showFilters: true,
        showSort: true
      };
    case "services":
      return { 
        heading: "My Services",
        services: [
          {
            name: "Custom Beat Production",
            price: "Starting at $299",
            description: "Get a unique beat tailored to your style"
          }
        ]
      };
    case "licensing":
      return { 
        heading: "Licensing Options",
        description: "Choose the right license for your needs",
        licenses: [
          {
            name: "Basic License",
            price: "$29.99",
            features: ["MP3 File", "100k Streams", "Non-Profit Use"]
          }
        ]
      };
    case "music-player":
      return { 
        heading: "Listen to My Beats",
        playlist: []
      };
    case "testimonials":
      return { 
        heading: "What Artists Say",
        testimonials: [
          {
            name: "John Doe",
            role: "Recording Artist",
            content: "Add your first testimonial here"
          }
        ]
      };
    case "booking":
      return { 
        heading: "Book Studio Time",
        description: "Schedule your next session with me",
        showCalendar: true
      };
    case "social":
      return { 
        title: "Connect With Me",
        platforms: [
          { name: "Instagram", url: "" },
          { name: "YouTube", url: "" },
          { name: "Twitter", url: "" }
        ]
      };
    case "contact":
      return { 
        heading: "Get in Touch",
        fields: ["name", "email", "message"],
        showSocials: false
      };
    default:
      return {};
  }
}

export const WebsiteBuilder = ({
  currentTemplate,
  onSave,
  blocks,
  onBlocksChange,
}: WebsiteBuilderProps) => {
  const [editingBlock, setEditingBlock] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
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

    toast({
      title: "Block added",
      description: `${blockConfig.name} block has been added to your website.`,
    });
  };

  const updateBlockContent = (blockId: string, newContent: any) => {
    onBlocksChange(
      blocks.map((block) =>
        block.id === blockId
          ? { ...block, content: { ...block.content, ...newContent } }
          : block
      )
    );
    setDialogOpen(false);
    toast({
      title: "Changes saved",
      description: "Your block has been updated successfully.",
    });
  };

  const deleteBlock = (blockId: string) => {
    onBlocksChange(blocks.filter((block) => block.id !== blockId));
    toast({
      title: "Block deleted",
      description: "The block has been removed from your website.",
    });
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <BlockList blockTypes={blockTypes} onAddBlock={addBlock} />

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
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingBlock(block);
                                    setDialogOpen(true);
                                  }}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
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

      <BlockEditorDialog
        block={editingBlock}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={updateBlockContent}
      />
    </div>
  );
};
