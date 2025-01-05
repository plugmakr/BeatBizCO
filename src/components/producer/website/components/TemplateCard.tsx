import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, Pencil } from "lucide-react";
import { Template } from "../types/template";

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onUse: (templateId: string) => void;
  onCustomize: (templateId: string) => void;
}

export function TemplateCard({ template, isSelected, onUse, onCustomize }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className={`w-full h-48 rounded-lg mb-4 ${template.theme.accent}`} />
        <h3 className="font-semibold text-lg">{template.name}</h3>
        <p className="text-muted-foreground text-sm">{template.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUse(template.id)}
        >
          {isSelected ? (
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
          onClick={() => onCustomize(template.id)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Customize
        </Button>
      </CardFooter>
    </Card>
  );
}