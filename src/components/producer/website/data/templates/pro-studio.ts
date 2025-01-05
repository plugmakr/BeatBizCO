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
          { label: "Home", url: "#" },
          { label: "Services", url: "#services" },
          { label: "Portfolio", url: "#portfolio" },
          { label: "Licensing", url: "#licensing" },
          { label: "Contact", url: "#contact" }
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
      type: "music-player",
      content: {
        heading: "Recent Productions",
        playlist: [
          {
            id: "track-1",
            title: "Studio Magic",
            bpm: 128,
            key: "Am",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
          },
          {
            id: "track-2",
            title: "Professional Touch",
            bpm: 140,
            key: "Gm",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-178.mp3"
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
    },
    {
      type: "testimonials",
      content: {
        heading: "Client Success Stories",
        testimonials: [
          {
            name: "David Lee",
            role: "Professional Artist",
            content: "The level of professionalism and quality here is unmatched. Every session exceeds expectations."
          },
          {
            name: "Emma Thompson",
            role: "Recording Artist",
            content: "Found my signature sound here. The team's expertise made all the difference."
          }
        ]
      }
    },
    {
      type: "social",
      content: {
        title: "Follow Our Journey",
        platforms: [
          { name: "Instagram", url: "#" },
          { name: "YouTube", url: "#" },
          { name: "Twitter", url: "#" }
        ]
      }
    },
    {
      type: "contact",
      content: {
        heading: "Start Your Project",
        fields: ["name", "email", "budget", "project-details"],
        showSocials: true
      }
    }
  ],
  theme: {
    background: "bg-slate-900",
    accent: "bg-gradient-to-r from-emerald-500 to-teal-400"
  }
};