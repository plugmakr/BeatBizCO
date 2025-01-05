import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

interface SoundLibraryHeaderProps {
  onUploadClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SoundLibraryHeader({
  onUploadClick,
  searchQuery,
  onSearchChange,
}: SoundLibraryHeaderProps) {
  return (
    <div className="p-6 border-b flex items-center justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search sounds..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button onClick={onUploadClick}>
        <Plus className="mr-2 h-4 w-4" />
        Upload Sound
      </Button>
    </div>
  );
}