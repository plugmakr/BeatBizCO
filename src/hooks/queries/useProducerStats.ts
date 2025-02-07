
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProducerStats = (producerId: string) => {
  return useQuery({
    queryKey: ["producer-stats", producerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("producer_stats")
        .select("*")
        .eq("producer_id", producerId)
        .single();

      if (error) {
        throw new Error("Failed to fetch producer stats");
      }

      return {
        totalBeats: data.total_beats || 0,
        totalRevenue: data.total_revenue || 0,
        activeProjects: data.active_projects || 0,
        supportTickets: data.support_tickets || 0,
      };
    },
    enabled: !!producerId,
  });
};
