import { Tables } from "@/integrations/supabase/types";

export type ProjectFile = Tables<"project_files">;
export type SoundLibraryFile = Tables<"sound_library">;
export type SoundLibraryProjectFile = Tables<"sound_library_project_files">;

export type CombinedProjectFile = {
  type: 'regular' | 'sound_library';
  file: ProjectFile | (SoundLibraryFile & { assignment_id: string });
};