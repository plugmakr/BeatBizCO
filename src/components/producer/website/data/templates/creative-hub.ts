import { Template } from "../../types/template";

export const creativeHubTemplate: Template = {
  id: "creative-hub",
  name: "Creative Hub",
  description: "Dynamic layout for creative producers",
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
        heading: "Unleash Your Creativity",
        subheading: "Your Vision, Our Sound",
        ctaText: "Start Creating",
        ctaUrl: "#create",
        backgroundImage: "https://images.unsplash.com/photo-1598520106830-8c45c2035460"
      }
    },
    {
      type: "products",
      content: {
        heading: "Sound Collection",
        layout: "grid",
        itemsPerRow: 4,
        showFilters: true,
        showSort: true
      }
    },
    {
      type: "testimonials",
      content: {
        heading: "Client Success Stories",
        testimonials: [
          {
            name: "Michael Chen",
            role: "Producer",
            content: "The quality of sounds and attention to detail is unmatched. A game-changer for my production workflow."
          },
          {
            name: "Lisa Rodriguez",
            role: "Artist",
            content: "Found my signature sound here. The professional approach and quality of work exceeded expectations."
          },
          {
            name: "James Wilson",
            role: "Sound Designer",
            content: "These sound kits have become essential tools in my creative process. Exceptional quality."
          }
        ]
      }
    },
    {
      type: "contact",
      content: {
        heading: "Connect With Us",
        fields: ["name", "email", "project-type", "message"],
        showSocials: true
      }
    }
  ],
  theme: {
    background: "bg-indigo-900",
    accent: "bg-gradient-to-r from-pink-500 to-violet-500"
  }
};