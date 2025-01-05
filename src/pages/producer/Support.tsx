import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerSupportTab } from "@/components/producer/support/CustomerSupportTab";
import { PortalSupportTab } from "@/components/producer/support/PortalSupportTab";

const ProducerSupport = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Support Center</h1>
          <p className="text-muted-foreground mt-2">
            Manage customer support and get help with your producer account
          </p>
        </div>

        <Tabs defaultValue="customer" className="space-y-4">
          <TabsList>
            <TabsTrigger value="customer">Customer Support</TabsTrigger>
            <TabsTrigger value="portal">Portal Support</TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <CustomerSupportTab />
          </TabsContent>

          <TabsContent value="portal">
            <PortalSupportTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProducerSupport;