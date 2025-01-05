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
        return MusicPlayerPreview({ content: block.content });
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
                </head>
                <body>
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
