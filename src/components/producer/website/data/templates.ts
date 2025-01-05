export const templates = [
  {
    id: "modern-dark",
    name: "Modern Dark",
    description: "A sleek, dark-themed layout with gradient accents",
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
          heading: "Premium Beats & Sound Kits",
          subheading: "Professional Quality for Serious Artists",
          ctaText: "Browse Beats",
          ctaUrl: "#beats",
          backgroundImage: ""
        }
      },
      {
        type: "products",
        content: {
          heading: "Featured Beats",
          itemsPerRow: 3,
          showFilters: true,
          showSort: true
        }
      }
    ],
    theme: {
      background: "bg-gray-900",
      accent: "bg-gradient-to-r from-purple-600 to-blue-500"
    }
  },
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Clean and minimalist design with light colors",
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
          heading: "Quality Beats for Quality Artists",
          subheading: "Take Your Music to the Next Level",
          ctaText: "Start Creating",
          ctaUrl: "#beats",
          backgroundImage: ""
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
            }
          ]
        }
      }
    ],
    theme: {
      background: "bg-gray-50",
      accent: "bg-gradient-to-r from-gray-200 to-gray-300"
    }
  },
  {
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
          subheading: "Premium Sound Design & Production",
          ctaText: "Listen Now",
          ctaUrl: "#player",
          backgroundImage: ""
        }
      },
      {
        type: "music-player",
        content: {
          heading: "Featured Tracks",
          playlist: []
        }
      }
    ],
    theme: {
      background: "bg-black",
      accent: "bg-gradient-to-r from-red-600 to-orange-400"
    }
  },
  {
    id: "pro-studio",
    name: "Pro Studio",
    description: "Professional layout for established producers",
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
          heading: "Professional Sound Design",
          subheading: "Industry Standard Production Tools",
          ctaText: "View Products",
          ctaUrl: "#products",
          backgroundImage: ""
        }
      },
      {
        type: "products",
        content: {
          heading: "Sound Library",
          itemsPerRow: 4,
          showFilters: true,
          showSort: true
        }
      }
    ],
    theme: {
      background: "bg-slate-900",
      accent: "bg-gradient-to-r from-emerald-500 to-teal-400"
    }
  },
  {
    id: "creative-hub",
    name: "Creative Hub",
    description: "Dynamic layout for creative producers",
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
          heading: "Unleash Your Creativity",
          subheading: "Professional Sound Design Tools",
          ctaText: "Start Creating",
          ctaUrl: "#products",
          backgroundImage: ""
        }
      },
      {
        type: "testimonials",
        content: {
          heading: "What Artists Say",
          testimonials: [
            {
              name: "John Doe",
              role: "Recording Artist",
              content: "The quality of these sounds is unmatched!"
            }
          ]
        }
      }
    ],
    theme: {
      background: "bg-indigo-900",
      accent: "bg-gradient-to-r from-pink-500 to-violet-500"
    }
  }
];