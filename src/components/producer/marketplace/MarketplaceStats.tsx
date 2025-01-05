import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, DollarSign, Download, Play, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketplaceStatsProps {
  totalSales: number;
  totalRevenue: number;
  totalDownloads: number;
  totalPlays: number;
}

export function MarketplaceStats({
  totalSales,
  totalRevenue,
  totalDownloads,
  totalPlays,
}: MarketplaceStatsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>
      
      {!isCollapsed && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Total Sales</h3>
            </div>
            <p className="text-2xl font-bold">{totalSales}</p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Revenue</h3>
            </div>
            <p className="text-2xl font-bold">${totalRevenue}</p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Downloads</h3>
            </div>
            <p className="text-2xl font-bold">{totalDownloads}</p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Play className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Plays</h3>
            </div>
            <p className="text-2xl font-bold">{totalPlays}</p>
          </Card>
        </div>
      )}
    </div>
  );
}