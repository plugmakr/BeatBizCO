import { ChevronRight, FolderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Breadcrumb {
  id: string | null;
  name: string;
}

interface FolderNavigationProps {
  breadcrumbs: Breadcrumb[];
  onNavigate: (folderId: string | null) => void;
}

export function FolderNavigation({ breadcrumbs, onNavigate }: FolderNavigationProps) {
  return (
    <div className="flex items-center space-x-2 mb-4 text-sm">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.id ?? 'root'} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 h-8 px-2"
            onClick={() => onNavigate(crumb.id)}
          >
            <FolderIcon className="h-4 w-4" />
            {crumb.name}
          </Button>
        </div>
      ))}
    </div>
  );
}