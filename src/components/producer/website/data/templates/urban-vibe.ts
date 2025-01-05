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
          { label: "Beats", url: "#beats" },
          { label: "Loop Kits", url: "#loops" },
          { label: "Sound Kits", url: "#sounds" },
          { label: "Drum Kits", url: "#drums" },
          { label: "Midi Kits", url: "#midi" },
          { label: "Services", url: "#services" },
          { label: "Licensing", url: "#licensing" }
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
      type: "social",
      content: {
        platforms: [
          { name: "Instagram", url: "#", icon: "Instagram" },
          { name: "YouTube", url: "#", icon: "Youtube" },
          { name: "Twitter", url: "#", icon: "Twitter" }
        ]
      }
    },
    {
      type: "booking",
      content: {
        heading: "Book Studio Time",
        description: "Reserve your session in our professional recording studio",
        showCalendar: true
      }
    }
  ],
  theme: {
    background: "bg-black",
    accent: "bg-gradient-to-r from-red-600 to-orange-400"
  }
};