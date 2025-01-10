import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Tags, BarChart3 } from "lucide-react";
import { ProductsTable } from "./marketplace/ProductsTable";
import { CategoriesTable } from "./marketplace/CategoriesTable";
import { MarketplaceStats } from "./marketplace/MarketplaceStats";

export function MarketplaceManagement() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">
            <Package className="w-4 h-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Tags className="w-4 h-4 mr-2" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Global Products</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Category Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoriesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketplaceStats />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}