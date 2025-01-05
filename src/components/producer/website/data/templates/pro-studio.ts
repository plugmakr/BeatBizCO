import { Template } from "../../types/template";

export const proStudioTemplate: Template = {
  id: "pro-studio",
  name: "Pro Studio",
  description: "Professional layout for established producers",
  thumbnail: "/placeholder.svg",
  blocks: [
    {
      id: "nav-4",
      type: "navigation",
      content: {
        links: [
          { label: "Home", url: "#" },
          { label: "Production", url: "#production" },
          { label: "Portfolio", url: "#portfolio" },
          { label: "Services", url: "#services" },
          { label: "Contact", url: "#contact" }
        ]
      }
    },
    {
      id: "hero-4",
      type: "hero",
      content: {
        heading: "Professional Sound Design",
        subheading: "Industry Standard Production Tools",
        ctaText: "View Portfolio",
        ctaUrl: "#portfolio",
        backgroundImage: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847"
      }
    },
    {
      id: "services-4",
      type: "services",
      content: {
        heading: "Professional Services",
        services: [
          {
            name: "Full Production",
            price: "$1999",
            description: "Complete song production from concept to master"
          },
          {
            name: "Beat Production",
            price: "$799",
            description: "Professional beat making with premium sounds"
          },
          {
            name: "Mixing Service",
            price: "$499",
            description: "Professional mixing for your tracks"
          }
        ]
      }
    },
    {
      id: "music-player-4",
      type: "music-player",
      content: {
        heading: "Recent Work",
        playlist: [
          {
            id: "track-1",
            title: "Studio Magic",
            bpm: 128,
            key: "Dm",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
          },
          {
            id: "track-2",
            title: "Pro Level",
            bpm: 140,
            key: "Gm",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-178.mp3"
          }
        ]
      }
    },
    {
      id: "licensing-4",
      type: "licensing",
      content: {
        heading: "License Options",
        licenses: [
          {
            name: "Standard",
            price: "$79.99",
            features: ["WAV File", "500k Streams", "Music Video Rights"]
          },
          {
            name: "Professional",
            price: "$299.99",
            features: ["WAV + Stems", "Unlimited Streams", "Broadcast Rights"]
          },
          {
            name: "Enterprise",
            price: "$999.99",
            features: ["Full Rights", "Custom Terms", "Priority Support"]
          }
        ]
      }
    },
    {
      id: "testimonials-4",
      type: "testimonials",
      content: {
        heading: "Industry Feedback",
        testimonials: [
          {
            name: "David Miller",
            role: "Grammy Nominated Artist",
            content: "The production quality and professionalism are world-class."
          },
          {
            name: "Lisa Wang",
            role: "Label Executive",
            content: "Consistently delivers outstanding results for our artists."
          }
        ]
      }
    },
    {
      id: "social-4",
      type: "social",
      content: {
        title: "Professional Network",
        platforms: [
          { name: "Instagram", url: "#" },
          { name: "YouTube", url: "#" },
          { name: "Twitter", url: "#" }
        ]
      }
    },
    {
      id: "contact-4",
      type: "contact",
      content: {
        heading: "Start Your Project",
        fields: ["name", "email", "company", "budget", "project-details"],
        showSocials: true
      }
    }
  ],
  theme: {
    background: "bg-slate-900",
    accent: "bg-gradient-to-r from-emerald-500 to-teal-400"
  }
};