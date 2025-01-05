import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Image, Music, Key, Tag, DollarSign, FileText, Package } from "lucide-react";

export function EditProduct() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: products, refetch } = useQuery({
    queryKey: ["marketplace-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketplace_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleUpdate = async (id: string, updates: any) => {
    try {
      const { error } = await supabase
        .from("marketplace_items")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product updated successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {products?.map((product) => (
        <Card key={product.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm text-muted-foreground">{product.type}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedProduct(product.id === selectedProduct ? null : product.id)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>

          {selectedProduct === product.id && (
            <div className="mt-4 space-y-4">
              <div>
                <Label>Title</Label>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <Input
                    defaultValue={product.title}
                    onChange={(e) => handleUpdate(product.id, { title: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <Textarea
                    defaultValue={product.description || ""}
                    onChange={(e) => handleUpdate(product.id, { description: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>BPM</Label>
                  <div className="flex items-center space-x-2">
                    <Music className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      defaultValue={product.bpm || ""}
                      onChange={(e) => handleUpdate(product.id, { bpm: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Key</Label>
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <Input
                      defaultValue={product.key || ""}
                      onChange={(e) => handleUpdate(product.id, { key: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Genre</Label>
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <Input
                      defaultValue={product.genre || ""}
                      onChange={(e) => handleUpdate(product.id, { genre: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Price</Label>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      step="0.01"
                      defaultValue={product.price}
                      onChange={(e) => handleUpdate(product.id, { price: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Category</Label>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <Select
                    defaultValue={product.category || "Beats"}
                    onValueChange={(value) => handleUpdate(product.id, { category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beats">Beats</SelectItem>
                      <SelectItem value="Loops">Loops</SelectItem>
                      <SelectItem value="Midi Kits">Midi Kits</SelectItem>
                      <SelectItem value="Sample Kits">Sample Kits</SelectItem>
                      <SelectItem value="Drum Kits">Drum Kits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Image className="h-4 w-4 mr-2" />
                Change Thumbnail
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}