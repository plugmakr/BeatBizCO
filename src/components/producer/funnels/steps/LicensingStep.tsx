import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface LicensingStepProps {
  config: {
    showComparison: boolean;
    highlightedPlan: string;
  };
}

export function LicensingStep({ config }: LicensingStepProps) {
  const licenses = [
    {
      name: "Basic",
      price: 29.99,
      features: ["MP3 File", "100k Streams", "Non-Profit Use"],
    },
    {
      name: "Premium",
      price: 99.99,
      features: ["WAV + MP3 Files", "Unlimited Streams", "Commercial Use"],
    },
    {
      name: "Exclusive",
      price: 499.99,
      features: ["All Files", "Full Ownership", "Unlimited Use"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {licenses.map((license) => (
        <Card
          key={license.name}
          className={
            config.highlightedPlan === license.name
              ? "border-primary shadow-lg"
              : undefined
          }
        >
          <CardHeader>
            <CardTitle>{license.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-6">${license.price}</div>
            <ul className="space-y-2">
              {license.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Select License</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}