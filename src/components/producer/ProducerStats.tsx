import { Card, CardContent } from "@/components/ui/card";
import { Music, Download, Star, Trophy } from "lucide-react";

const stats = [
  { 
    icon: Music,
    label: "Total Beats",
    value: "500+"
  },
  {
    icon: Download,
    label: "Downloads",
    value: "50K+"
  },
  {
    icon: Star,
    label: "Average Rating",
    value: "4.9/5"
  },
  {
    icon: Trophy,
    label: "Awards",
    value: "12"
  }
];

export function ProducerStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <stat.icon className="w-8 h-8 mb-4 text-yellow-500" />
            <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
            <p className="text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}