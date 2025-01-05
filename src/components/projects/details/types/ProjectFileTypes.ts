import { Tables } from "@/integrations/supabase/types";

export type ProjectFile = Tables<"project_files">;
export type SoundLibraryFile = Tables<"sound_library">;
export type SoundLibraryProjectFile = Tables<"sound_library_project_files">;

export type CombinedProjectFile = {
  type: 'regular';
  file: ProjectFile;
} | {
  type: 'sound_library';
  file: SoundLibraryFile & { 
    assignment_id: string;
    file_type?: string;
    filename?: string;
  };
};