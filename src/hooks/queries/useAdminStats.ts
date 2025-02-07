
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_stats")
        .select("*")
        .single();

      if (error) {
        throw new Error("Failed to fetch admin stats");
      }

      return {
        totalUsers: data.total_users || 0,
        totalRevenue: data.total_revenue || 0,
        activeProjects: data.active_projects || 0,
        supportTickets: data.support_tickets || 0,
      };
    },
  });
};
