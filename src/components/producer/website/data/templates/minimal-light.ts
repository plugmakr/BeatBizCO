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
          { label: "Home", url: "#" },
          { label: "About", url: "#about" },
          { label: "Services", url: "#services" },
          { label: "Beats", url: "#beats" },
          { label: "Contact", url: "#contact" }
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
      type: "services",
      content: {
        heading: "Services Offered",
        services: [
          {
            name: "Beat Production",
            price: "$299",
            description: "Custom beats tailored to your style"
          },
          {
            name: "Vocal Production",
            price: "$199",
            description: "Professional vocal recording and editing"
          },
          {
            name: "Audio Mixing",
            price: "$149",
            description: "Expert mixing for crystal clear sound"
          }
        ]
      }
    },
    {
      type: "music-player",
      content: {
        heading: "Latest Releases",
        playlist: [
          {
            id: "track-1",
            title: "Summer Vibes",
            bpm: 128,
            key: "Am",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
          },
          {
            id: "track-2",
            title: "Midnight Dreams",
            bpm: 95,
            key: "Fm",
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
          }
        ]
      }
    },
    {
      type: "testimonials",
      content: {
        heading: "Artist Testimonials",
        testimonials: [
          {
            name: "Michael Chen",
            role: "Hip Hop Artist",
            content: "The quality and attention to detail is unmatched. A game-changer for my production workflow."
          },
          {
            name: "Lisa Rodriguez",
            role: "R&B Singer",
            content: "Found my signature sound here. The professional approach exceeded expectations."
          }
        ]
      }
    },
    {
      type: "social",
      content: {
        title: "Follow Me",
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
        heading: "Work Together",
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