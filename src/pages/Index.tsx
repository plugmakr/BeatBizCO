import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WhyBeatBiz from "@/components/landing/WhyBeatBiz";
import PricingPlans from "@/components/landing/PricingPlans";
import CallToAction from "@/components/landing/CallToAction";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Index = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="border-b backdrop-blur-sm bg-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Music2 className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">BeatBiz</span>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex space-x-8">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white hover:text-white/80 cursor-pointer"
                  onClick={() => scrollToSection('features')}
                >
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white hover:text-white/80 cursor-pointer"
                  onClick={() => scrollToSection('pricing')}
                >
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white hover:text-white/80 cursor-pointer"
                  onClick={() => scrollToSection('how-it-works')}
                >
                  How it Works
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white hover:text-white/80 cursor-pointer"
                  onClick={() => scrollToSection('marketplace')}
                >
                  Marketplace
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
              className="text-white hover:bg-white/20"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              Register
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Hero />
      <section id="features">
        <Features />
      </section>
      <section id="pricing">
        <PricingPlans />
      </section>
      <section id="how-it-works">
        <WhyBeatBiz />
      </section>
      <section id="marketplace">
        <CallToAction />
      </section>
    </div>
  );
};

export default Index;