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
  Music2,
  PlayCircle,
  MessageSquare,
  Calendar,
  Users,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Edit2,
  Trash2,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
    defaultContent: {
      links: [
        { label: "Home", url: "#" },
        { label: "Beats", url: "#beats" },
        { label: "Services", url: "#services" },
        { label: "Contact", url: "#contact" },
      ],
    },
  },
  {
    id: "hero",
    name: "Hero Section",
    icon: Image,
    description: "Add a hero section with image and text",
    defaultContent: {
      heading: "Professional Beat Making & Music Production",
      subheading: "Turn Your Vision Into Reality",
      ctaText: "Browse Beats",
      ctaUrl: "#beats",
      backgroundImage: "",
    },
  },
  {
    id: "products",
    name: "Beat Store",
    icon: ShoppingCart,
    description: "Display your beats and products",
    defaultContent: {
      heading: "Featured Beats",
      layout: "grid",
      itemsPerRow: 3,
      showFilters: true,
      showSort: true,
    },
  },
  {
    id: "licensing",
    name: "Licensing Options",
    icon: FileText,
    description: "Show your licensing terms and prices",
    defaultContent: {
      heading: "Licensing Options",
      description: "Choose the right license for your project",
      licenses: [
        {
          name: "Basic License",
          price: "29.99",
          features: ["MP3 File", "5000 Streams", "Non-Profit Use"],
        },
        {
          name: "Premium License",
          price: "99.99",
          features: ["WAV File", "Unlimited Streams", "Commercial Use"],
        },
      ],
    },
  },
  {
    id: "music-player",
    name: "Music Player",
    icon: PlayCircle,
    description: "Add an embedded music player",
    defaultContent: {
      playlist: [],
      autoplay: false,
      showArtwork: true,
      showWaveform: true,
    },
  },
  {
    id: "services",
    name: "Services",
    icon: Music2,
    description: "Showcase your production services",
    defaultContent: {
      heading: "Production Services",
      services: [
        {
          name: "Custom Beat Production",
          price: "Starting at $299",
          description: "Professional beat production tailored to your style",
        },
        {
          name: "Mixing & Mastering",
          price: "Starting at $149",
          description: "Industry-standard mixing and mastering services",
        },
      ],
    },
  },
  {
    id: "testimonials",
    name: "Testimonials",
    icon: MessageSquare,
    description: "Display client testimonials",
    defaultContent: {
      heading: "What Artists Say",
      testimonials: [],
    },
  },
  {
    id: "booking",
    name: "Studio Booking",
    icon: Calendar,
    description: "Add studio booking calendar",
    defaultContent: {
      heading: "Book Studio Time",
      description: "Schedule your next session",
      showCalendar: true,
    },
  },
  {
    id: "social",
    name: "Social Links",
    icon: Users,
    description: "Add social media links",
    defaultContent: {
      platforms: [
        { name: "Instagram", icon: Instagram, url: "" },
        { name: "YouTube", icon: Youtube, url: "" },
        { name: "Twitter", icon: Twitter, url: "" },
      ],
    },
  },
  {
    id: "contact",
    name: "Contact Form",
    icon: Mail,
    description: "Add a contact form",
    defaultContent: {
      heading: "Get in Touch",
      fields: ["name", "email", "message"],
      showSocials: true,
    },
  },
];

export const WebsiteBuilder = ({ currentTemplate, onSave }: WebsiteBuilderProps) => {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [editingBlock, setEditingBlock] = useState<any>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBlocks(items);
  };

  const addBlock = (blockType: string) => {
    const blockConfig = blockTypes.find((b) => b.id === blockType);
    if (!blockConfig) return;

    setBlocks([
      ...blocks,
      {
        id: `${blockType}-${Date.now()}`,
        type: blockType,
        content: { ...blockConfig.defaultContent },
      },
    ]);
  };

  const updateBlockContent = (blockId: string, newContent: any) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId
          ? { ...block, content: { ...block.content, ...newContent } }
          : block
      )
    );
    setEditingBlock(null);
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter((block) => block.id !== blockId));
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
                                      <Edit2 className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Edit {blockTypes.find((b) => b.id === block.type)?.name}
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      {block.type === "hero" && (
                                        <>
                                          <div className="space-y-2">
                                            <Label>Heading</Label>
                                            <Input
                                              defaultValue={block.content.heading}
                                              onChange={(e) =>
                                                updateBlockContent(block.id, {
                                                  heading: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label>Subheading</Label>
                                            <Input
                                              defaultValue={block.content.subheading}
                                              onChange={(e) =>
                                                updateBlockContent(block.id, {
                                                  subheading: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label>CTA Text</Label>
                                            <Input
                                              defaultValue={block.content.ctaText}
                                              onChange={(e) =>
                                                updateBlockContent(block.id, {
                                                  ctaText: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                        </>
                                      )}
                                      {/* Add more block-specific edit forms here */}
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteBlock(block.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
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