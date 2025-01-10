import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProducerHero from "@/components/producer/ProducerHero";
import ProducerStats from "@/components/producer/ProducerStats";
import ProducerNews from "@/components/producer/ProducerNews";

const ProducerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ProducerHero />
        <ProducerStats />
        <ProducerNews />
      </div>
    </DashboardLayout>
  );
};

export default ProducerDashboard;