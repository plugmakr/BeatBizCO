import { Template } from "../../types/template";

export const minimalLightTemplate: Template = {
  id: "minimal-light",
  name: "Minimal Light",
  description: "Clean and minimalist design with light aesthetics",
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
        heading: "Elevate Your Sound",
        subheading: "Professional Beat Making & Music Production",
        ctaText: "Browse Collection",
        ctaUrl: "#beats",
        backgroundImage: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625"
      }
    },
    {
      type: "products",
      content: {
        heading: "Latest Releases",
        layout: "grid",
        itemsPerRow: 3,
        showFilters: true,
        showSort: true
      }
    },
    {
      type: "testimonials",
      content: {
        heading: "Artist Testimonials",
        testimonials: [
          {
            name: "Alex Thompson",
            role: "Recording Artist",
            content: "The quality and professionalism exceeded my expectations. Truly game-changing beats."
          },
          {
            name: "Sarah Martinez",
            role: "Independent Artist",
            content: "Working with this studio has taken my music to the next level. Incredible sound design."
          }
        ]
      }
    },
    {
      type: "contact",
      content: {
        heading: "Get in Touch",
        fields: ["name", "email", "message"],
        showSocials: true
      }
    }
  ],
  theme: {
    background: "bg-white",
    accent: "bg-gradient-to-r from-gray-200 to-gray-300"
  }
};