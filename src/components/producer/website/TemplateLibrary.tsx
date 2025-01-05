import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Pencil } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WebsiteBuilder } from "./WebsiteBuilder";
import { useToast } from "@/hooks/use-toast";

interface TemplateLibraryProps {
  onSelectTemplate: (templateId: string) => void;
  currentTemplate: string | null;
}

const templates = [
  {
    id: "modern-dark",
    name: "Modern Dark",
    description: "A sleek, dark-themed layout with gradient accents",
    thumbnail: "/placeholder.svg",
    blocks: [
      {
        type: "navigation",
        content: {
          links: [
            { label: "Beats", url: "#beats" },
            { label: "Loop Kits", url: "#loops" },
            { label: "Sound Kits", url: "#sounds" },
            { label: "Drum Kits", url: "#drums" },
            { label: "Midi Kits", url: "#midi" },
            { label: "Services", url: "#services" },
            { label: "Licensing", url: "#licensing" }
          ]
        }
      },
      {
        type: "hero",
        content: {
          heading: "Premium Beats & Sound Kits",
          subheading: "Professional Quality for Serious Artists",
          ctaText: "Browse Beats",
          ctaUrl: "#beats",
          backgroundImage: ""
        }
      },
      {
        type: "products",
        content: {
          heading: "Featured Beats",
          itemsPerRow: 3,
          showFilters: true,
          showSort: true
        }
      },
      {
        type: "music-player",
        content: {
          heading: "Latest Releases",
          playlist: []
        }
      }
    ],
    theme: {
      background: "bg-gray-900",
      accent: "bg-gradient-to-r from-purple-600 to-blue-500"
    }
  },
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Clean and minimalist design with light colors",
    thumbnail: "/placeholder.svg",
    blocks: [
      {
        type: "navigation",
        content: {
          links: [
            { label: "Beats", url: "#beats" },
            { label: "Loop Kits", url: "#loops" },
            { label: "Sound Kits", url: "#sounds" },
            { label: "Drum Kits", url: "#drums" },
            { label: "Midi Kits", url: "#midi" },
            { label: "Services", url: "#services" },
            { label: "Licensing", url: "#licensing" }
          ]
        }
      },
      {
        type: "hero",
        content: {
          heading: "Quality Beats for Quality Artists",
          subheading: "Take Your Music to the Next Level",
          ctaText: "Start Creating",
          ctaUrl: "#beats",
          backgroundImage: ""
        }
      },
      {
        type: "licensing",
        content: {
          heading: "Licensing Options",
          licenses: [
            {
              name: "Basic License",
              price: "$29.99",
              features: ["MP3 File", "5000 Streams", "Non-Profit Use"]
            }
          ]
        }
      }
    ],
    theme: {
      background: "bg-gray-50",
      accent: "bg-gradient-to-r from-gray-200 to-gray-300"
    }
  },
  {
    id: "urban-vibe",
    name: "Urban Vibe",
    description: "Bold and energetic design for urban producers",
    thumbnail: "/placeholder.svg",
    blocks: [
      {
        type: "navigation",
        content: {
          links: [
            { label: "Beats", url: "#beats" },
            { label: "Loop Kits", url: "#loops" },
            { label: "Sound Kits", url: "#sounds" },
            { label: "Drum Kits", url: "#drums" },
            { label: "Midi Kits", url: "#midi" },
            { label: "Services", url: "#services" },
            { label: "Licensing", url: "#licensing" }
          ]
        }
      },
      {
        type: "hero",
        content: {
          heading: "Next Level Beats",
          subheading: "Premium Sound Design & Production",
          ctaText: "Listen Now",
          ctaUrl: "#player",
          backgroundImage: ""
        }
      },
      {
        type: "music-player",
        content: {
          heading: "Featured Tracks",
          playlist: []
        }
      },
      {
        type: "services",
        content: {
          heading: "Production Services",
          services: [
            {
              name: "Custom Beat Production",
              price: "Starting at $299",
              description: "Get a unique beat tailored to your style"
            }
          ]
        }
      }
    ],
    theme: {
      background: "bg-black",
      accent: "bg-gradient-to-r from-red-600 to-orange-400"
    }
  },
  {
    id: "pro-studio",
    name: "Pro Studio",
    description: "Professional layout for established producers",
    thumbnail: "/placeholder.svg",
    blocks: [
      {
        type: "navigation",
        content: {
          links: [
            { label: "Beats", url: "#beats" },
            { label: "Loop Kits", url: "#loops" },
            { label: "Sound Kits", url: "#sounds" },
            { label: "Drum Kits", url: "#drums" },
            { label: "Midi Kits", url: "#midi" },
            { label: "Services", url: "#services" },
            { label: "Licensing", url: "#licensing" }
          ]
        }
      },
      {
        type: "hero",
        content: {
          heading: "Professional Sound Design",
          subheading: "Industry Standard Production Tools",
          ctaText: "View Products",
          ctaUrl: "#products",
          backgroundImage: ""
        }
      },
      {
        type: "products",
        content: {
          heading: "Sound Library",
          itemsPerRow: 4,
          showFilters: true,
          showSort: true
        }
      }
    ],
    theme: {
      background: "bg-slate-900",
      accent: "bg-gradient-to-r from-emerald-500 to-teal-400"
    }
  },
  {
    id: "creative-hub",
    name: "Creative Hub",
    description: "Dynamic layout for creative producers",
    thumbnail: "/placeholder.svg",
    blocks: [
      {
        type: "navigation",
        content: {
          links: [
            { label: "Beats", url: "#beats" },
            { label: "Loop Kits", url: "#loops" },
            { label: "Sound Kits", url: "#sounds" },
            { label: "Drum Kits", url: "#drums" },
            { label: "Midi Kits", url: "#midi" },
            { label: "Services", url: "#services" },
            { label: "Licensing", url: "#licensing" }
          ]
        }
      },
      {
        type: "hero",
        content: {
          heading: "Unleash Your Creativity",
          subheading: "Professional Sound Design Tools",
          ctaText: "Start Creating",
          ctaUrl: "#products",
          backgroundImage: ""
        }
      },
      {
        type: "testimonials",
        content: {
          heading: "What Artists Say",
          testimonials: [
            {
              name: "John Doe",
              role: "Recording Artist",
              content: "The quality of these sounds is unmatched!"
            }
          ]
        }
      }
    ],
    theme: {
      background: "bg-indigo-900",
      accent: "bg-gradient-to-r from-pink-500 to-violet-500"
    }
  }
];

export const TemplateLibrary = ({
  onSelectTemplate,
  currentTemplate,
}: TemplateLibraryProps) => {
  const [customizeTemplate, setCustomizeTemplate] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      onSelectTemplate(templateId);
      toast({
        title: "Template Applied",
        description: `${template.name} template has been applied to your website.`,
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className={`w-full h-48 rounded-lg mb-4 ${template.theme.accent}`} />
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <p className="text-muted-foreground text-sm">{template.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUseTemplate(template.id)}
              >
                {currentTemplate === template.id ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Selected
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Use Template
                  </>
                )}
              </Button>
              <Button 
                size="sm"
                onClick={() => setCustomizeTemplate(template.id)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Customize
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!customizeTemplate} onOpenChange={() => setCustomizeTemplate(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Customize Template
            </DialogTitle>
          </DialogHeader>
          {customizeTemplate && (
            <WebsiteBuilder
              currentTemplate={customizeTemplate}
              onSave={() => {
                handleUseTemplate(customizeTemplate);
                setCustomizeTemplate(null);
              }}
              blocks={templates.find(t => t.id === customizeTemplate)?.blocks || []}
              onBlocksChange={() => {}}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};