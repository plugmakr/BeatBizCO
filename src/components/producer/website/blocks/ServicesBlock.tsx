export const ServicesBlock = ({ content }: { content: any }) => {
  if (!content || !content.services || content.services.length === 0) {
    return '';
  }

  return `
    <section class="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16 text-white">${content.heading || "My Services"}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${content.services.map((service: any) => `
            <div class="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
              <h3 class="text-xl font-semibold mb-2">${service.name}</h3>
              <p class="text-2xl font-bold text-primary mb-4">${service.price}</p>
              <p class="text-white/60">${service.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};