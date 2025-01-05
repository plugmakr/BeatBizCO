import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WebsiteBuilder } from "../../website/WebsiteBuilder";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FunnelStepEditorProps {
  step: any;
  funnelId: string;
  onSave: () => void;
}

export function FunnelStepEditor({ step, funnelId, onSave }: FunnelStepEditorProps) {
  const [blocks, setBlocks] = useState(step.website_blocks || []);
  const { toast } = useToast();

  const getStepInstructions = (type: string) => {
    switch (type) {
      case "landing":
        return "This is your funnel's landing page. Add a compelling headline, hero section, and clear call-to-action to attract visitors.";
      case "product-showcase":
        return "Display your beats with audio previews. Focus on showcasing your best work and include pricing information.";
      case "pricing":
        return "Present your licensing options clearly. Each license should have distinct features and benefits.";
      case "checkout":
        return "Configure your checkout page. Include payment options, order summary, and any upsell opportunities.";
      case "lead-capture":
        return "Create a form to collect visitor information. Offer something valuable in exchange for their contact details.";
      case "delivery":
        return "Set up the delivery page where customers can download their purchases or access their content.";
      case "offer":
        return "Create a special offer or promotion. Make it compelling and time-sensitive to encourage quick action.";
      case "features":
        return "Highlight the key features and benefits of your beats or services.";
      case "subscription":
        return "Configure subscription options if you offer recurring services or memberships.";
      case "signup":
        return "Create a signup form for new customers. Keep it simple and only ask for essential information.";
      default:
        return "Configure this step of your funnel to guide visitors toward a conversion.";
    }
  };

  const getRelevantBlockTypes = (type: string) => {
    const commonBlocks = ["navigation", "hero"];
    switch (type) {
      case "landing":
        return [...commonBlocks, "hero", "testimonials", "social"];
      case "product-showcase":
        return [...commonBlocks, "products", "music-player"];
      case "pricing":
        return [...commonBlocks, "licensing", "testimonials"];
      case "checkout":
        return ["navigation", "checkout"];
      case "lead-capture":
        return [...commonBlocks, "contact"];
      case "delivery":
        return ["navigation", "download-section"];
      case "offer":
        return [...commonBlocks, "pricing", "countdown"];
      case "features":
        return [...commonBlocks, "features", "testimonials"];
      case "subscription":
        return [...commonBlocks, "pricing", "features"];
      case "signup":
        return ["navigation", "signup-form"];
      default:
        return commonBlocks;
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('funnel_steps')
        .update({
          website_blocks: blocks
        })
        .eq('id', step.id)
        .eq('funnel_id', funnelId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Funnel step updated successfully",
      });
      
      onSave();
    } catch (error) {
      console.error("Error updating funnel step:", error);
      toast({
        title: "Error",
        description: "Failed to update funnel step",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit {step.name}</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          {getStepInstructions(step.type)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <WebsiteBuilder
            currentTemplate={null}
            onSave={handleSave}
            blocks={blocks}
            onBlocksChange={setBlocks}
            allowedBlockTypes={getRelevantBlockTypes(step.type)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}