import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function Analytics() {
  const { data: analytics } = useQuery({
    queryKey: ["marketplace-analytics"],
    queryFn: async () => {
      const { data: items } = await supabase
        .from("marketplace_items")
        .select(`
          id,
          title,
          total_plays,
          total_sales,
          total_downloads
        `);

      return items;
    },
  });

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Total Plays</h3>
          <p className="text-2xl">
            {analytics?.reduce((sum, item) => sum + (item.total_plays || 0), 0)}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Total Sales</h3>
          <p className="text-2xl">
            {analytics?.reduce((sum, item) => sum + (item.total_sales || 0), 0)}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Total Downloads</h3>
          <p className="text-2xl">
            {analytics?.reduce((sum, item) => sum + (item.total_downloads || 0), 0)}
          </p>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Performance Overview</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total_plays" stroke="#8884d8" />
              <Line type="monotone" dataKey="total_sales" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}