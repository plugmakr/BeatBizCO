import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProducerStats = (producerId: string) => {
  return useQuery({
    queryKey: ["producer-stats", producerId],
    queryFn: async () => {
      const [
        { data: beats, error: beatsError },
        { data: sales, error: salesError },
        { data: projects, error: projectsError }
      ] = await Promise.all([
        supabase
          .from("beats")
          .select("*", { count: "exact" })
          .eq("producer_id", producerId),
        supabase
          .from("marketplace_sales")
          .select(`
            amount,
            marketplace_items!inner(
              producer_id
            )
          `)
          .eq("marketplace_items.producer_id", producerId)
          .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
        supabase
          .from("collaboration_projects")
          .select("*", { count: "exact" })
          .eq("created_by", producerId)
          .eq("status", "in_progress")
      ]);

      if (beatsError || salesError || projectsError) {
        throw new Error("Failed to fetch producer stats");
      }

      const totalRevenue = sales?.reduce((acc, sale) => acc + sale.amount, 0) || 0;

      return {
        totalBeats: beats?.length || 0,
        totalRevenue,
        activeProjects: projects?.length || 0,
      };
    },
    enabled: !!producerId,
  });
};
