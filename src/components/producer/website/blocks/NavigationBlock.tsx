export const NavigationBlock = ({ content }: { content: any }) => {
  const links = content?.links || [];
  
  return `
    <nav class="bg-black/95 backdrop-blur-sm text-white sticky top-0 z-50 border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6">
        <ul class="flex items-center justify-center h-16 space-x-8">
          ${links
            .map(
              (link: any) =>
                `<li><a href="${link.url}" class="text-white/80 hover:text-white transition-colors">${link.label}</a></li>`
            )
            .join("")}
        </ul>
      </div>
    </nav>
  `;
};