import type { Database } from "@/integrations/supabase/types";

// Helper type for Supabase table types
type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

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
  };
};