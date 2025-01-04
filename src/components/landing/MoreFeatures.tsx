import { 
  Globe, 
  Users, 
  Shield, 
  Settings, 
  Music2, 
  BookOpen 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MoreFeatures = () => {
  const features = [
    {
      icon: <Globe className="h-12 w-12 mb-4 text-primary" />,
      title: "Website Builder",
      description: "Create a professional website for your music brand."
    },
    {
      icon: <Users className="h-12 w-12 mb-4 text-primary" />,
      title: "Collaboration Tools",
      description: "Work seamlessly with other producers and artists."
    },
    {
      icon: <Shield className="h-12 w-12 mb-4 text-primary" />,
      title: "Rights Management",
      description: "Protect your intellectual property and manage licenses."
    },
    {
      icon: <Settings className="h-12 w-12 mb-4 text-primary" />,
      title: "Customizable Workflows",
      description: "Tailor the platform to fit your unique production process."
    },
    {
      icon: <Music2 className="h-12 w-12 mb-4 text-primary" />,
      title: "Beat Marketplace",
      description: "Sell your beats directly to clients through our platform."
    },
    {
      icon: <BookOpen className="h-12 w-12 mb-4 text-primary" />,
      title: "Professional Resources",
      description: "Access industry insights and educational content."
    }
  ];

  return (
    <section className="content-section">
      <div className="container mx-auto">
        <h2 className="section-title">More Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card">
              <CardContent className="p-6 text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreFeatures;