
import { Card, CardContent } from "@/components/ui/card";
import { Music, Download, Star, Trophy, Activity, DollarSign } from "lucide-react";

export interface ProducerStatsProps {
  stats: {
    totalBeats: number;
    totalRevenue: number;
    activeProjects: number;
    supportTickets?: number;
  };
  isLoading: boolean;
}

export function ProducerStats({ stats, isLoading }: ProducerStatsProps) {
  const statItems = [
    { 
      icon: Music,
      label: "Total Beats",
      value: isLoading ? "..." : stats?.totalBeats ? `${stats.totalBeats}+` : "0"
    },
    {
      icon: Download,
      label: "Downloads",
      value: isLoading ? "..." : "50K+"
    },
    {
      icon: Star,
      label: "Average Rating",
      value: isLoading ? "..." : "4.9/5"
    },
    {
      icon: Trophy,
      label: "Awards",
      value: isLoading ? "..." : "12"
    },
    {
      icon: Activity,
      label: "Active Products",
      value: isLoading ? "..." : stats?.activeProjects ? `${stats.activeProjects}` : "0"
    },
    {
      icon: DollarSign,
      label: "Recent Sales",
      value: isLoading ? "..." : stats?.totalRevenue ? `$${stats.totalRevenue}` : "$0"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 my-8">
      {statItems.map((stat, index) => (
        <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300">
          <CardContent className="flex flex-col items-center justify-center p-4 text-center">
            <stat.icon className="w-6 h-6 mb-2 text-yellow-500" />
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
