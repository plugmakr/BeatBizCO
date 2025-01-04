import DashboardLayout from "@/components/dashboard/DashboardLayout";

const ProducerFinances = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Finances</h1>
        <p className="text-muted-foreground">Track your earnings and financial metrics here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ProducerFinances;