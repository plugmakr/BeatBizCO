import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";

export function FunnelAutomation() {
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
            <div>
              <h3 className="font-semibold">Email Follow-up Sequence</h3>
              <p className="text-sm text-muted-foreground">
                Automatically send personalized emails based on user actions
              </p>
            </div>
            <Button variant="outline" className="ml-auto">Configure</Button>
          </div>
          <div className="flex items-center p-4 border rounded-lg">
            <Gift className="h-8 w-8 text-primary mr-4" />
            <div>
              <h3 className="font-semibold">Smart Upsell System</h3>
              <p className="text-sm text-muted-foreground">
                Show personalized offers based on customer behavior
              </p>
            </div>
            <Button variant="outline" className="ml-auto">Configure</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}