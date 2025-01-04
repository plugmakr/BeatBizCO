import DashboardLayout from "@/components/dashboard/DashboardLayout";

const ProducerClients = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="text-muted-foreground">Manage your client relationships here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ProducerClients;