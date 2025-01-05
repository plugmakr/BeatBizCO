import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Pencil } from "lucide-react";

interface TemplateLibraryProps {
  onSelectTemplate: (templateId: string) => void;
  currentTemplate: string | null;
}

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design focused on your music",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Bold and contemporary layout for the modern producer",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Sophisticated design for established producers",
    thumbnail: "/placeholder.svg",
  },
];

export const TemplateLibrary = ({
  onSelectTemplate,
  currentTemplate,
}: TemplateLibraryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardContent className="p-4">
            <img
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg">{template.name}</h3>
            <p className="text-muted-foreground text-sm">{template.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectTemplate(template.id)}
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
            <Button size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Customize
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};