import { Template } from "../../types/template";

export const creativeHubTemplate: Template = {
  id: "creative-hub",
  name: "Creative Hub",
  description: "Dynamic layout for creative producers",
  thumbnail: "/placeholder.svg",
  blocks: [
    {
      id: "nav-5",
      type: "navigation",
      content: {
        links: [
          { label: "Home", url: "#" },
          { label: "Studio", url: "#studio" },
          { label: "Beats", url: "#beats" },
          { label: "Collabs", url: "#collabs" },
          { label: "Contact", url: "#contact" }
        ]
      }
    },
    {
      id: "hero-5",
      type: "hero",
      content: {
        heading: "Unleash Your Creativity",
        subheading: "Where Music Comes to Life",
        ctaText: "Start Creating",
        ctaUrl: "#studio",
        backgroundImage: "https://images.unsplash.com/photo-1598520106830-8c45c2035460"
      }
    },
    {
      id: "services-5",
      type: "services",
      content: {
        heading: "Creative Services",
        services: [
          {
            name: "Music Production",
            price: "$699",
            description: "Full service music production and arrangement"
          },
          {
            name: "Collaboration",
            price: "$399",
            description: "Work together on your next hit"
          },
          {
            name: "Sound Design",
            price: "$299",
            description: "Custom sound design for your project"
          }
        ]
      }
    },
    {
      id: "music-player-5",
      type: "music-player",
      content: {
        heading: "Featured Works",
        playlist: [
          {
            id: "track-1",
            title: "Creative Flow",
            bpm: 125,
            key: "Am",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
          },
          {
            id: "track-2",
            title: "Artistic Vision",
            bpm: 140,
            key: "Fm",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-178.mp3"
          }
        ]
      }
    },
    {
      id: "licensing-5",
      type: "licensing",
      content: {
        heading: "License Your Music",
        licenses: [
          {
            name: "Creator License",
            price: "$59.99",
            features: ["WAV File", "Online Use", "Content Creation"]
          },
          {
            name: "Artist License",
            price: "$199.99",
            features: ["All Formats", "Commercial Use", "Performance Rights"]
          },
          {
            name: "Master License",
            price: "$599.99",
            features: ["Exclusive Rights", "Full Ownership", "Custom Terms"]
          }
        ]
      }
    },
    {
      id: "testimonials-5",
      type: "testimonials",
      content: {
        heading: "Creator Feedback",
        testimonials: [
          {
            name: "Chris Zhang",
            role: "Content Creator",
            content: "The creative process and results exceeded my expectations."
          },
          {
            name: "Maya Patel",
            role: "Independent Artist",
            content: "Found my sound and developed my style working together."
          }
        ]
      }
    },
    {
      id: "social-5",
      type: "social",
      content: {
        title: "Join the Community",
        platforms: [
          { name: "Instagram", url: "#" },
          { name: "YouTube", url: "#" },
          { name: "Twitter", url: "#" }
        ]
      }
    },
    {
      id: "contact-5",
      type: "contact",
      content: {
        heading: "Let's Create Together",
        fields: ["name", "email", "project-type", "inspiration", "message"],
        showSocials: true
      }
    }
  ],
  theme: {
    background: "bg-indigo-900",
    accent: "bg-gradient-to-r from-pink-500 to-violet-500"
  }
};