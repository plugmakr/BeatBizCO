export const TestimonialsBlock = ({ content }: { content: any }) => {
  if (!content || !content.testimonials || content.testimonials.length === 0) {
    return '';
  }

  return `
    <section class="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-16">${content.heading || "What Artists Say"}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${content.testimonials.map((testimonial: any) => `
            <div class="bg-white/5 p-8 rounded-xl border border-white/10">
              <p class="text-lg mb-6 text-white/80">"${testimonial.content}"</p>
              <div class="flex items-center gap-4">
                <div>
                  <h4 class="font-semibold">${testimonial.name}</h4>
                  <p class="text-sm text-white/60">${testimonial.role}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};