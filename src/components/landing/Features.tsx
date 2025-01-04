import { 
  Briefcase, 
  DollarSign, 
  Users, 
  ChartBar, 
  Globe, 
  Music2 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <Briefcase className="h-12 w-12 mb-4 text-white" />,
      title: "Project Management",
      description: "Organize and track your music projects efficiently."
    },
    {
      icon: <DollarSign className="h-12 w-12 mb-4 text-white" />,
      title: "Financial Tools",
      description: "Manage your finances and royalties with ease."
    },
    {
      icon: <Users className="h-12 w-12 mb-4 text-white" />,
      title: "Client Management",
      description: "Keep track of clients and collaborations."
    },
    {
      icon: <ChartBar className="h-12 w-12 mb-4 text-white" />,
      title: "Analytics",
      description: "Gain insights into your music performance and audience."
    },
    {
      icon: <Globe className="h-12 w-12 mb-4 text-white" />,
      title: "Social Media Integration",
      description: "Manage your social media presence from one place."
    },
    {
      icon: <Music2 className="h-12 w-12 mb-4 text-white" />,
      title: "Marketing Tools",
      description: "Promote your music and grow your audience."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Features That Empower Your Music Career</h2>
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

export default Features;