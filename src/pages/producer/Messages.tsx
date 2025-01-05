import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MessagesInbox } from "@/components/producer/messages/MessagesInbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Mail, Bot, Bell } from "lucide-react";

export default function Messages() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Messages</h1>
        </div>

        <Tabs defaultValue="inbox" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="inbox" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Inbox</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inbox" className="mt-6">
            <MessagesInbox />
          </TabsContent>

          <TabsContent value="email" className="mt-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Email Integration</h3>
              <p className="text-muted-foreground">
                Email integration will be configured in the Settings page. Once configured, 
                all your email communications will appear here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Support Bot</h3>
              <p className="text-muted-foreground">
                AI-powered support bot will be available here to help answer common questions 
                and assist your clients.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <p className="text-muted-foreground">
                System notifications and important updates will be displayed here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}