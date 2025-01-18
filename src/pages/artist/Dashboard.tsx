import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Music, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useArtistStats } from "@/hooks/queries/useArtistStats";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ArtistDashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const { data: stats, isLoading: isStatsLoading } = useArtistStats(user?.id);
  const { data: recentPurchases, isLoading: isPurchasesLoading } = useQuery({
    queryKey: ["recent-purchases", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketplace_sales")
        .select(`
          *,
          marketplace_items!inner(
            title,
            price,
            license_type
          )
        `)
        .eq("buyer_id", user?.id)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: recentReleases, isLoading: isReleasesLoading } = useQuery({
    queryKey: ["recent-releases", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collaboration_projects")
        .select("*")
        .eq("status", "completed")
        .in("id", 
          supabase
            .from("project_collaborators")
            .select("project_id")
            .eq("user_id", user?.id)
        )
        .order("updated_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Artist Dashboard</h1>
          <p className="text-muted-foreground">Manage your music and collaborations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Music className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Released Tracks</span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold">
                  {isStatsLoading ? "..." : stats?.releasedTracks || 0}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Purchased Beats</span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold">
                  {isStatsLoading ? "..." : stats?.purchasedBeats || 0}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Collaborations</span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold">
                  {isStatsLoading ? "..." : stats?.collaborations || 0}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Active Projects</span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold">
                  {isStatsLoading ? "..." : stats?.activeProjects || 0}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Purchases */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Beat Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isPurchasesLoading ? (
                  <div>Loading...</div>
                ) : recentPurchases?.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{purchase.marketplace_items.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(purchase.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
                <Link to="/artist/browse">
                  <Button className="w-full">Browse More Beats</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Releases */}
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Releases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isReleasesLoading ? (
                  <div>Loading...</div>
                ) : recentReleases?.map((release) => (
                  <div key={release.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{release.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(release.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completed
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ArtistDashboard;