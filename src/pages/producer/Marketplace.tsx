import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { MarketplaceStats } from "@/components/producer/marketplace/MarketplaceStats";
import { UploadItemDialog } from "@/components/producer/marketplace/UploadItemDialog";
import { MarketplaceItemList } from "@/components/producer/marketplace/MarketplaceItemList";
import { MarketplaceSubmenu } from "@/components/producer/marketplace/MarketplaceSubmenu";
import { supabase } from "@/integrations/supabase/client";

export default function ProducerMarketplace() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: stats } = useQuery({
    queryKey: ["marketplaceStats"],
    queryFn: async () => {
      const { data: items } = await supabase
        .from("marketplace_items")
        .select("total_sales, price, total_downloads, total_plays")
        .eq("producer_id", (await supabase.auth.getSession()).data.session?.user.id);

      if (!items) return { totalSales: 0, totalRevenue: 0, totalDownloads: 0, totalPlays: 0 };

      return {
        totalSales: items.reduce((sum, item) => sum + (item.total_sales || 0), 0),
        totalRevenue: items.reduce((sum, item) => sum + ((item.total_sales || 0) * item.price), 0),
        totalDownloads: items.reduce((sum, item) => sum + (item.total_downloads || 0), 0),
        totalPlays: items.reduce((sum, item) => sum + (item.total_plays || 0), 0),
      };
    },
  });

  const { data: items, refetch: refetchItems } = useQuery({
    queryKey: ["marketplaceItems", searchQuery],
    queryFn: async () => {
      const query = supabase
        .from("marketplace_items")
        .select("*")
        .eq("producer_id", (await supabase.auth.getSession()).data.session?.user.id);

      if (searchQuery) {
        query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Ensure each item has a valid category
      return data?.map(item => ({
        ...item,
        category: ['Loops', 'Midi Kits', 'Sample Kits', 'Drum Kits', 'Beats'].includes(item.category) 
          ? item.category 
          : 'Beats'
      })) || [];
    },
  });

  const handleRefresh = () => {
    refetchItems();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <Button onClick={() => setIsUploadOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Upload Item
          </Button>
        </div>

        <MarketplaceStats
          totalSales={stats?.totalSales || 0}
          totalRevenue={stats?.totalRevenue || 0}
          totalDownloads={stats?.totalDownloads || 0}
          totalPlays={stats?.totalPlays || 0}
        />

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <MarketplaceSubmenu />

        <MarketplaceItemList items={items || []} onRefresh={handleRefresh} />

        <UploadItemDialog
          open={isUploadOpen}
          onOpenChange={setIsUploadOpen}
          onSuccess={handleRefresh}
        />
      </div>
    </DashboardLayout>
  );
}