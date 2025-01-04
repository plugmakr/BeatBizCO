import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Music2 } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-32 relative">
      <div className="hero-gradient p-12 max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-8">
          <Music2 className="h-12 w-12 text-primary" />
          <h1 className="text-5xl md:text-7xl font-bold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
            BeatBiz
          </h1>
        </div>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Your all-in-one platform for music production and business management
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
          >
            Member Portal
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/auth")}
            className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
          >
            Admin Portal
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;