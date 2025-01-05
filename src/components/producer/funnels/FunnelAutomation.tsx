import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Gift, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AutomationConfig {
  id: string;
  name: string;
  triggerType: string;
  actionType: string;
  config: any;
  isActive: boolean;
}

export function FunnelAutomation() {
  const [automations, setAutomations] = useState<AutomationConfig[]>([]);
  const { toast } = useToast();

  const handleConfigureAutomation = async (automation: AutomationConfig) => {
    try {
      const { error } = await supabase
        .from('funnel_automations')
        .update({
          config: automation.config,
          is_active: automation.isActive
        })
        .eq('id', automation.id);

      if (error) throw error;

      toast({
        title: "Automation Updated",
        description: "The automation has been configured successfully.",
      });
    } catch (error) {
      console.error("Error configuring automation:", error);
      toast({
        title: "Error",
        description: "Failed to configure automation",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel Automation</CardTitle>
        <CardDescription>Set up automated actions for your funnels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center p-4 border rounded-lg">
            <Sparkles className="h-8 w-8 text-primary mr-4" />
            <div className="flex-1">
              <h3 className="font-semibold">Email Follow-up Sequence</h3>
              <p className="text-sm text-muted-foreground">
                Automatically send personalized emails based on user actions
              </p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Trigger Event</Label>
                  <Select defaultValue="form_submitted">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="form_submitted">Form Submitted</SelectItem>
                      <SelectItem value="page_visited">Page Visited</SelectItem>
                      <SelectItem value="button_clicked">Button Clicked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Delay (hours)</Label>
                  <Input type="number" className="w-[200px]" placeholder="0" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Active</Label>
                  <Switch />
                </div>
              </div>
            </div>
            <Button variant="outline" className="ml-4">Save</Button>
          </div>

          <div className="flex items-center p-4 border rounded-lg">
            <Gift className="h-8 w-8 text-primary mr-4" />
            <div className="flex-1">
              <h3 className="font-semibold">Smart Upsell System</h3>
              <p className="text-sm text-muted-foreground">
                Show personalized offers based on customer behavior
              </p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Trigger Action</Label>
                  <Select defaultValue="cart_added">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cart_added">Item Added to Cart</SelectItem>
                      <SelectItem value="checkout_started">Checkout Started</SelectItem>
                      <SelectItem value="purchase_completed">Purchase Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Offer Type</Label>
                  <Select defaultValue="related">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select offer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="related">Related Products</SelectItem>
                      <SelectItem value="bundle">Bundle Discount</SelectItem>
                      <SelectItem value="upgrade">License Upgrade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Active</Label>
                  <Switch />
                </div>
              </div>
            </div>
            <Button variant="outline" className="ml-4">Save</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}