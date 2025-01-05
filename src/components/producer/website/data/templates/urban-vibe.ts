import { Template } from "../../types/template";

export const urbanVibeTemplate: Template = {
  id: "urban-vibe",
  name: "Urban Vibe",
  description: "Bold and energetic design for urban producers",
  thumbnail: "/placeholder.svg",
  blocks: [
    {
      id: "nav-3",
      type: "navigation",
      content: {
        links: [
          { label: "Home", url: "#" },
          { label: "Tracks", url: "#tracks" },
          { label: "Studio", url: "#studio" },
          { label: "Shop", url: "#shop" },
          { label: "Contact", url: "#contact" }
        ]
      }
    },
    {
      id: "hero-3",
      type: "hero",
      content: {
        heading: "Next Level Beats",
        subheading: "Premium Sound Design & Production",
        ctaText: "Start Creating",
        ctaUrl: "#tracks",
        backgroundImage: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1"
      }
    },
    {
      id: "music-player-3",
      type: "music-player",
      content: {
        heading: "Hot Tracks",
        playlist: [
          {
            id: "track-1",
            title: "Street Dreams",
            bpm: 145,
            key: "Fm",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3"
          },
          {
            id: "track-2",
            title: "Urban Flow",
            bpm: 130,
            key: "Am",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-178.mp3"
          }
        ]
      }
    },
    {
      id: "services-3",
      type: "services",
      content: {
        heading: "Studio Services",
        services: [
          {
            name: "Beat Production",
            price: "$599",
            description: "Custom beats with your signature sound"
          },
          {
            name: "Studio Time",
            price: "$99/hr",
            description: "Professional recording studio sessions"
          },
          {
            name: "Artist Development",
            price: "$999",
            description: "Complete artist development program"
          }
        ]
      }
    },
    {
      id: "licensing-3",
      type: "licensing",
      content: {
        heading: "Beat Licenses",
        licenses: [
          {
            name: "Basic",
            price: "$39.99",
            features: ["MP3 File", "100k Streams", "Non-Profit"]
          },
          {
            name: "Premium",
            price: "$149.99",
            features: ["WAV + Stems", "1M Streams", "Commercial Use"]
          },
          {
            name: "Exclusive",
            price: "$499.99",
            features: ["Full Rights", "Unlimited", "Remove from Store"]
          }
        ]
      }
    },
    {
      id: "testimonials-3",
      type: "testimonials",
      content: {
        heading: "Artist Reviews",
        testimonials: [
          {
            name: "Jay Wilson",
            role: "Hip-Hop Artist",
            content: "These beats are straight fire! Best production quality I've found."
          },
          {
            name: "Maria Rodriguez",
            role: "R&B Singer",
            content: "The studio sessions are professional and the results are amazing."
          }
        ]
      }
    },
    {
      id: "social-3",
      type: "social",
      content: {
        title: "Stay Connected",
        platforms: [
          { name: "Instagram", url: "#" },
          { name: "YouTube", url: "#" },
          { name: "Twitter", url: "#" }
        ]
      }
    },
    {
      id: "contact-3",
      type: "contact",
      content: {
        heading: "Book a Session",
        fields: ["name", "email", "phone", "project-details", "message"],
        showSocials: true
      }
    }
  ],
  theme: {
    background: "bg-black",
    accent: "bg-gradient-to-r from-red-600 to-orange-400"
  }
};