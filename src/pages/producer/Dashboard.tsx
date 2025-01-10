import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ProducerStats } from "@/components/producer/ProducerStats";
import { ProducerNews } from "@/components/producer/ProducerNews";
import FinancialOverview from "@/components/producer/finances/FinancialOverview";
import RevenueChart from "@/components/producer/finances/RevenueChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProducerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <ProducerStats />

        <div className="grid gap-4 grid-cols-1">
          <FinancialOverview />
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
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Drake - Certified Lover Boy</p>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                      </div>
                      <span className="text-sm text-yellow-500">70%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">The Weeknd - New Single</p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                      <span className="text-sm text-green-500">100%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Future - Upcoming Album</p>
                        <p className="text-sm text-muted-foreground">Planning</p>
                      </div>
                      <span className="text-sm text-blue-500">25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Summer Vibes Beat Pack</p>
                        <p className="text-sm text-muted-foreground">10 minutes ago</p>
                      </div>
                      <span className="text-sm font-medium">$299</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Trap Essentials Vol. 2</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                      <span className="text-sm font-medium">$149</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">R&B Soul Kit</p>
                        <p className="text-sm text-muted-foreground">5 hours ago</p>
                      </div>
                      <span className="text-sm font-medium">$199</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <RevenueChart />
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