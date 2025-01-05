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
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <WebsiteBuilder
            currentTemplate={null}
            onSave={handleSave}
            blocks={blocks}
            onBlocksChange={setBlocks}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}