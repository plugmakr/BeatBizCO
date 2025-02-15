import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FunnelStepEditor } from "./components/FunnelStepEditor";

interface Funnel {
  id: string;
  name: string;
  description: string | null;
  status: 'draft' | 'active' | 'archived';
}

interface EditFunnelDialogProps {
  funnel: Funnel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function EditFunnelDialog({ funnel, open, onOpenChange, onSave }: EditFunnelDialogProps) {
  const [name, setName] = useState(funnel.name);
  const [description, setDescription] = useState(funnel.description || "");
  const [status, setStatus] = useState<'draft' | 'active' | 'archived'>(funnel.status);
  const [steps, setSteps] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSteps = async () => {
      const { data, error } = await supabase
        .from('funnel_steps')
        .select('*')
        .eq('funnel_id', funnel.id)
        .order('order_index');

      if (error) {
        console.error("Error fetching funnel steps:", error);
        return;
      }

      setSteps(data || []);
    };

    if (open) {
      fetchSteps();
    }
  }, [funnel.id, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('funnels')
        .update({
          name,
          description,
          status
        })
        .eq('id', funnel.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Funnel updated successfully",
      });
      
      onSave();
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating funnel:", error);
      toast({
        title: "Error",
        description: "Failed to update funnel",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Funnel</DialogTitle>
          <DialogDescription>
            A funnel guides visitors through a series of steps toward a specific goal, like making a purchase or signing up.
            Each step should be designed to move visitors closer to that goal.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="details" className="h-[600px]">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Configure the basic information about your funnel. The status determines whether your funnel is live and accepting visitors.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Funnel Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter funnel name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter funnel description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value: 'draft' | 'active' | 'archived') => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="steps" className="h-full">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Each step in your funnel serves a specific purpose. Edit each step below to customize its content and appearance.
                The steps are arranged in order, guiding visitors from the landing page through to conversion.
              </p>
            </div>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {steps.map((step) => (
                  <FunnelStepEditor
                    key={step.id}
                    step={step}
                    funnelId={funnel.id}
                    onSave={onSave}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}