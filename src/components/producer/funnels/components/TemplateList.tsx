import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FunnelTemplate } from "../data/templateData";
import { TemplateCard } from "./TemplateCard";
import { FunnelStepPreviewDialog } from "../FunnelStepPreviewDialog";

interface TemplateListProps {
  templates: FunnelTemplate[];
}

export function TemplateList({ templates }: TemplateListProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [previewStep, setPreviewStep] = useState<any>(null);
  const { toast } = useToast();

  const handleTemplateSelect = async (templateId: number) => {
    try {
      const template = templates.find(t => t.id === templateId);
      if (!template) throw new Error("Template not found");

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) throw new Error("No authenticated user found");

      // Create the funnel
      const { data: funnel, error: funnelError } = await supabase
        .from('funnels')
        .insert([{
          name: template.name,
          description: template.description,
          producer_id: session.user.id,
          status: 'draft'
        }])
        .select()
        .single();

      if (funnelError) throw funnelError;

      // Create the funnel steps with website blocks
      const stepsPromises = template.steps.map((step, index) => {
        return supabase
          .from('funnel_steps')
          .insert({
            funnel_id: funnel.id,
            name: step.name,
            type: step.type,
            config: step.config,
            order_index: index,
            website_blocks: [] // Initialize empty website blocks array
          });
      });

      await Promise.all(stepsPromises);

      // Create the automations
      const automationPromises = template.automations.map(automation => {
        return supabase
          .from('funnel_automations')
          .insert({
            funnel_id: funnel.id,
            name: automation.name,
            trigger_type: automation.triggerType,
            action_type: automation.actionType,
            config: automation.config
          });
      });

      await Promise.all(automationPromises);

      setSelectedTemplate(templateId);
      toast({
        title: "Template Applied",
        description: `${template.name} has been created successfully. You can now customize it in the Overview tab.`,
      });
    } catch (error) {
      console.error("Error applying template:", error);
      toast({
        title: "Error",
        description: "Failed to apply template",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedTemplate === template.id}
          onSelect={handleTemplateSelect}
          onPreviewStep={setPreviewStep}
        />
      ))}

      <FunnelStepPreviewDialog
        step={previewStep}
        open={!!previewStep}
        onOpenChange={(open) => !open && setPreviewStep(null)}
      />
    </div>
  );
}