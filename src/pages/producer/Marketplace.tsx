import DashboardLayout from "@/components/dashboard/DashboardLayout";

const ProducerMarketplace = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-muted-foreground">Browse and manage your marketplace listings here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ProducerMarketplace;