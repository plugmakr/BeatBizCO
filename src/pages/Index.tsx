import { useNavigate } from "react-router-dom";
import TopNavigation from "@/components/navigation/TopNavigation";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WhyBeatBizBanner from "@/components/landing/WhyBeatBizBanner";
import MoreFeatures from "@/components/landing/MoreFeatures";
import PricingPlans from "@/components/landing/PricingPlans";
import CallToAction from "@/components/landing/CallToAction";

const Index = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getDashboardRoute = () => '/producer';

  return (
    <div className="min-h-screen">
      <TopNavigation
        scrollToSection={scrollToSection}
        getDashboardRoute={getDashboardRoute}
      />

      {/* Main Content */}
      <Hero />
      <section id="features">
        <Features />
      </section>
      <section id="why-beatbiz">
        <WhyBeatBizBanner />
      </section>
      <section id="more-features">
        <MoreFeatures />
      </section>
      <section id="pricing">
        <PricingPlans />
      </section>
      <section id="marketplace">
        <CallToAction />
      </section>
    </div>
  );
};

export default Index;