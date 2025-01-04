import DashboardLayout from "@/components/dashboard/DashboardLayout";

const ProducerWebsite = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Website</h1>
        <p className="text-muted-foreground">Manage your producer website here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ProducerWebsite;