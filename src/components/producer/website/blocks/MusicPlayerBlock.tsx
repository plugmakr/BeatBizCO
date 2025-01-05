export const MusicPlayerBlock = ({ content }: { content: any }) => {
  const tracks = content.playlist || [];
  
  return `
    <section class="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-white">${content.heading || "Featured Tracks"}</h2>
        
        <div class="bg-black/90 backdrop-blur-lg border border-white/10 rounded-xl p-8 mb-8">
          <div class="flex items-center gap-4 mb-8">
            <button class="rounded-full p-3 bg-white/10 hover:bg-white/20 text-white transition-all" onclick="window.dispatchEvent(new CustomEvent('togglePlay'))">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
            <div>
              <h3 class="font-semibold text-lg text-white current-track">${
                tracks[0]?.title || "No track selected"
              }</h3>
              <div class="flex items-center gap-3 text-sm text-white/60">
                <span>${tracks[0]?.bpm || "--"} BPM</span>
                <span>•</span>
                <span>Key: ${tracks[0]?.key || "--"}</span>
              </div>
            </div>
          </div>

          <div class="relative w-full h-16 mb-8">
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

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${tracks
              .map(
                (track: any, index: number) => `
              <div class="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group" 
                   onclick="window.dispatchEvent(new CustomEvent('selectTrack', { detail: ${index} }))">
                <h4 class="font-medium text-white group-hover:text-white/90">${
                  track.title
                }</h4>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-xs text-white/60">${track.bpm} BPM</span>
                  <span class="text-xs text-white/40">•</span>
                  <span class="text-xs text-white/60">Key: ${track.key}</span>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>
  `;
};