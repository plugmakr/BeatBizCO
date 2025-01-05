import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Download, Gift, Music2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const funnelTemplates = [
  {
    id: 1,
    name: "Beat Store Funnel",
    description: "Convert visitors into beat buyers with a proven sales funnel",
    icon: Music2,
    steps: [
      {
        name: "Landing Page",
        type: "landing",
        config: {
          heading: "Premium Beats for Serious Artists",
          subheading: "Professional Quality Production",
          ctaText: "Browse Beats",
          ctaUrl: "#beats"
        }
      },
      {
        name: "Beat Preview",
        type: "product-showcase",
        config: {
          layout: "grid",
          itemsPerRow: 3,
          showFilters: true
        }
      },
      {
        name: "Licensing Options",
        type: "pricing",
        config: {
          showComparison: true,
          highlightedPlan: "Premium"
        }
      },
      {
        name: "Checkout",
        type: "checkout",
        config: {
          acceptedPayments: ["stripe", "paypal"],
          showUpsells: true
        }
      }
    ],
    automations: [
      {
        name: "Abandoned Cart Recovery",
        triggerType: "cart_abandoned",
        actionType: "send_email",
        config: {
          delay: 3600, // 1 hour
          emailTemplate: "cart_recovery"
        }
      },
      {
        name: "Purchase Follow-up",
        triggerType: "purchase_completed",
        actionType: "send_email",
        config: {
          delay: 86400, // 24 hours
          emailTemplate: "thank_you"
        }
      }
    ],
    conversion: "12%"
  },
  {
    id: 2,
    name: "Free Download Funnel",
    description: "Grow your email list by offering a free beat or sample pack",
    icon: Download,
    steps: [
      {
        name: "Landing Page",
        type: "landing",
        config: {
          heading: "Get Your Free Beat Pack",
          subheading: "Premium Quality Beats, Zero Cost",
          ctaText: "Download Now",
          ctaUrl: "#download"
        }
      },
      {
        name: "Email Capture",
        type: "lead-capture",
        config: {
          fields: ["email", "name", "genre"],
          redirectUrl: "/thank-you"
        }
      },
      {
        name: "Download",
        type: "delivery",
        config: {
          fileType: "zip",
          downloadMethod: "direct"
        }
      },
      {
        name: "Upsell",
        type: "offer",
        config: {
          productType: "premium-pack",
          discount: 50
        }
      }
    ],
    automations: [
      {
        name: "Welcome Sequence",
        triggerType: "email_captured",
        actionType: "send_email_sequence",
        config: {
          sequence: "welcome_series",
          intervalDays: [0, 2, 5]
        }
      }
    ],
    conversion: "28%"
  },
  {
    id: 3,
    name: "Bundle Deal Funnel",
    description: "Increase average order value with strategic bundle offers",
    icon: Gift,
    steps: [
      {
        name: "Product Page",
        type: "product",
        config: {
          layout: "featured",
          showPricing: true
        }
      },
      {
        name: "Bundle Offer",
        type: "bundle",
        config: {
          bundleSize: 3,
          discount: 30
        }
      },
      {
        name: "Checkout",
        type: "checkout",
        config: {
          showTimer: true,
          acceptedPayments: ["stripe"]
        }
      },
      {
        name: "Thank You",
        type: "success",
        config: {
          downloadAccess: "immediate",
          showUpsell: true
        }
      }
    ],
    automations: [
      {
        name: "Bundle Timer Reminder",
        triggerType: "bundle_viewed",
        actionType: "send_email",
        config: {
          delay: 1800, // 30 minutes
          emailTemplate: "bundle_reminder"
        }
      }
    ],
    conversion: "18%"
  },
  {
    id: 4,
    name: "Producer Club Funnel",
    description: "Convert customers into monthly subscribers",
    icon: Users,
    steps: [
      {
        name: "Landing Page",
        type: "landing",
        config: {
          heading: "Join the Producer Club",
          subheading: "Exclusive Beats & Resources Monthly",
          ctaText: "Learn More",
          ctaUrl: "#benefits"
        }
      },
      {
        name: "Membership Benefits",
        type: "features",
        config: {
          layout: "grid",
          showTestimonials: true
        }
      },
      {
        name: "Pricing",
        type: "subscription",
        config: {
          plans: ["basic", "pro", "elite"],
          billingOptions: ["monthly", "yearly"]
        }
      },
      {
        name: "Registration",
        type: "signup",
        config: {
          requiredFields: ["name", "email", "password"],
          termsRequired: true
        }
      }
    ],
    automations: [
      {
        name: "Trial Ending Reminder",
        triggerType: "trial_ending",
        actionType: "send_email",
        config: {
          daysBeforeEnd: 3,
          emailTemplate: "trial_ending"
        }
      },
      {
        name: "Welcome to Club",
        triggerType: "subscription_started",
        actionType: "send_email",
        config: {
          delay: 0,
          emailTemplate: "welcome_to_club"
        }
      }
    ],
    conversion: "8%"
  }
];

export function FunnelTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const { toast } = useToast();

  const handleTemplateSelect = async (templateId: number) => {
    try {
      const template = funnelTemplates.find(t => t.id === templateId);
      if (!template) throw new Error("Template not found");

      // Get the current user's session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) throw new Error("No authenticated user found");

      // Create the funnel
      const { data: funnel, error: funnelError } = await supabase
        .from('funnels')
        .insert([{
          name: template.name,
          description: template.description,
          producer_id: session.user.id,
          status: 'draft'
        }])
        .select()
        .single();

      if (funnelError) throw funnelError;

      // Create the funnel steps
      const stepsPromises = template.steps.map((step, index) => {
        return supabase
          .from('funnel_steps')
          .insert({
            funnel_id: funnel.id,
            name: step.name,
            type: step.type,
            config: step.config,
            order_index: index
          });
      });

      await Promise.all(stepsPromises);

      // Create the automations
      const automationPromises = template.automations.map(automation => {
        return supabase
          .from('funnel_automations')
          .insert({
            funnel_id: funnel.id,
            name: automation.name,
            trigger_type: automation.triggerType,
            action_type: automation.actionType,
            config: automation.config
          });
      });

      await Promise.all(automationPromises);

      setSelectedTemplate(templateId);
      toast({
        title: "Template Applied",
        description: `${template.name} has been created successfully.`,
      });
    } catch (error) {
      console.error("Error applying template:", error);
      toast({
        title: "Error",
        description: "Failed to apply template",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {funnelTemplates.map((template) => (
        <Card 
          key={template.id}
          className={`cursor-pointer transition-all hover:border-primary ${
            selectedTemplate === template.id ? 'border-primary' : ''
          }`}
          onClick={() => handleTemplateSelect(template.id)}
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
                    {step.name}
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