import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PricingPlans = () => {
  const producerPlans = [
    {
      name: "CRM Only",
      price: "$15",
      features: [
        "Project management for up to 20 active projects",
        "Basic financial tracking",
        "Client management (up to 20 clients)",
        "Email support",
        "Website builder (1 website)",
        "Social media integration (Instagram, YouTube, TikTok)",
        "5GB cloud storage",
        "Funnel Builder (1 funnel)",
        "Basic Marketing and Promotion tools"
      ]
    },
    {
      name: "Pro",
      price: "$30",
      features: [
        "Unlimited active projects",
        "Advanced financial tools and reporting",
        "Unlimited client management",
        "Priority email and chat support",
        "Website builder (3 websites)",
        "Social media integration (all major platforms)",
        "Marketing and promotion tools",
        "Funnel builder (3 funnels)",
        "50GB cloud storage",
        "Collaboration tools",
        "Beat Store"
      ]
    },
    {
      name: "Enterprise",
      price: "$100",
      features: [
        "All Pro features",
        "24/7 priority support",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced analytics and insights",
        "Unlimited websites",
        "Unlimited funnels",
        "White-label options",
        "500GB cloud storage",
        "Team collaboration features",
        "Beat Store"
      ]
    }
  ];

  const artistPlans = [
    {
      name: "Basic",
      price: "$9",
      features: [
        "Artist profile page",
        "Music upload (up to 20 tracks)",
        "Basic analytics",
        "Fan messaging",
        "Email support",
        "Social media integration",
        "5GB storage",
        "Basic promotion tools",
        "Digital downloads"
      ]
    },
    {
      name: "Pro Artist",
      price: "$19",
      features: [
        "Custom artist website",
        "Unlimited music uploads",
        "Advanced analytics",
        "Priority support",
        "Merch store integration",
        "Email marketing tools",
        "50GB storage",
        "Advanced promotion tools",
        "Digital and physical sales",
        "Customizable EPK",
        "Fan subscription features"
      ]
    },
    {
      name: "Label",
      price: "$49",
      features: [
        "All Pro Artist features",
        "Multiple artist management",
        "Revenue splitting",
        "Label analytics dashboard",
        "Unlimited storage",
        "White-label option",
        "Priority support",
        "Custom integrations",
        "Advanced reporting",
        "Team management",
        "Distribution services"
      ]
    }
  ];

  return (
    <section className="content-section bg-secondary/50 backdrop-blur-md">
      <div className="container mx-auto">
        <h2 className="section-title">Choose Your Plan</h2>
        
        <Tabs defaultValue="producer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
            <TabsTrigger value="producer" className="text-lg">Producers</TabsTrigger>
            <TabsTrigger value="artist" className="text-lg">Artists</TabsTrigger>
          </TabsList>

          <TabsContent value="producer" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8">
              {producerPlans.map((plan, index) => (
                <Card key={index} className="glass-card hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center text-white">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-center mt-4 text-primary">
                      {plan.price}<span className="text-lg text-white/80">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="artist" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8">
              {artistPlans.map((plan, index) => (
                <Card key={index} className="glass-card hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center text-white">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-center mt-4 text-primary">
                      {plan.price}<span className="text-lg text-white/80">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PricingPlans;