import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { NavigationBlock } from "./blocks/NavigationBlock";
import { HeroBlock } from "./blocks/HeroBlock";
import { ProductsBlock } from "./blocks/ProductsBlock";
import { MusicPlayerBlock } from "./blocks/MusicPlayerBlock";
import { LicensingBlock } from "./blocks/LicensingBlock";

interface PreviewModeProps {
  blocks: any[];
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewMode = ({ blocks, isOpen, onClose }: PreviewModeProps) => {
  const renderBlock = (block: any) => {
    switch (block.type) {
      case "navigation":
        return NavigationBlock({ content: block.content });
      case "hero":
        return HeroBlock({ content: block.content });
      case "products":
        return ProductsBlock({ content: block.content });
      case "music-player":
        return MusicPlayerBlock({ content: block.content });
      case "licensing":
        return LicensingBlock({ content: block.content });
      default:
        return `
          <section class="py-24 px-6 bg-black/50 backdrop-blur-sm border-y border-white/10">
            <div class="max-w-md mx-auto text-center">
              <div class="bg-white/5 p-8 rounded-xl border border-white/10">
                <svg class="w-12 h-12 mx-auto mb-4 text-white/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <h3 class="text-xl font-semibold text-white mb-2">Configuration Required</h3>
                <p class="text-white/60 mb-6">
                  The "${block.type}" block needs to be configured before it can be displayed.
                </p>
                <button class="inline-flex items-center justify-center bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Configure Block
                </button>
              </div>
            </div>
          </section>
        `;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <DialogTitle className="text-sm font-medium">Preview</DialogTitle>
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
                      const currentTrack = document.querySelector('.current-track');
                      const tracks = document.querySelectorAll('.track-item');
                      if (currentTrack) {
                        const selectedTrack = tracks[e.detail];
                        currentTrack.textContent = selectedTrack ? selectedTrack.querySelector('h4').textContent : 'No track selected';
                      }
                    });
                  </script>
                  <style>
                    body { 
                      background: #000;
                      color: #fff;
                    }
                    section + section { 
                      margin-top: 1px;
                    }
                  </style>
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