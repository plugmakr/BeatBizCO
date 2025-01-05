interface MusicPlayerPreviewProps {
  content: any;
}

export const MusicPlayerPreview = ({ content }: MusicPlayerPreviewProps) => {
  const tracks = [
    {
      id: "track-1",
      title: "Summer Vibes",
      bpm: 128,
      key: "Am",
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
    },
    {
      id: "track-2", 
      title: "Night Drive",
      bpm: 95,
      key: "Fm",
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-178.mp3"
    },
    {
      id: "track-3",
      title: "Urban Flow",
      bpm: 140,
      key: "Gm",
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3"
    },
    {
      id: "track-4",
      title: "Chill Wave",
      bpm: 85,
      key: "Cm",
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
    },
    {
      id: "track-5",
      title: "Street Dreams",
      bpm: 110,
      key: "Em",
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3"
    }
  ];

  const currentTrack = tracks[0];

  return `
    <div class="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 p-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
            <button class="rounded-full p-2 bg-white/10 hover:bg-white/20 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
            <div class="text-white">
              <h3 class="font-semibold">${currentTrack.title}</h3>
              <div class="flex items-center gap-2 text-sm text-white/60">
                <span>${currentTrack.bpm} BPM</span>
                <span>Key: ${currentTrack.key}</span>
              </div>
            </div>
          </div>
          <div class="flex-1 mx-8">
            <div class="relative w-full h-12">
              <div class="absolute inset-0 opacity-50">
                <svg viewBox="0 0 1000 200" class="w-full h-full text-white/20">
                  <path d="M0 100 Q 250 50, 500 100 T 1000 100" stroke="currentColor" fill="none" stroke-width="2"/>
                  <path d="M0 100 Q 250 150, 500 100 T 1000 100" stroke="currentColor" fill="none" stroke-width="2"/>
                </svg>
              </div>
              <div class="absolute bottom-0 left-0 right-0">
                <div class="w-1/2 h-1 bg-white/20 rounded-full">
                  <div class="w-1/3 h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button class="text-white hover:text-white/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button class="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
        <div class="grid grid-cols-5 gap-4">
          ${tracks.map(track => `
            <div class="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <a href="#/tracks/${track.id}" class="text-white hover:text-white/80">
                <h4 class="font-medium text-sm">${track.title}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs text-white/60">${track.bpm} BPM</span>
                  <span class="text-xs text-white/60">Key: ${track.key}</span>
                </div>
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
};