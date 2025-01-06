import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  name: string;
  price: string;
  features: string[];
  current?: boolean;
}

export function SubscriptionPlan() {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  const fetchCurrentPlan = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('subscription_plan')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching subscription plan:', error);
        return;
      }

      setCurrentPlan(profile?.subscription_plan || 'CRM Only');
    } catch (error) {
      console.error('Error fetching subscription plan:', error);
    }
  };

  const plans: Plan[] = [
    {
      name: "CRM Only",
      price: "$15",
      features: [
        "Project management for up to 20 active projects",
        "Basic financial tracking",
        "Client management (up to 20 clients)",
        "Email support",
        "Website builder (1 website)",
        "Social media integration",
        "5GB cloud storage",
        "Funnel Builder (1 funnel)",
        "Basic Marketing tools"
      ]
    },
    {
      name: "Pro",
      price: "$30",
      features: [
        "Unlimited active projects",
        "Advanced financial tools",
        "Unlimited client management",
        "Priority support",
        "Website builder (3 websites)",
        "Advanced marketing tools",
        "50GB cloud storage",
        "Funnel builder (3 funnels)",
        "Beat Store integration"
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
        "Advanced analytics",
        "Unlimited websites",
        "500GB cloud storage",
        "White-label options",
        "Team collaboration"
      ]
    }
  ];

  const handleUpgrade = async (planName: string) => {
    // In a real application, this would integrate with a payment processor
    toast({
      title: "Subscription Update",
      description: "This would typically integrate with a payment processor. For now, it's just a demo.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={`relative ${currentPlan === plan.name ? 'border-primary' : ''}`}>
            {currentPlan === plan.name && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                Current Plan
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl text-center">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-center mt-2">
                {plan.price}<span className="text-sm font-normal">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full"
                variant={currentPlan === plan.name ? "outline" : "default"}
                onClick={() => handleUpgrade(plan.name)}
                disabled={currentPlan === plan.name}
              >
                {currentPlan === plan.name ? "Current Plan" : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}