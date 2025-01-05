import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Package, 
  ChartBar, 
  Edit2, 
  DollarSign,
  Percent 
} from "lucide-react";
import { ProductList } from "./submenu/ProductList";
import { Analytics } from "./submenu/Analytics";
import { EditProduct } from "./submenu/EditProduct";
import { Promotions } from "./submenu/Promotions";

export function MarketplaceSubmenu() {
  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="products" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          Products
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <ChartBar className="h-4 w-4" />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="edit" className="flex items-center gap-2">
          <Edit2 className="h-4 w-4" />
          Edit Products
        </TabsTrigger>
        <TabsTrigger value="promotions" className="flex items-center gap-2">
          <Percent className="h-4 w-4" />
          Promotions
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="products">
        <ProductList />
      </TabsContent>
      
      <TabsContent value="analytics">
        <Analytics />
      </TabsContent>
      
      <TabsContent value="edit">
        <EditProduct />
      </TabsContent>
      
      <TabsContent value="promotions">
        <Promotions />
      </TabsContent>
    </Tabs>
  );
}