import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Music2 } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Welcome to BeatBiz
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Your all-in-one platform for music production and business management
      </p>
      <div className="flex justify-center gap-4">
        <Button
          size="lg"
          onClick={() => navigate("/auth")}
          className="px-8"
        >
          Member Portal
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate("/auth")}
          className="px-8"
        >
          Admin Portal
        </Button>
      </div>
    </section>
  );
};

export default Hero;