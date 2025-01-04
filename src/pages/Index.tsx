import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WhyBeatBiz from "@/components/landing/WhyBeatBiz";
import PricingPlans from "@/components/landing/PricingPlans";
import CallToAction from "@/components/landing/CallToAction";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Music2 className="h-6 w-6" />
            <span className="text-xl font-bold">BeatBiz</span>
          </div>
          <div className="space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/auth")}
            >
              Register
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Hero />
      <Features />
      <WhyBeatBiz />
      <CallToAction />
      <PricingPlans />
    </div>
  );
};

export default Index;