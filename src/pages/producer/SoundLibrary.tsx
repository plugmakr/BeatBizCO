import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { SoundLibraryHeader } from "@/components/producer/sound-library/SoundLibraryHeader";
import { SoundLibraryGrid } from "@/components/producer/sound-library/SoundLibraryGrid";
import { SoundLibrarySidebar } from "@/components/producer/sound-library/SoundLibrarySidebar";
import { SoundLibraryUpload } from "@/components/producer/sound-library/SoundLibraryUpload";
import { SoundLibraryFilters } from "@/components/producer/sound-library/SoundLibraryFilters";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function ProducerSoundLibrary() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: sounds, isLoading } = useQuery({
    queryKey: ["sounds", selectedFolder, searchQuery, selectedTags, selectedType],
    queryFn: async () => {
      let query = supabase
        .from("sound_library")
        .select("*")
        .eq("producer_id", (await supabase.auth.getSession()).data.session?.user.id);

      if (selectedFolder) {
        query = query.eq("folder_path", selectedFolder);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      if (selectedTags.length > 0) {
        query = query.contains("tags", selectedTags);
      }

      if (selectedType) {
        query = query.eq("type", selectedType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        <SoundLibrarySidebar
          selectedFolder={selectedFolder}
          onFolderSelect={setSelectedFolder}
        />
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <SoundLibraryHeader
              onUploadClick={() => setIsUploadOpen(true)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <SoundLibraryFilters
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
            <div className="flex-1 overflow-y-auto p-6">
              <SoundLibraryGrid sounds={sounds || []} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
      <SoundLibraryUpload
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        currentFolder={selectedFolder}
      />
    </DashboardLayout>
  );
}