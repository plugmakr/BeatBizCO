import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { MusicPlayerPreview } from "./preview/MusicPlayerPreview";

interface PreviewModeProps {
  blocks: any[];
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewMode = ({ blocks, isOpen, onClose }: PreviewModeProps) => {
  const renderBlock = (block: any) => {
    switch (block.type) {
      case "navigation":
        return `
          <nav class="bg-black/95 backdrop-blur-sm text-white sticky top-0 z-50 border-b border-white/10">
            <div class="max-w-7xl mx-auto px-6">
              <ul class="flex items-center justify-center h-16 space-x-8">
                ${block.content.links
                  .map(
                    (link: any) =>
                      `<li><a href="${link.url}" class="text-white/80 hover:text-white transition-colors">${link.label}</a></li>`
                  )
                  .join("")}
              </ul>
            </div>
          </nav>
        `;
      case "hero":
        return `
          <div class="relative min-h-[80vh] flex items-center justify-center text-white">
            ${
              block.content.backgroundImage
                ? `<img src="${block.content.backgroundImage}" class="absolute inset-0 w-full h-full object-cover" alt="Hero background"/>`
                : `<div class="absolute inset-0">
                     <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" class="w-full h-full object-cover" alt="Default hero background"/>
                     <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
                   </div>`
            }
            <div class="relative z-10 text-center max-w-4xl mx-auto px-6">
              <h1 class="text-6xl font-bold mb-6 leading-tight">${
                block.content.heading || "Your Music Production Journey Starts Here"
              }</h1>
              <p class="text-xl mb-8 text-white/90">${
                block.content.subheading || "Professional Beat Making & Music Production"
              }</p>
              <a href="${
                block.content.ctaUrl || "#"
              }" class="inline-flex items-center justify-center bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all transform hover:scale-105">
                ${block.content.ctaText || "Browse Beats"}
              </a>
            </div>
          </div>
        `;
      case "products":
        return `
          <div class="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
            <div class="max-w-7xl mx-auto">
              <h2 class="text-4xl font-bold text-center mb-16 text-white">${
                block.content.heading || "Featured Beats"
              }</h2>
              <div class="grid grid-cols-1 md:grid-cols-${
                block.content.itemsPerRow || 3
              } gap-8">
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
          </div>
        `;
      case "services":
        return `
          <div class="py-24 px-6 bg-black">
            <div class="max-w-5xl mx-auto">
              <h2 class="text-4xl font-bold text-center mb-16 text-white">${
                block.content.heading || "Production Services"
              }</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${(block.content.services || [
                  {
                    name: "Custom Beat Production",
                    price: "Starting at $299",
                    description: "Professional beat production tailored to your style"
                  },
                  {
                    name: "Mixing & Mastering",
                    price: "Starting at $149",
                    description: "Industry-standard mixing and mastering services"
                  }
                ])
                  .map(
                    (service: any) => `
                  <div class="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                    <h3 class="text-xl font-semibold text-white mb-3">${service.name}</h3>
                    <p class="text-primary font-bold mb-4">${service.price}</p>
                    <p class="text-white/70">${service.description}</p>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        `;
      case "music-player":
        return MusicPlayerPreview({ content: block.content });
      default:
        return `
          <div class="py-24 px-6 bg-black/50 backdrop-blur-sm">
            <div class="max-w-md mx-auto text-center">
              <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" class="w-32 h-32 object-cover mx-auto mb-4 rounded-lg opacity-50" alt="Placeholder"/>
              <p class="text-white/50">
                Configuration needed for "${block.type}" block
              </p>
            </div>
          </div>
        `;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-sm font-medium">Preview</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-3rem)]">
          <iframe
            title="Website Preview"
            className="w-full h-full border-0"
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <title>Website Preview</title>
                  <script src="https://cdn.tailwindcss.com"></script>
                  <script>
                    window.addEventListener('selectTrack', function(e) {
                      const tracks = document.querySelectorAll('.track-item');
                      const currentTrack = document.querySelector('.current-track');
                      const selectedTrack = tracks[e.detail];
                      
                      if (currentTrack && selectedTrack) {
                        currentTrack.textContent = selectedTrack.querySelector('h4').textContent;
                      }
                    });
                  </script>
                </head>
                <body class="bg-black text-white">
                  <div id="preview">
                    ${blocks.map(renderBlock).join("")}
                  </div>
                </body>
              </html>
            `}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};