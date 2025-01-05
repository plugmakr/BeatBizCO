import { Template } from "../../types/template";

export const modernDarkTemplate: Template = {
  id: "modern-dark",
  name: "Modern Dark Studio",
  description: "A premium dark theme with gradient accents and modern aesthetics",
  thumbnail: "/placeholder.svg",
  blocks: [
    {
      type: "navigation",
      content: {
        links: [
          { label: "Home", url: "#" },
          { label: "Services", url: "#services" },
          { label: "Beats", url: "#beats" },
          { label: "Licensing", url: "#licensing" },
          { label: "Testimonials", url: "#testimonials" },
          { label: "Contact", url: "#contact" }
        ]
      }
    },
    {
      type: "hero",
      content: {
        heading: "Premium Beats & Sound Design",
        subheading: "Crafting the Future of Sound",
        ctaText: "Explore Beats",
        ctaUrl: "#beats",
        backgroundImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
      }
    },
    {
      type: "services",
      content: {
        heading: "Professional Services",
        services: [
          {
            name: "Custom Beat Production",
            price: "from $500",
            description: "Tailored beats crafted to your unique style and vision"
          },
          {
            name: "Mixing & Mastering",
            price: "from $300",
            description: "Professional audio engineering to perfect your sound"
          },
          {
            name: "Sound Design",
            price: "from $200",
            description: "Custom sound kits and audio elements"
          }
        ]
      }
    },
    {
      type: "music-player",
      content: {
        heading: "Featured Tracks",
        artistName: "Your Studio Name",
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
      type: "licensing",
      content: {
        heading: "Licensing Options",
        licenses: [
          {
            name: "Basic License",
            price: "$29.99",
            features: ["MP3 File", "5000 Streams", "Non-Profit Use"]
          },
          {
            name: "Premium License",
            price: "$99.99",
            features: ["WAV File", "Unlimited Streams", "Commercial Use"]
          },
          {
            name: "Exclusive Rights",
            price: "$499.99",
            features: ["All Files", "Full Ownership", "Unlimited Use"]
          }
        ]
      }
    },
    {
      type: "testimonials",
      content: {
        heading: "What Artists Say",
        testimonials: [
          {
            name: "Alex Thompson",
            role: "Recording Artist",
            content: "Working with this studio transformed my sound completely. The quality and professionalism exceeded all expectations."
          },
          {
            name: "Sarah Martinez",
            role: "Independent Artist",
            content: "The beats are incredible and the service is top-notch. Highly recommend for any serious artist."
          }
        ]
      }
    },
    {
      type: "social",
      content: {
        title: "Connect With Me",
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
        heading: "Get in Touch",
        fields: ["name", "email", "project-type", "message"],
        showSocials: true
      }
    }
  ],
  theme: {
    background: "bg-gray-900",
    accent: "bg-gradient-to-r from-purple-600 to-blue-500"
  }
};