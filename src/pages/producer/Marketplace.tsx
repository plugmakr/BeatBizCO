import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Package, Music2, Folder, Disc3, Layers } from "lucide-react";
import { UploadItemDialog } from "@/components/producer/marketplace/UploadItemDialog";
import { MarketplaceItemList } from "@/components/producer/marketplace/MarketplaceItemList";
import { MarketplaceSubmenu } from "@/components/producer/marketplace/MarketplaceSubmenu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type ValidCategory = 'Loops' | 'Midi Kits' | 'Sample Kits' | 'Drum Kits' | 'Beats';

const isValidCategory = (category: string | null): category is ValidCategory => {
  return ['Loops', 'Midi Kits', 'Sample Kits', 'Drum Kits', 'Beats'].includes(category || '');
};

const categoryIcons = {
  'Loops': Music2,
  'Midi Kits': Layers,
  'Sample Kits': Package,
  'Drum Kits': Disc3,
  'Beats': Folder,
} as const;

export default function ProducerMarketplace() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ValidCategory | 'all'>('all');
  const { toast } = useToast();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },
  });

  const { data: items, refetch: refetchItems } = useQuery({
    queryKey: ["marketplaceItems", searchQuery, selectedCategory, session?.user.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        toast({
          title: "Error",
          description: "Please sign in to view marketplace items",
          variant: "destructive",
        });
        return [];
      }

      const query = supabase
        .from("marketplace_items")
        .select("*")
        .eq("producer_id", session.user.id);

      if (searchQuery) {
        query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      if (selectedCategory !== 'all') {
        query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      return data?.map(item => ({
        ...item,
        category: isValidCategory(item.category) ? item.category : 'Beats' as ValidCategory
      })) || [];
    },
    enabled: !!session?.user?.id,
  });

  const handleRefresh = () => {
    refetchItems();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <Button onClick={() => setIsUploadOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Item
        </Button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === 'all' ? "default" : "outline"}
            onClick={() => setSelectedCategory('all')}
            className="whitespace-nowrap"
          >
            <Package className="mr-2 h-4 w-4" />
            All Products
          </Button>
          {(['Loops', 'Midi Kits', 'Sample Kits', 'Drum Kits', 'Beats'] as const).map((category) => {
            const Icon = categoryIcons[category];
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                <Icon className="mr-2 h-4 w-4" />
                {category}
              </Button>
            );
          })}
        </div>
      </div>

      <MarketplaceSubmenu />

      <MarketplaceItemList items={items || []} onRefresh={handleRefresh} />

      <UploadItemDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onSuccess={handleRefresh}
      />
    </div>
  );
}