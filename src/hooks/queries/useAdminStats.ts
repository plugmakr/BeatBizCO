import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [
        { count: totalUsers, error: usersError },
        { data: salesData, error: salesError },
        { count: activeProjects, error: projectsError }
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("marketplace_sales")
          .select("amount")
          .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
        supabase
          .from("collaboration_projects")
          .select("*", { count: "exact", head: true })
          .eq("status", "in_progress")
      ]);

      if (usersError || salesError || projectsError) {
        throw new Error("Failed to fetch admin stats");
      }

      const totalRevenue = salesData?.reduce((acc, sale) => acc + sale.amount, 0) || 0;

      return {
        totalUsers: totalUsers || 0,
        totalRevenue,
        activeProjects: activeProjects || 0,
      };
    },
  });
};
