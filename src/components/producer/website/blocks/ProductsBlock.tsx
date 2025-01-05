export const ProductsBlock = ({ content }: { content: any }) => {
  return `
    <section class="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-white">${
          content.heading || "Featured Beats"
        }</h2>
        <div class="grid grid-cols-1 md:grid-cols-${content.itemsPerRow || 3} gap-8">
          ${Array(6)
            .fill(null)
            .map(
              (_, i) => `
            <div class="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all transform hover:scale-105">
              <div class="h-48 bg-white/5">
                <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500" class="w-full h-full object-cover" alt="Beat ${
                  i + 1
                }"/>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-semibold text-white mb-2">Sample Beat ${
                  i + 1
                }</h3>
                <div class="flex items-center justify-between">
                  <p class="text-white/60">$29.99</p>
                  <button class="text-white/80 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
};