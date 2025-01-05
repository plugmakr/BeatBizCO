import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function FunnelAnalytics() {
  return (
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
  );
}