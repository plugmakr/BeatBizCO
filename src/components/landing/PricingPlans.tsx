import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const PricingPlans = () => {
  const plans = [
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

  return (
    <section className="bg-[#4834d4]/10 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="bg-card text-card-foreground border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-center mt-4">
                  {plan.price}<span className="text-lg opacity-70">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white">Get Started</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;