import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FunnelOverview } from "@/components/producer/funnels/FunnelOverview";
import { FunnelTemplates } from "@/components/producer/funnels/FunnelTemplates";
import { FunnelAnalytics } from "@/components/producer/funnels/FunnelAnalytics";
import { FunnelAutomation } from "@/components/producer/funnels/FunnelAutomation";
import { CreateFunnelDialog } from "@/components/producer/funnels/CreateFunnelDialog";
import { FunnelList } from "@/components/producer/funnels/FunnelList";

export default function ProducerFunnels() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Funnels</h1>
            <p className="text-muted-foreground">Create and manage your sales funnels</p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Funnel
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <FunnelOverview />
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Your Funnels</h2>
                <FunnelList />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <FunnelTemplates />
          </TabsContent>

          <TabsContent value="analytics">
            <FunnelAnalytics />
          </TabsContent>

          <TabsContent value="automation">
            <FunnelAutomation />
          </TabsContent>
        </Tabs>

        <CreateFunnelDialog 
          open={createDialogOpen} 
          onOpenChange={setCreateDialogOpen} 
        />
      </div>
    </DashboardLayout>
  );
}