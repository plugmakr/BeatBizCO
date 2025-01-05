import { Template } from "../../types/template";

export const minimalLightTemplate: Template = {
  id: "minimal-light",
  name: "Minimal Light",
  description: "Clean and minimalist design with light colors",
  thumbnail: "/placeholder.svg",
  blocks: [
    {
      type: "navigation",
      content: {
        links: [
          { label: "Home", url: "#" },
          { label: "Music", url: "#music" },
          { label: "Services", url: "#services" },
          { label: "About", url: "#about" },
          { label: "Contact", url: "#contact" }
        ]
      }
    },
    {
      type: "hero",
      content: {
        heading: "Crafting Sonic Excellence",
        subheading: "Premium Beats & Professional Production",
        ctaText: "Explore Music",
        ctaUrl: "#music",
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
            price: "From $399",
            description: "Custom beats crafted to your specifications"
          },
          {
            name: "Vocal Production",
            price: "From $299",
            description: "Professional vocal recording and production"
          },
          {
            name: "Audio Engineering",
            price: "From $199",
            description: "Expert mixing and mastering services"
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
            title: "Summer Breeze",
            bpm: 95,
            key: "Gm",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
          },
          {
            id: "track-2",
            title: "Midnight Drive",
            bpm: 128,
            key: "Em",
            audioUrl: "https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3"
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
            name: "Standard License",
            price: "$49.99",
            features: ["WAV File", "250k Streams", "Music Video Use"]
          },
          {
            name: "Premium Rights",
            price: "$199.99",
            features: ["All Formats", "Unlimited Streams", "Broadcasting Rights"]
          }
        ]
      }
    },
    {
      type: "testimonials",
      content: {
        heading: "Client Feedback",
        testimonials: [
          {
            name: "Michael Roberts",
            role: "Professional Artist",
            content: "The attention to detail and quality is exceptional."
          },
          {
            name: "Emma Davis",
            role: "Singer-Songwriter",
            content: "Working together has been an amazing experience."
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
        heading: "Work Together",
        fields: ["name", "email", "project-type", "message"],
        showSocials: false
      }
    }
  ],
  theme: {
    background: "bg-gray-50",
    accent: "bg-gradient-to-r from-gray-200 to-gray-300"
  }
};