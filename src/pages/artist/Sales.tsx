import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, ShoppingCart, CreditCard, BarChart } from "lucide-react";

const ArtistSales = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Sales Management</h1>
          <p className="text-muted-foreground">Track and manage your music sales</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((sale) => (
                  <div key={sale} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Track Title #{sale}</h3>
                      <p className="text-sm text-muted-foreground">Purchased 2 hours ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">$29.99</p>
                      <p className="text-sm text-muted-foreground">License: Standard</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                View Payment Settings
              </Button>
              <Button className="w-full flex items-center gap-2" variant="outline">
                <ShoppingCart className="h-4 w-4" />
                Manage Products
              </Button>
              <Button className="w-full flex items-center gap-2" variant="outline">
                <BarChart className="h-4 w-4" />
                View Sales Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ArtistSales;