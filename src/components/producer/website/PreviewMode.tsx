import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PreviewModeProps {
  blocks: any[];
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewMode = ({ blocks, isOpen, onClose }: PreviewModeProps) => {
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
                </head>
                <body>
                  <div id="preview">
                    ${blocks
                      .map((block) => {
                        switch (block.type) {
                          case "navigation":
                            return `
                              <nav class="bg-black text-white p-4">
                                <ul class="flex space-x-6 justify-center">
                                  ${block.content.links
                                    .map(
                                      (link: any) =>
                                        `<li><a href="${link.url}" class="hover:text-gray-300">${link.label}</a></li>`
                                    )
                                    .join("")}
                                </ul>
                              </nav>
                            `;
                          case "hero":
                            return `
                              <div class="relative h-[600px] flex items-center justify-center text-white">
                                ${
                                  block.content.backgroundImage
                                    ? `<img src="${block.content.backgroundImage}" class="absolute inset-0 w-full h-full object-cover" alt="Hero background"/>`
                                    : `<div class="absolute inset-0">
                                         <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" class="w-full h-full object-cover" alt="Default hero background"/>
                                         <div class="absolute inset-0 bg-black/40"></div>
                                       </div>`
                                }
                                <div class="relative z-10 text-center">
                                  <h1 class="text-5xl font-bold mb-4">${
                                    block.content.heading || "Your Music Production Journey Starts Here"
                                  }</h1>
                                  <p class="text-xl mb-8">${
                                    block.content.subheading || "Professional Beat Making & Music Production"
                                  }</p>
                                  <a href="${
                                    block.content.ctaUrl || "#"
                                  }" class="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-opacity-90">
                                    ${block.content.ctaText || "Browse Beats"}
                                  </a>
                                </div>
                              </div>
                            `;
                          case "products":
                            return `
                              <div class="py-16 px-8 bg-gray-50">
                                <h2 class="text-3xl font-bold text-center mb-12">${
                                  block.content.heading || "Featured Beats"
                                }</h2>
                                <div class="grid grid-cols-1 md:grid-cols-${
                                  block.content.itemsPerRow || 3
                                } gap-8 max-w-7xl mx-auto">
                                  ${Array(6)
                                    .fill(null)
                                    .map(
                                      (_, i) => `
                                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                                      <div class="h-48 bg-gray-200">
                                        <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500" class="w-full h-full object-cover" alt="Beat ${i + 1}"/>
                                      </div>
                                      <div class="p-4">
                                        <h3 class="font-semibold">Sample Beat ${i + 1}</h3>
                                        <p class="text-gray-600">$29.99</p>
                                      </div>
                                    </div>
                                  `
                                    )
                                    .join("")}
                                </div>
                              </div>
                            `;
                          case "services":
                            return `
                              <div class="py-16 px-8 bg-white">
                                <h2 class="text-3xl font-bold text-center mb-12">${
                                  block.content.heading || "Production Services"
                                }</h2>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                                  ]).map(
                                    (service: any) => `
                                    <div class="bg-gray-50 p-6 rounded-lg">
                                      <h3 class="text-xl font-semibold mb-2">${service.name}</h3>
                                      <p class="text-primary font-bold mb-2">${service.price}</p>
                                      <p class="text-gray-600">${service.description}</p>
                                    </div>
                                  `
                                  ).join("")}
                                </div>
                              </div>
                            `;
                          case "music-player":
                            return `
                              <div class="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 p-4">
                                <div class="max-w-7xl mx-auto flex items-center justify-between">
                                  <div class="flex items-center gap-4">
                                    <button class="rounded-full p-2 bg-white/10 hover:bg-white/20">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                      </svg>
                                    </button>
                                    <div class="text-white">
                                      <a href="#/tracks/${block.content?.currentTrack?.id || ''}" class="hover:text-white/80">
                                        <h3 class="font-semibold">${block.content?.currentTrack?.title || "Select a track"}</h3>
                                      </a>
                                      <div class="flex items-center gap-2 text-sm text-white/60">
                                        <span>${block.content?.artistName || "Artist Name"}</span>
                                        ${block.content?.currentTrack?.bpm ? 
                                          `<span class="px-2 py-0.5 bg-white/10 rounded-full text-xs">${block.content?.currentTrack?.bpm} BPM</span>` : 
                                          ''
                                        }
                                        ${block.content?.currentTrack?.key ? 
                                          `<span class="px-2 py-0.5 bg-white/10 rounded-full text-xs">Key: ${block.content?.currentTrack?.key}</span>` : 
                                          ''
                                        }
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
                              </div>
                            `;
                          default:
                            return `
                              <div class="p-8 text-center bg-gray-50">
                                <div class="max-w-md mx-auto">
                                  <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" class="w-32 h-32 object-cover mx-auto mb-4 rounded-lg opacity-50" alt="Placeholder"/>
                                  <p class="text-gray-500">
                                    Configuration needed for "${block.type}" block
                                  </p>
                                </div>
                              </div>
                            `;
                        }
                      })
                      .join("")}
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