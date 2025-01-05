import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationEditor } from "../block-editors/NavigationEditor";
import { HeroEditor } from "../block-editors/HeroEditor";
import { ProductsEditor } from "../block-editors/ProductsEditor";
import { ServicesEditor } from "../block-editors/ServicesEditor";
import { LicensingEditor } from "../block-editors/LicensingEditor";
import { MusicPlayerEditor } from "../block-editors/MusicPlayerEditor";
import { ContactEditor } from "../block-editors/ContactEditor";
import { TestimonialsEditor } from "../block-editors/TestimonialsEditor";
import { BookingEditor } from "../block-editors/BookingEditor";
import { SocialLinksEditor } from "../block-editors/SocialLinksEditor";

interface BlockEditorDialogProps {
  block: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (blockId: string, content: any) => void;
}

export function BlockEditorDialog({ block, open, onOpenChange, onSave }: BlockEditorDialogProps) {
  const renderBlockEditor = (block: any) => {
    const commonProps = {
      content: block.content,
      onSave: (content: any) => onSave(block.id, content),
    };

    switch (block.type) {
      case "navigation":
        return <NavigationEditor {...commonProps} />;
      case "hero":
        return <HeroEditor {...commonProps} />;
      case "products":
        return <ProductsEditor {...commonProps} />;
      case "services":
        return <ServicesEditor {...commonProps} />;
      case "licensing":
        return <LicensingEditor {...commonProps} />;
      case "music-player":
        return <MusicPlayerEditor {...commonProps} />;
      case "testimonials":
        return <TestimonialsEditor {...commonProps} />;
      case "booking":
        return <BookingEditor {...commonProps} />;
      case "social":
        return <SocialLinksEditor {...commonProps} />;
      case "contact":
        return <ContactEditor {...commonProps} />;
      default:
        return (
          <div className="p-4 text-center">
            <p className="text-muted-foreground">
              Editor not yet implemented for {block.type} block type
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            Edit {block?.type?.charAt(0).toUpperCase() + block?.type?.slice(1)} Block
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(80vh-8rem)] pr-4">
          <div className="py-4">
            {block && renderBlockEditor(block)}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}