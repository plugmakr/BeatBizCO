import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Copy, Move } from "lucide-react";

interface FileContextMenuProps {
  children: React.ReactNode;
  onMove: () => void;
  onCopy: () => void;
}

export function FileContextMenu({ children, onMove, onCopy }: FileContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={onMove}>
          <Move className="h-4 w-4 mr-2" />
          Move to...
        </ContextMenuItem>
        <ContextMenuItem onClick={onCopy}>
          <Copy className="h-4 w-4 mr-2" />
          Copy to...
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}