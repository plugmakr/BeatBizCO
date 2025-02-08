
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { SoundType } from "@/types/database";

interface SoundLibraryFiltersProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedType: SoundType | null;
  onTypeChange: (type: SoundType | null) => void;
}

interface SoundLibraryTag {
  id: string;
  name: string;
  color: string;
}

export function SoundLibraryFilters({
  selectedTags,
  onTagsChange,
  selectedType,
  onTypeChange,
}: SoundLibraryFiltersProps) {
  const { data: { session } } = await supabase.auth.getSession();

  const { data: tags = [] } = useQuery<SoundLibraryTag[]>({
    queryKey: ["sound-library-tags"],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      
      const { data, error } = await supabase
        .from("sound_library_tags")
        .select("*");
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="p-4 border-b flex items-center gap-4">
      <Select 
        value={selectedType || "all"} 
        onValueChange={(value) => onTypeChange(value === "all" ? null : value as SoundType)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="beat">Beats</SelectItem>
          <SelectItem value="sound_kit">Sound Kits</SelectItem>
          <SelectItem value="midi_kit">MIDI Kits</SelectItem>
          <SelectItem value="loop_kit">Loop Kits</SelectItem>
          <SelectItem value="drum_kit">Drum Kits</SelectItem>
          <SelectItem value="one_shot">One Shots</SelectItem>
          <SelectItem value="sample">Samples</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex gap-2 flex-wrap">
        {tags?.map((tag) => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.name) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleTag(tag.name)}
            style={{ backgroundColor: selectedTags.includes(tag.name) ? tag.color : undefined }}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
