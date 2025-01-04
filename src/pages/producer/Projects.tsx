import DashboardLayout from "@/components/dashboard/DashboardLayout";

const ProducerProjects = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">Manage your production projects here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ProducerProjects;