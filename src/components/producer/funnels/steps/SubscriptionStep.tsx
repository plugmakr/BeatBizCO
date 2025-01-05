import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface SubscriptionStepProps {
  config: {
    plans: string[];
    billingOptions: string[];
  };
}

export function SubscriptionStep({ config }: SubscriptionStepProps) {
  const planFeatures = {
    basic: ["5 Beats/Month", "MP3 Downloads", "Basic Support"],
    pro: ["15 Beats/Month", "WAV + MP3", "Priority Support", "Stem Access"],
    elite: ["Unlimited Beats", "All Formats", "24/7 Support", "Custom Requests"]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4 mb-8">
        {config.billingOptions.map((option) => (
          <Button
            key={option}
            variant={option === "monthly" ? "default" : "outline"}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {config.plans.map((plan) => (
          <Card key={plan}>
            <CardHeader>
              <CardTitle>{plan.charAt(0).toUpperCase() + plan.slice(1)}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {planFeatures[plan as keyof typeof planFeatures].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Choose Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}