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
      <DialogContent className="max-w-6xl h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Website Preview</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="overflow-y-auto h-full bg-white">
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
                                    : `<div class="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900"></div>`
                                }
                                <div class="relative z-10 text-center">
                                  <h1 class="text-5xl font-bold mb-4">${
                                    block.content.heading
                                  }</h1>
                                  <p class="text-xl mb-8">${
                                    block.content.subheading
                                  }</p>
                                  <a href="${
                                    block.content.ctaUrl
                                  }" class="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-opacity-90">
                                    ${block.content.ctaText}
                                  </a>
                                </div>
                              </div>
                            `;
                          case "products":
                            return `
                              <div class="py-16 px-8 bg-gray-50">
                                <h2 class="text-3xl font-bold text-center mb-12">${
                                  block.content.heading
                                }</h2>
                                <div class="grid grid-cols-1 md:grid-cols-${
                                  block.content.itemsPerRow
                                } gap-8 max-w-7xl mx-auto">
                                  ${Array(6)
                                    .fill(null)
                                    .map(
                                      () => `
                                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                                      <div class="h-48 bg-gray-200"></div>
                                      <div class="p-4">
                                        <h3 class="font-semibold">Sample Beat</h3>
                                        <p class="text-gray-600">$29.99</p>
                                      </div>
                                    </div>
                                  `
                                    )
                                    .join("")}
                                </div>
                              </div>
                            `;
                          default:
                            return `
                              <div class="p-4 text-center text-gray-500">
                                Preview not available for this block type
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