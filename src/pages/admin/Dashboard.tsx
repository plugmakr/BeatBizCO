import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, DollarSign, Activity, Server } from "lucide-react";

interface DashboardStats {
  activeUsers: number;
  newSignups: number;
  totalRevenue: number;
  systemHealth: {
    uptime: string;
    storage: string;
    dbUsage: string;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    activeUsers: 0,
    newSignups: 0,
    totalRevenue: 0,
    systemHealth: {
      uptime: "99.9%",
      storage: "45%",
      dbUsage: "32%",
    },
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get new signups (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: newUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Get total revenue
      const { data: sales } = await supabase
        .from('marketplace_sales')
        .select('amount');

      const totalRevenue = sales?.reduce((sum, sale) => sum + (sale.amount || 0), 0) || 0;

      setStats({
        activeUsers: totalUsers || 0,
        newSignups: newUsers || 0,
        totalRevenue,
        systemHealth: {
          uptime: "99.9%",
          storage: "45%",
          dbUsage: "32%",
        },
      });
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.newSignups} new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.systemHealth.uptime}</div>
              <p className="text-xs text-muted-foreground">
                Uptime last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.systemHealth.storage}</div>
              <p className="text-xs text-muted-foreground">
                Of total capacity
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Pending Approvals</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Flagged Content</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>System Alerts</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Database Usage</span>
                  <span>{stats.systemHealth.dbUsage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Storage Usage</span>
                  <span>{stats.systemHealth.storage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>API Health</span>
                  <span className="text-green-600">Operational</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}