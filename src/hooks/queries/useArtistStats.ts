import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArtistStats = (artistId: string) => {
  return useQuery({
    queryKey: ["artist-stats", artistId],
    queryFn: async () => {
      const [
        { data: purchases, error: purchasesError },
        { data: collaborations, error: collaborationsError },
        { data: projects, error: projectsError }
      ] = await Promise.all([
        supabase
          .from("marketplace_sales")
          .select("*", { count: "exact" })
          .eq("buyer_id", artistId),
        supabase
          .from("project_collaborators")
          .select("*", { count: "exact" })
          .eq("user_id", artistId),
        supabase
          .from("collaboration_projects")
          .select("*", { count: "exact" })
          .eq("status", "in_progress")
          .in("id", 
            supabase
              .from("project_collaborators")
              .select("project_id")
              .eq("user_id", artistId)
          )
      ]);

      if (purchasesError || collaborationsError || projectsError) {
        throw new Error("Failed to fetch artist stats");
      }

      return {
        purchasedBeats: purchases?.length || 0,
        collaborations: collaborations?.length || 0,
        activeProjects: projects?.length || 0,
      };
    },
    enabled: !!artistId,
  });
};
