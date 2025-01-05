import { Template } from "../../types/template";

export const proStudioTemplate: Template = {
  id: "pro-studio",
  name: "Pro Studio",
  description: "Professional layout for established producers",
  thumbnail: "/placeholder.svg",
  blocks: [
    {
      type: "navigation",
      content: {
        links: [
          { label: "Beats", url: "#beats" },
          { label: "Loop Kits", url: "#loops" },
          { label: "Sound Kits", url: "#sounds" },
          { label: "Drum Kits", url: "#drums" },
          { label: "Midi Kits", url: "#midi" },
          { label: "Services", url: "#services" },
          { label: "Licensing", url: "#licensing" }
        ]
      }
    },
    {
      type: "hero",
      content: {
        heading: "Professional Sound Design",
        subheading: "Where Quality Meets Creativity",
        ctaText: "Explore Catalog",
        ctaUrl: "#catalog",
        backgroundImage: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7"
      }
    },
    {
      type: "services",
      content: {
        heading: "Studio Services",
        services: [
          {
            name: "Beat Production",
            price: "Custom Quote",
            description: "Professional beat making with industry-standard equipment"
          },
          {
            name: "Recording Sessions",
            price: "from $100/hr",
            description: "State-of-the-art recording studio with experienced engineers"
          },
          {
            name: "Sound Design",
            price: "Custom Quote",
            description: "Custom sound design for your unique needs"
          }
        ]
      }
    },
    {
      type: "licensing",
      content: {
        heading: "License Options",
        licenses: [
          {
            name: "Standard License",
            price: "$49.99",
            features: ["MP3 & WAV Files", "10,000 Streams", "Non-Profit Use"]
          },
          {
            name: "Premium License",
            price: "$199.99",
            features: ["All Audio Files", "Unlimited Streams", "Commercial Use"]
          },
          {
            name: "Exclusive Rights",
            price: "$999.99",
            features: ["Full Ownership", "Source Files", "Unlimited Usage"]
          }
        ]
      }
    }
  ],
  theme: {
    background: "bg-slate-900",
    accent: "bg-gradient-to-r from-emerald-500 to-teal-400"
  }
};