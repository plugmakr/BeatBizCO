import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Music, ShoppingBag, DollarSign } from "lucide-react";
import RoleGuard from "@/components/auth/RoleGuard";

interface DashboardStats {
  userCount: number;
  producerCount: number;
  artistCount: number;
  beatCount: number;
  salesCount: number;
  totalRevenue: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    userCount: 0,
    producerCount: 0,
    artistCount: 0,
    beatCount: 0,
    salesCount: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Get total users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      // Get producer count
      const { count: producerCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'producer');

      // Get artist count
      const { count: artistCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'artist');

      // Get total beats
      const { count: beatCount } = await supabase
        .from('beats')
        .select('*', { count: 'exact', head: true });

      // Get sales stats
      const { data: salesData } = await supabase
        .from('marketplace_sales')
        .select('amount');

      const salesCount = salesData?.length || 0;
      const totalRevenue = salesData?.reduce((sum, sale) => sum + (sale.amount || 0), 0) || 0;

      setStats({
        userCount: userCount || 0,
        producerCount: producerCount || 0,
        artistCount: artistCount || 0,
        beatCount: beatCount || 0,
        salesCount,
        totalRevenue,
      });
    };

    fetchStats();
  }, []);

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <DashboardLayout>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.userCount}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.producerCount} Producers, {stats.artistCount} Artists
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Beats</CardTitle>
                <Music className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.beatCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.salesCount}</div>
                <p className="text-xs text-muted-foreground">
                  ${stats.totalRevenue.toFixed(2)} Revenue
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
};

export default AdminDashboard;