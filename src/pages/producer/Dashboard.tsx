import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Users2, DollarSign, ChartLine, Database, ChartBar, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProducerDashboard() {
  const stats = [
    {
      title: "Total Beats",
      value: "156",
      icon: Music,
      change: "+12% from last month"
    },
    {
      title: "Active Clients",
      value: "28",
      icon: Users2,
      change: "+3 new this month"
    },
    {
      title: "Revenue",
      value: "$12,450",
      icon: DollarSign,
      change: "+18% from last month"
    },
    {
      title: "Beat Sales",
      value: "45",
      icon: ChartLine,
      change: "+7% from last month"
    },
    {
      title: "Active Products",
      value: "32",
      icon: Database,
      change: "+5 this month"
    },
    {
      title: "Recent Sales",
      value: "$2,850",
      icon: ChartBar,
      change: "+22% from last week"
    }
  ];

  const recentSales = [
    {
      title: "Trap Beat Package",
      customer: "John Doe",
      amount: "$299",
      date: "2024-03-20"
    },
    {
      title: "R&B Instrumental",
      customer: "Jane Smith",
      amount: "$199",
      date: "2024-03-19"
    },
    {
      title: "Hip Hop Beat",
      customer: "Mike Johnson",
      amount: "$149",
      date: "2024-03-18"
    }
  ];

  const latestProjects = [
    {
      title: "Summer Vibes EP",
      status: "In Progress",
      deadline: "2024-04-15",
      completion: "75%"
    },
    {
      title: "Rap Album Production",
      status: "Planning",
      deadline: "2024-05-01",
      completion: "25%"
    },
    {
      title: "Beat Pack Vol. 3",
      status: "Review",
      deadline: "2024-03-30",
      completion: "90%"
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Producer Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                  <span className="text-xs text-muted-foreground">{stat.change}</span>
                </div>
                <h2 className="text-xl font-bold mb-1">{stat.value}</h2>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Sales</h2>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <h3 className="font-medium">{sale.title}</h3>
                      <p className="text-sm text-muted-foreground">{sale.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{sale.amount}</p>
                      <p className="text-sm text-muted-foreground">{sale.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Latest Projects</h2>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {latestProjects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">Due: {project.deadline}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{project.status}</p>
                      <p className="text-sm text-muted-foreground">{project.completion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}