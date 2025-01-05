import { Template } from "../../types/template";

export const urbanVibeTemplate: Template = {
  id: "urban-vibe",
  name: "Urban Vibe",
  description: "Bold and energetic design for urban producers",
  thumbnail: "/placeholder.svg",
  blocks: [
    {
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
      type: "hero",
      content: {
        heading: "Next Level Beats",
        subheading: "Creating Hits, Defining Sound",
        ctaText: "Start Listening",
        ctaUrl: "#player",
        backgroundImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
      }
    },
    {
      type: "music-player",
      content: {
        heading: "Featured Tracks",
        artistName: "Studio Name",
        playlist: [
          {
            id: "track-1",
            title: "Street Dreams",
            bpm: 145,
            key: "Gm",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-178.mp3"
          },
          {
            id: "track-2",
            title: "Urban Flow",
            bpm: 130,
            key: "Am",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
          }
        ]
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
          }
        ]
      }
    },
    {
      type: "licensing",
      content: {
        heading: "License Your Beat",
        licenses: [
          {
            name: "Basic",
            price: "$39.99",
            features: ["MP3 File", "Limited Streams", "Personal Use"]
          },
          {
            name: "Premium",
            price: "$149.99",
            features: ["WAV + MP3", "Unlimited Streams", "Commercial Rights"]
          },
          {
            name: "Exclusive",
            price: "$599.99",
            features: ["Full Rights", "Source Files", "Commercial Use"]
          }
        ]
      }
    },
    {
      type: "testimonials",
      content: {
        heading: "Artist Reviews",
        testimonials: [
          {
            name: "James Wilson",
            role: "Rap Artist",
            content: "These beats are fire! The quality and creativity is next level."
          },
          {
            name: "Maria Garcia",
            role: "Producer",
            content: "Best studio experience I've had. Professional and talented team."
          }
        ]
      }
    },
    {
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
      type: "contact",
      content: {
        heading: "Book a Session",
        fields: ["name", "email", "phone", "project-details"],
        showSocials: true
      }
    }
  ],
  theme: {
    background: "bg-black",
    accent: "bg-gradient-to-r from-red-600 to-orange-400"
  }
};