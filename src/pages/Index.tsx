import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to BeatBiz</h1>
        <p className="text-xl text-muted-foreground">
          Your personalized dashboard is ready. Use the sidebar to navigate through your available features.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Index;