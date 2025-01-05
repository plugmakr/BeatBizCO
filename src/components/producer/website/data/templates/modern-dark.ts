import { Template } from "../../types/template";

export const modernDarkTemplate: Template = {
  id: "modern-dark",
  name: "Modern Dark",
  description: "A sleek, dark-themed layout with gradient accents",
  thumbnail: "/placeholder.svg",
  blocks: [
    {
      id: "nav-1",
      type: "navigation",
      content: {
        links: [
          { label: "Home", url: "#" },
          { label: "Beats", url: "#beats" },
          { label: "Services", url: "#services" },
          { label: "Licensing", url: "#licensing" },
          { label: "Contact", url: "#contact" }
        ]
      }
    },
    {
      id: "hero-1",
      type: "hero",
      content: {
        heading: "Premium Beats & Sound Design",
        subheading: "Professional Quality for Serious Artists",
        ctaText: "Listen to Beats",
        ctaUrl: "#beats",
        backgroundImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
      }
    },
    {
      id: "music-player-1",
      type: "music-player",
      content: {
        heading: "Featured Tracks",
        playlist: [
          {
            id: "track-1",
            title: "Urban Night",
            bpm: 140,
            key: "Am",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
          },
          {
            id: "track-2",
            title: "City Lights",
            bpm: 128,
            key: "Cm",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-178.mp3"
          }
        ]
      }
    },
    {
      id: "services-1",
      type: "services",
      content: {
        heading: "Production Services",
        services: [
          {
            name: "Custom Beat Production",
            price: "$499",
            description: "Get a unique beat tailored to your style and vision"
          },
          {
            name: "Mixing & Mastering",
            price: "$299",
            description: "Professional mix and master for your tracks"
          },
          {
            name: "Sound Design",
            price: "$199",
            description: "Custom sound design for your productions"
          }
        ]
      }
    },
    {
      id: "licensing-1",
      type: "licensing",
      content: {
        heading: "License Options",
        licenses: [
          {
            name: "Basic License",
            price: "$29.99",
            features: ["MP3 File", "100k Streams", "Non-Profit Use"]
          },
          {
            name: "Premium License",
            price: "$99.99",
            features: ["WAV + MP3", "500k Streams", "Commercial Use"]
          },
          {
            name: "Unlimited License",
            price: "$299.99",
            features: ["All Formats", "Unlimited Streams", "Full Rights"]
          }
        ]
      }
    },
    {
      id: "testimonials-1",
      type: "testimonials",
      content: {
        heading: "What Artists Say",
        testimonials: [
          {
            name: "Alex Thompson",
            role: "Recording Artist",
            content: "The quality and professionalism are unmatched. Best producer I've worked with."
          },
          {
            name: "Sarah Chen",
            role: "Independent Artist",
            content: "These beats have taken my music to the next level. Highly recommended!"
          }
        ]
      }
    },
    {
      id: "social-1",
      type: "social",
      content: {
        title: "Follow the Journey",
        platforms: [
          { name: "Instagram", url: "#" },
          { name: "YouTube", url: "#" },
          { name: "Twitter", url: "#" }
        ]
      }
    },
    {
      id: "contact-1",
      type: "contact",
      content: {
        heading: "Get in Touch",
        fields: ["name", "email", "message"],
        showSocials: true
      }
    }
  ],
  theme: {
    background: "bg-gray-900",
    accent: "bg-gradient-to-r from-purple-600 to-blue-500"
  }
};