
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArtistStats = (artistId: string) => {
  return useQuery({
    queryKey: ["artist-stats", artistId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artist_stats")
        .select("*")
        .eq("artist_id", artistId)
        .single();

      if (error) {
        throw new Error("Failed to fetch artist stats");
      }

      return {
        purchasedBeats: data.purchased_beats || 0,
        activeProjects: data.active_projects || 0,
        collaborations: data.collaborations || 0,
        releasedTracks: data.released_tracks || 0,
      };
    },
    enabled: !!artistId,
  });
};
