import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail } from "lucide-react";
import { TicketsList } from "./tickets/TicketsList";
import { CannedResponses } from "./canned-responses/CannedResponses";
import { LiveChatCard } from "./live-chat/LiveChatCard";

export function CustomerSupportTab() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">24</CardTitle>
            <CardDescription>Total Active Tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              12% increase from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">2.5h</CardTitle>
            <CardDescription>Average Response Time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              30min faster than last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">98%</CardTitle>
            <CardDescription>Customer Satisfaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Based on last 100 responses
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Tools */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <TicketsList />
          <CannedResponses />
        </div>
        <div className="space-y-6">
          <LiveChatCard />
          
          {/* Support Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Support Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 5:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 2:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}