
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MessagesInbox } from "@/components/producer/messages/MessagesInbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Mail, Bot, Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Messages() {
  const { data: notifications, isLoading: notificationsLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select(`
          id,
          type,
          content,
          is_read,
          created_at
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error);
        throw error;
      }
      return data;
    },
  });

  const markAsRead = async (notificationId: string) => {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId);

    if (error) {
      console.error("Error marking notification as read:", error);
    }
  };

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
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <ScrollArea className="h-[600px]">
                <div className="p-4 space-y-2">
                  {notificationsLoading ? (
                    <div className="text-center text-muted-foreground">
                      Loading notifications...
                    </div>
                  ) : notifications?.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                      No notifications yet
                    </div>
                  ) : (
                    notifications?.map((notification: any) => (
                      <div key={notification.id}>
                        <div
                          className={`p-4 rounded-lg ${
                            notification.is_read
                              ? "bg-background"
                              : "bg-accent"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{notification.type}</p>
                              <p className="text-sm text-muted-foreground">
                                {notification.content}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(notification.created_at).toLocaleString()}
                              </p>
                            </div>
                            {!notification.is_read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                        <Separator className="my-2" />
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
