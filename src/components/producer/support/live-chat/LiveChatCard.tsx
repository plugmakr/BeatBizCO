import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users } from "lucide-react";

export function LiveChatCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">Live Chat</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Chat with customers in real-time
          </p>
        </div>
        <Badge variant="default" className="bg-green-500">
          <Users className="mr-1 h-4 w-4" />
          2 Online
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">
                  Viewing: Beat Package #1
                </p>
              </div>
            </div>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Chat
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <div>
                <p className="font-medium">Alice Brown</p>
                <p className="text-sm text-muted-foreground">
                  Viewing: Licensing Page
                </p>
              </div>
            </div>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Chat
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}