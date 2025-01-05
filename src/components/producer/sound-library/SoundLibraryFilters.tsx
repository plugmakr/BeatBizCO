import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SoundLibraryFiltersProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
}

export function SoundLibraryFilters({
  selectedTags,
  onTagsChange,
  selectedType,
  onTypeChange,
}: SoundLibraryFiltersProps) {
  const { data: tags } = useQuery({
    queryKey: ["sound-library-tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sound_library_tags")
        .select("*")
        .eq("producer_id", (await supabase.auth.getSession()).data.session?.user.id);
      
      if (error) throw error;
      return data;
    },
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
      <Select value={selectedType || "all"} onValueChange={(value) => onTypeChange(value === "all" ? null : value)}>
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