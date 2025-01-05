import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ProductList() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
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

  const handleVisibilityToggle = async (ids: string[], visible: boolean) => {
    try {
      const { error } = await supabase
        .from("marketplace_items")
        .update({ status: visible ? "published" : "draft" })
        .in("id", ids);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Products ${visible ? "published" : "unpublished"} successfully`,
      });

      refetch();
      setSelectedItems([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product visibility",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (ids: string[]) => {
    try {
      const { error } = await supabase
        .from("marketplace_items")
        .delete()
        .in("id", ids);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Products deleted successfully",
      });

      refetch();
      setSelectedItems([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete products",
        variant: "destructive",
      });
    }
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "genre",
      header: "Genre",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price}`,
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  return (
    <div className="space-y-4">
      {selectedItems.length > 0 && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleVisibilityToggle(selectedItems, true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Publish
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleVisibilityToggle(selectedItems, false)}
          >
            <EyeOff className="h-4 w-4 mr-2" />
            Unpublish
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(selectedItems)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      )}
      
      <DataTable
        columns={columns}
        data={products || []}
        onRowSelectionChange={(rows) => setSelectedItems(rows)}
      />
    </div>
  );
}