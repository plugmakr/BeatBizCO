import DashboardLayout from "@/components/dashboard/DashboardLayout";

const ProducerFunnels = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Funnels</h1>
        <p className="text-muted-foreground">Manage your marketing funnels here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ProducerFunnels;