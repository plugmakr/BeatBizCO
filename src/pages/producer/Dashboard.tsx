import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ProducerStats } from "@/components/producer/ProducerStats";
import { ProducerNews } from "@/components/producer/ProducerNews";
import FinancialOverview from "@/components/producer/finances/FinancialOverview";
import RevenueChart from "@/components/producer/finances/RevenueChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducerStats } from "@/hooks/queries/useProducerStats";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ProducerDashboard = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const { data: stats, isLoading: isStatsLoading } = useProducerStats(user?.id);
  const { data: recentCollabs, isLoading: isCollabsLoading } = useQuery({
    queryKey: ["recent-collabs", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collaboration_projects")
        .select("*")
        .eq("created_by", user?.id)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: recentSales, isLoading: isSalesLoading } = useQuery({
    queryKey: ["recent-sales", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketplace_sales")
        .select(`
          *,
          marketplace_items!inner(
            title,
            producer_id
          )
        `)
        .eq("marketplace_items.producer_id", user?.id)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <ProducerStats stats={stats} isLoading={isStatsLoading} />

        <div className="grid gap-4 grid-cols-1">
          <FinancialOverview stats={stats} isLoading={isStatsLoading} />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="news">Latest News</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Collaborations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isCollabsLoading ? (
                      <div>Loading...</div>
                    ) : recentCollabs?.map((collab) => (
                      <div key={collab.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{collab.title}</p>
                          <p className="text-sm text-muted-foreground">{collab.status}</p>
                        </div>
                        <span className="text-sm text-yellow-500">
                          {collab.status === "completed" ? "100%" : "In Progress"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isSalesLoading ? (
                      <div>Loading...</div>
                    ) : recentSales?.map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{sale.marketplace_items.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(sale.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-sm font-medium">${sale.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <RevenueChart producerId={user?.id} />
          </TabsContent>

          <TabsContent value="news">
            <ProducerNews />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProducerDashboard;