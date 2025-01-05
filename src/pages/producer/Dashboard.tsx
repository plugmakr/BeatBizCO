import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ProducerHero } from "@/components/producer/ProducerHero";
import { ProducerStats } from "@/components/producer/ProducerStats";
import { ProducerNews } from "@/components/producer/ProducerNews";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProducerDashboard() {
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? "You have unfollowed this producer" : "You are now following this producer",
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the producer",
    });
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <ProducerHero
          name="John Doe"
          image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop"
          location="Los Angeles, CA"
          followers="10.5K"
          bio="Multi-platinum music producer specializing in Hip Hop, R&B, and Pop. Worked with top artists including Drake, The Weeknd, and more."
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onMessage={handleMessage}
        />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <ProducerStats />
          <ProducerNews />
        </div>
      </div>
    </DashboardLayout>
  );
}