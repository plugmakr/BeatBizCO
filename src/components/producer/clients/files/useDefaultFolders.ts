import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function useDefaultFolders(clientId: string, onFoldersCreated: () => void) {
  const { toast } = useToast();

  useEffect(() => {
    const createDefaultFolders = async () => {
      const defaultFolders = [
        { name: "Documents", type: "folder" },
        { name: "Audio", type: "folder" },
        { name: "Video", type: "folder" },
        { name: "Zip", type: "folder" },
      ];

      const { data: existingFolders } = await supabase
        .from("client_files")
        .select("display_name")
        .eq("client_id", clientId)
        .eq("type", "folder")
        .is("parent_id", null);

      const existingFolderNames = new Set(
        existingFolders?.map((f) => f.display_name)
      );

      const foldersToCreate = defaultFolders.filter(
        (f) => !existingFolderNames.has(f.name)
      );

      if (foldersToCreate.length === 0) return;

      const { error } = await supabase.from("client_files").insert(
        foldersToCreate.map((folder) => ({
          client_id: clientId,
          display_name: folder.name,
          filename: folder.name,
          file_path: "",
          file_type: "folder",
          size: 0,
          type: "folder",
        }))
      );

      if (error) {
        console.error("Error creating default folders:", error);
        toast({
          title: "Error",
          description: "Failed to create default folders",
          variant: "destructive",
        });
        return;
      }

      onFoldersCreated();
    };

    createDefaultFolders();
  }, [clientId, onFoldersCreated, toast]);
}