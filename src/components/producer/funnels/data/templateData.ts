import { Music2, Download, Gift, Users } from "lucide-react";

export interface FunnelStep {
  name: string;
  type: string;
  config: Record<string, any>;
}

export interface FunnelAutomation {
  name: string;
  triggerType: string;
  actionType: string;
  config: Record<string, any>;
}

export interface FunnelTemplate {
  id: number;
  name: string;
  description: string;
  icon: any;
  steps: FunnelStep[];
  automations: FunnelAutomation[];
  conversion: string;
}

export const funnelTemplates: FunnelTemplate[] = [
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
