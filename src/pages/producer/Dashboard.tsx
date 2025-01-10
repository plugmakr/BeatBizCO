import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ProducerHero } from "@/components/producer/ProducerHero";
import { ProducerStats } from "@/components/producer/ProducerStats";
import { ProducerNews } from "@/components/producer/ProducerNews";

const ProducerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ProducerHero 
          name="Producer Name"
          image="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop"
          location="Los Angeles, CA"
          followers="10.5K"
          bio="Music producer specializing in hip-hop and R&B beats. Working with top artists in the industry."
          isFollowing={false}
          onFollow={() => {}}
          onMessage={() => {}}
        />
        <ProducerStats />
        <ProducerNews />
      </div>
    </DashboardLayout>
  );
};

export default ProducerDashboard;