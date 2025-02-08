
import { Card, CardContent } from "@/components/ui/card";
import { Music, Download, Star, Trophy, Activity, DollarSign } from "lucide-react";
import type { ProducerStats } from "@/types/database";

interface MetricsDisplayProps {
  data: ProducerStats;
  loading: boolean;
}

export function MetricsDisplay({ data, loading }: MetricsDisplayProps) {
  const metrics = [
    { 
      icon: Music,
      label: "Total Beats",
      value: loading ? "..." : data?.totalBeats ? `${data.totalBeats}+` : "0"
    },
    {
      icon: Download,
      label: "Downloads",
      value: loading ? "..." : "50K+"
    },
    {
      icon: Star,
      label: "Average Rating",
      value: loading ? "..." : "4.9/5"
    },
    {
      icon: Trophy,
      label: "Awards",
      value: loading ? "..." : "12"
    },
    {
      icon: Activity,
      label: "Active Products",
      value: loading ? "..." : data?.activeProjects ? `${data.activeProjects}` : "0"
    },
    {
      icon: DollarSign,
      label: "Recent Sales",
      value: loading ? "..." : data?.totalRevenue ? `$${data.totalRevenue}` : "$0"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 my-8">
      {metrics.map((metric, index) => (
        <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300">
          <CardContent className="flex flex-col items-center justify-center p-4 text-center">
            <metric.icon className="w-6 h-6 mb-2 text-yellow-500" />
            <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
            <p className="text-xs text-muted-foreground">{metric.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
