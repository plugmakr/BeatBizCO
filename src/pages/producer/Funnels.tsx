import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BarChart3, 
  GitFork, 
  ShoppingCart, 
  Music2, 
  Download, 
  Gift, 
  Users, 
  Mail,
  Plus,
  ArrowRight,
  Sparkles
} from "lucide-react";

const funnelTemplates = [
  {
    id: 1,
    name: "Beat Store Funnel",
    description: "Convert visitors into beat buyers with a proven sales funnel",
    icon: Music2,
    steps: ["Landing Page", "Beat Preview", "Licensing Options", "Checkout"],
    conversion: "12%"
  },
  {
    id: 2,
    name: "Free Download Funnel",
    description: "Grow your email list by offering a free beat or sample pack",
    icon: Download,
    steps: ["Landing Page", "Email Capture", "Download", "Upsell"],
    conversion: "28%"
  },
  {
    id: 3,
    name: "Bundle Deal Funnel",
    description: "Increase average order value with strategic bundle offers",
    icon: Gift,
    steps: ["Product Page", "Bundle Offer", "Checkout", "Thank You"],
    conversion: "18%"
  },
  {
    id: 4,
    name: "Producer Club Funnel",
    description: "Convert customers into monthly subscribers",
    icon: Users,
    steps: ["Landing Page", "Membership Benefits", "Pricing", "Registration"],
    conversion: "8%"
  }
];

const activeFunnels = [
  {
    id: 1,
    name: "Summer Beat Pack",
    type: "Bundle Deal",
    visitors: 1243,
    conversions: 86,
    revenue: 2580
  },
  {
    id: 2,
    name: "Free Trap Samples",
    type: "Lead Magnet",
    visitors: 2891,
    conversions: 644,
    revenue: 1890
  }
];

const ProducerFunnels = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Funnels</h1>
            <p className="text-muted-foreground">Create and manage your sales funnels</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Funnel
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$4,470</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <GitFork className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18.2%</div>
                  <p className="text-xs text-muted-foreground">+2.4% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Funnels</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">+2 new this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Email Subscribers</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,844</div>
                  <p className="text-xs text-muted-foreground">+312 this month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeFunnels.map((funnel) => (
                <Card key={funnel.id}>
                  <CardHeader>
                    <CardTitle>{funnel.name}</CardTitle>
                    <CardDescription>{funnel.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Visitors</span>
                        <span className="font-medium">{funnel.visitors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conversions</span>
                        <span className="font-medium">{funnel.conversions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue</span>
                        <span className="font-medium">${funnel.revenue}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {funnelTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    selectedTemplate === template.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <template.icon className="h-8 w-8 text-primary" />
                        <div>
                          <CardTitle>{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Avg. Conversion:</span>
                        <span className="font-medium text-green-600">{template.conversion}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      {template.steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                          <div className="px-3 py-1 bg-muted rounded-md text-sm">
                            {step}
                          </div>
                          {index < template.steps.length - 1 && (
                            <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Funnel Performance</CardTitle>
                <CardDescription>Track and analyze your funnel metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">Analytics visualization will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Funnel Automation</CardTitle>
                <CardDescription>Set up automated actions for your funnels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-4 border rounded-lg">
                    <Sparkles className="h-8 w-8 text-primary mr-4" />
                    <div>
                      <h3 className="font-semibold">Email Follow-up Sequence</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatically send personalized emails based on user actions
                      </p>
                    </div>
                    <Button variant="outline" className="ml-auto">Configure</Button>
                  </div>
                  <div className="flex items-center p-4 border rounded-lg">
                    <Gift className="h-8 w-8 text-primary mr-4" />
                    <div>
                      <h3 className="font-semibold">Smart Upsell System</h3>
                      <p className="text-sm text-muted-foreground">
                        Show personalized offers based on customer behavior
                      </p>
                    </div>
                    <Button variant="outline" className="ml-auto">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProducerFunnels;
