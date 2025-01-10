import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import type { MarketplaceItem } from "./types";

export function ProductsTable() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: items, refetch } = useQuery({
    queryKey: ["marketplace-items", selectedCategory, searchQuery],
    queryFn: async () => {
      try {
        let query = supabase
          .from("marketplace_items")
          .select(`
            *,
            profiles:producer_id (
              username,
              full_name
            )
          `);

        if (selectedCategory !== "all") {
          query = query.eq("category", selectedCategory);
        }

        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching items:", error);
          return [];
        }
        return data || [];
      } catch (error) {
        console.error("Error in items query:", error);
        return [];
      }
    },
  });

  const handleToggleVisibility = async (id: string, currentStatus: string) => {
    try {
      const { error } = await supabase
        .from("marketplace_items")
        .update({ status: currentStatus === "published" ? "draft" : "published" })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Item ${currentStatus === "published" ? "hidden" : "published"} successfully`,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item visibility",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (id: string, isFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from("marketplace_items")
        .update({ is_featured: !isFeatured })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Item ${isFeatured ? "removed from" : "marked as"} featured`,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update featured status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from("marketplace_items")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item deleted successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Beats">Beats</SelectItem>
            <SelectItem value="Loop Kits">Loop Kits</SelectItem>
            <SelectItem value="MIDI Kits">MIDI Kits</SelectItem>
            <SelectItem value="Sample Kits">Sample Kits</SelectItem>
            <SelectItem value="Drum Kits">Drum Kits</SelectItem>
            <SelectItem value="Stem Kits">Stem Kits</SelectItem>
            <SelectItem value="Albums">Albums</SelectItem>
            <SelectItem value="Singles">Singles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Producer/Artist</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item: MarketplaceItem) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.title}
                </TableCell>
                <TableCell>
                  {item.profiles?.username || item.profiles?.full_name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "published"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={item.is_featured}
                    onCheckedChange={() =>
                      handleToggleFeatured(item.id, item.is_featured)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleToggleVisibility(item.id, item.status || '')
                      }
                    >
                      {item.status === "published" ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Item
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this item?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}