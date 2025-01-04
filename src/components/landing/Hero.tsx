import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="content-section">
      <div className="container mx-auto">
        <div className="hero-gradient p-12 text-center">
          <div className="flex items-center justify-center mb-8">
            <Music2 className="h-12 w-12 text-primary" />
            <h1 className="text-5xl md:text-7xl font-bold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
              BeatBiz
            </h1>
          </div>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Your all-in-one platform for music production and business management
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;