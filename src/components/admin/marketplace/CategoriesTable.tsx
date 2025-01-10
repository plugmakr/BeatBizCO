import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";
import type { MarketplaceCategory } from "./types";

export function CategoriesTable() {
  const { data: categories } = useQuery({
    queryKey: ["marketplace-categories"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("marketplace_categories")
          .select("*")
          .order("name");

        if (error) {
          console.error("Error fetching categories:", error);
          // Return default categories if table doesn't exist
          return [
            { id: '1', name: 'Beats', item_count: 0, is_active: true },
            { id: '2', name: 'Loop Kits', item_count: 0, is_active: true },
            { id: '3', name: 'MIDI Kits', item_count: 0, is_active: true },
            { id: '4', name: 'Sample Kits', item_count: 0, is_active: true },
            { id: '5', name: 'Drum Kits', item_count: 0, is_active: true },
            { id: '6', name: 'Stem Kits', item_count: 0, is_active: true },
            { id: '7', name: 'Albums', item_count: 0, is_active: true },
            { id: '8', name: 'Singles', item_count: 0, is_active: true }
          ];
        }
        return data as MarketplaceCategory[];
      } catch (error) {
        console.error("Error in categories query:", error);
        return [];
      }
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">
                {category.name}
              </TableCell>
              <TableCell>{category.item_count}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    category.is_active ? "default" : "secondary"
                  }
                >
                  {category.is_active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}