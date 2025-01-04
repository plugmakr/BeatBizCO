import DashboardLayout from "@/components/dashboard/DashboardLayout";

const ProducerSoundLibrary = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Sound Library</h1>
        <p className="text-muted-foreground">Manage your sound library and samples here.</p>
      </div>
    </DashboardLayout>
  );
};

export default ProducerSoundLibrary;