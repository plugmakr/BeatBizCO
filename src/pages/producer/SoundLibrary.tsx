import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { SoundLibraryHeader } from "@/components/producer/sound-library/SoundLibraryHeader";
import { SoundLibraryGrid } from "@/components/producer/sound-library/SoundLibraryGrid";
import { SoundLibrarySidebar } from "@/components/producer/sound-library/SoundLibrarySidebar";
import { SoundLibraryUpload } from "@/components/producer/sound-library/SoundLibraryUpload";
import { SoundLibraryFilters } from "@/components/producer/sound-library/SoundLibraryFilters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type SoundType = "beat" | "sound_kit" | "midi_kit" | "loop_kit" | "drum_kit" | "one_shot" | "sample";

export default function ProducerSoundLibrary() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<SoundType | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // First query to get the session
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },
  });

  // Only fetch sounds if we have a valid session
  const { data: sounds, isLoading } = useQuery({
    queryKey: ["sounds", selectedFolder, searchQuery, selectedTags, selectedType, session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      
      let query = supabase
        .from("sound_library")
        .select("*")
        .eq("producer_id", session.user.id);

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
    enabled: !!session?.user?.id,
  });

  const handleMoveFile = async (soundId: string, folderId: string | null) => {
    try {
      const { error } = await supabase
        .from("sound_library")
        .update({ folder_path: folderId })
        .eq("id", soundId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "File moved successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["sounds"] });
    } catch (error) {
      console.error("Move error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to move file",
      });
    }
  };

  const handleCopyFile = async (soundId: string, folderId: string | null) => {
    try {
      const { data: originalFile, error: fetchError } = await supabase
        .from("sound_library")
        .select("*")
        .eq("id", soundId)
        .single();

      if (fetchError) throw fetchError;

      const { error: insertError } = await supabase.from("sound_library").insert({
        ...originalFile,
        id: undefined,
        folder_path: folderId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "File copied successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["sounds"] });
    } catch (error) {
      console.error("Copy error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy file",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        <SoundLibrarySidebar
          selectedFolder={selectedFolder}
          onFolderSelect={setSelectedFolder}
          onFileDrop={handleMoveFile}
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
              <SoundLibraryGrid 
                sounds={sounds || []} 
                isLoading={isLoading} 
                onMoveFile={handleMoveFile}
                onCopyFile={handleCopyFile}
              />
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