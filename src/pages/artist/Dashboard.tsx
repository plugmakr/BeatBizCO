import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Music, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const ArtistDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Artist Dashboard</h1>
          <p className="text-muted-foreground">Manage your music and collaborations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Music className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Released Tracks</span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold">12</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Purchased Beats</span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold">8</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Collaborations</span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold">5</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Active Projects</span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold">3</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Purchases */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Beat Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((purchase) => (
                  <div key={purchase} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Summer Vibes Beat</h3>
                      <p className="text-sm text-muted-foreground">Purchased 2 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
                <Link to="/artist/browse">
                  <Button className="w-full">Browse More Beats</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Releases */}
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Releases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((release) => (
                  <div key={release} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Night Drive</h3>
                      <p className="text-sm text-muted-foreground">Released 1 week ago</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      1.2k plays
                    </div>
                  </div>
                ))}
                <Link to="/artist/releases">
                  <Button className="w-full">Manage Releases</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((project) => (
                <div key={project} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">New Album Project</h3>
                    <p className="text-sm text-muted-foreground">
                      Collaborating with: Metro Boomin
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-yellow-500">In Progress</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
              <Button className="w-full">Start New Project</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ArtistDashboard;