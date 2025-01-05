import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Download, Gift, Music2, Users } from "lucide-react";

const funnelTemplates = [
  {
    id: 1,
    name: "Beat Store Funnel",
    description: "Convert visitors into beat buyers with a proven sales funnel",
    icon: Music2,
    steps: ["Landing Page", "Beat Preview", "Licensing Options", "Checkout"],
    conversion: "12%"
  },
  {
    id: 2,
    name: "Free Download Funnel",
    description: "Grow your email list by offering a free beat or sample pack",
    icon: Download,
    steps: ["Landing Page", "Email Capture", "Download", "Upsell"],
    conversion: "28%"
  },
  {
    id: 3,
    name: "Bundle Deal Funnel",
    description: "Increase average order value with strategic bundle offers",
    icon: Gift,
    steps: ["Product Page", "Bundle Offer", "Checkout", "Thank You"],
    conversion: "18%"
  },
  {
    id: 4,
    name: "Producer Club Funnel",
    description: "Convert customers into monthly subscribers",
    icon: Users,
    steps: ["Landing Page", "Membership Benefits", "Pricing", "Registration"],
    conversion: "8%"
  }
];

export function FunnelTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {funnelTemplates.map((template) => (
        <Card 
          key={template.id}
          className={`cursor-pointer transition-all hover:border-primary ${
            selectedTemplate === template.id ? 'border-primary' : ''
          }`}
          onClick={() => setSelectedTemplate(template.id)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <template.icon className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Avg. Conversion:</span>
                <span className="font-medium text-green-600">{template.conversion}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {template.steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="px-3 py-1 bg-muted rounded-md text-sm">
                    {step}
                  </div>
                  {index < template.steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}