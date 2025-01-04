import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, DollarSign, Activity } from "lucide-react";
import type { Client } from "@/types/database";

interface ClientStatsProps {
  clients: Client[] | undefined;
}

export const ClientStats = ({ clients }: ClientStatsProps) => {
  const stats = [
    {
      title: "Total Clients",
      value: clients?.length || 0,
      icon: Users,
      description: "Active clients in your roster"
    },
    {
      title: "New This Month",
      value: clients?.filter(c => 
        new Date(c.created_at).getMonth() === new Date().getMonth()
      ).length || 0,
      icon: UserPlus,
      description: "Clients added this month"
    },
    {
      title: "Average Revenue",
      value: "$2,450",
      icon: DollarSign,
      description: "Per client revenue"
    },
    {
      title: "Engagement Rate",
      value: "85%",
      icon: Activity,
      description: "Client interaction rate"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};