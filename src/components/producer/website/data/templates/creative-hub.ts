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
        heading: "Unleash Your Creativity",
        subheading: "Your Vision, Our Sound",
        ctaText: "Start Creating",
        ctaUrl: "#create",
        backgroundImage: "https://images.unsplash.com/photo-1598520106830-8c45c2035460"
      }
    },
    {
      type: "services",
      content: {
        heading: "Creative Services",
        services: [
          {
            name: "Music Production",
            price: "from $299",
            description: "Full-service music production with a creative touch"
          },
          {
            name: "Sound Design",
            price: "from $199",
            description: "Custom sound design for your unique project"
          },
          {
            name: "Artist Development",
            price: "from $499",
            description: "Comprehensive artist development program"
          }
        ]
      }
    },
    {
      type: "music-player",
      content: {
        heading: "Latest Works",
        playlist: [
          {
            id: "track-1",
            title: "Creative Flow",
            bpm: 125,
            key: "Cm",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
          },
          {
            id: "track-2",
            title: "Artistic Vision",
            bpm: 135,
            key: "Gm",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-178.mp3"
          }
        ]
      }
    },
    {
      type: "licensing",
      content: {
        heading: "Licensing Plans",
        licenses: [
          {
            name: "Creator License",
            price: "$59.99",
            features: ["High-Quality Files", "Social Media Use", "Monetization Rights"]
          },
          {
            name: "Professional",
            price: "$299.99",
            features: ["All Audio Formats", "Commercial Use", "Unlimited Revenue"]
          },
          {
            name: "Enterprise",
            price: "$799.99",
            features: ["Exclusive Rights", "Source Files", "Full Ownership"]
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
      type: "social",
      content: {
        title: "Join Our Creative Community",
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
        heading: "Let's Create Together",
        fields: ["name", "email", "project-type", "vision", "budget"],
        showSocials: true
      }
    }
  ],
  theme: {
    background: "bg-indigo-900",
    accent: "bg-gradient-to-r from-pink-500 to-violet-500"
  }
};