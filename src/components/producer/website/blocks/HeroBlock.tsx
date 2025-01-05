export const HeroBlock = ({ content }: { content: any }) => {
  return `
    <section class="relative min-h-[80vh] flex items-center justify-center text-white">
      ${
        content.backgroundImage
          ? `<img src="${content.backgroundImage}" class="absolute inset-0 w-full h-full object-cover" alt="Hero background"/>`
          : `<div class="absolute inset-0">
               <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" class="w-full h-full object-cover" alt="Default hero background"/>
               <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
             </div>`
      }
      <div class="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 class="text-6xl font-bold mb-6 leading-tight">${
          content.heading || "Your Music Production Journey Starts Here"
        }</h1>
        <p class="text-xl mb-8 text-white/90">${
          content.subheading || "Professional Beat Making & Music Production"
        }</p>
        <a href="${
          content.ctaUrl || "#"
        }" class="inline-flex items-center justify-center bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all transform hover:scale-105">
          ${content.ctaText || "Browse Beats"}
        </a>
      </div>
    </section>
  `;
};