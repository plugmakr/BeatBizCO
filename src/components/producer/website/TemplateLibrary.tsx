import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WebsiteBuilder } from "./WebsiteBuilder";
import { useToast } from "@/hooks/use-toast";
import { TemplateCard } from "./components/TemplateCard";
import { Template } from "./types/template";
import { templates } from "./data/templates";

interface TemplateLibraryProps {
  onSelectTemplate: (templateId: string) => void;
  currentTemplate: string | null;
}

export const TemplateLibrary = ({
  onSelectTemplate,
  currentTemplate,
}: TemplateLibraryProps) => {
  const [customizeTemplate, setCustomizeTemplate] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      console.log(`Loading template ${templateId} with ${template.blocks.length} blocks`);
      onSelectTemplate(templateId);
      toast({
        title: "Template Applied",
        description: `${template.name} template has been applied with ${template.blocks.length} sections.`,
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template: Template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={currentTemplate === template.id}
            onUse={handleUseTemplate}
            onCustomize={() => setCustomizeTemplate(template.id)}
          />
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