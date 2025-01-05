import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { FunnelTemplate } from "../data/templateData";

interface TemplateCardProps {
  template: FunnelTemplate;
  isSelected: boolean;
  onSelect: (templateId: number) => void;
  onPreviewStep: (step: any) => void;
}

export function TemplateCard({ template, isSelected, onSelect, onPreviewStep }: TemplateCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:border-primary ${
        isSelected ? 'border-primary' : ''
      }`}
      onClick={() => onSelect(template.id)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <template.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Avg. Conversion:</span>
            <span className="font-medium text-green-600">{template.conversion}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          {template.steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="px-3 py-1 bg-muted rounded-md text-sm cursor-pointer hover:bg-primary/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreviewStep(step);
                }}
              >
                {step.name}
              </div>
              {index < template.steps.length - 1 && (
                <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}