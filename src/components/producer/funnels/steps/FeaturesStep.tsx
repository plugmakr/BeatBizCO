import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface FeaturesStepProps {
  config: {
    layout: string;
    showTestimonials: boolean;
  };
}

export function FeaturesStep({ config }: FeaturesStepProps) {
  const features = [
    "Weekly Beat Drops",
    "Exclusive Sample Packs",
    "Production Tutorials",
    "Private Discord Community",
    "1-on-1 Mentoring Sessions",
    "Project File Access"
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Card key={feature}>
            <CardContent className="flex items-center gap-3 p-4">
              <Check className="h-5 w-5 text-primary" />
              <span>{feature}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {config.showTestimonials && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <p className="italic">"Best investment in my music career"</p>
              <p className="text-sm text-muted-foreground mt-2">- John D.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="italic">"The community is incredible"</p>
              <p className="text-sm text-muted-foreground mt-2">- Sarah M.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}