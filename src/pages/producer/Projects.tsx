import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateProjectDialog } from "@/components/projects/CreateProjectDialog";
import { ProjectDetailsDialog } from "@/components/projects/ProjectDetailsDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";

type Project = {
  id: string;
  name: string;
  description: string | null;
  deadline: string | null;
  status: string;
  created_by: string;
  client_id: string | null;
  profiles: {
    full_name: string | null;
  } | null;
};

const ProducerProjects = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) return;

      const { data: active, error: activeError } = await supabase
        .from("collaboration_projects")
        .select(`
          *,
          profiles:created_by (
            full_name
          )
        `)
        .eq("created_by", session.session.user.id)
        .eq("status", "active");

      const { data: completed, error: completedError } = await supabase
        .from("collaboration_projects")
        .select(`
          *,
          profiles:created_by (
            full_name
          )
        `)
        .eq("created_by", session.session.user.id)
        .eq("status", "completed");

      if (activeError) throw activeError;
      if (completedError) throw completedError;

      setActiveProjects(active || []);
      setCompletedProjects(completed || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from("collaboration_projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleCompleteProject = async (projectId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("collaboration_projects")
        .update({ 
          status: "completed",
          updated_at: new Date().toISOString()
        })
        .eq("id", projectId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project marked as completed",
      });

      // Move the project from active to completed list
      const completedProject = activeProjects.find(p => p.id === projectId);
      if (completedProject) {
        setActiveProjects(prev => prev.filter(p => p.id !== projectId));
        setCompletedProjects(prev => [...prev, { ...completedProject, status: 'completed' }]);
      }
    } catch (error: any) {
      console.error("Error completing project:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const ProjectTable = ({ projects }: { projects: Project[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No projects
            </TableCell>
          </TableRow>
        ) : (
          projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>
                {project.deadline
                  ? format(new Date(project.deadline), "PPP")
                  : "No deadline"}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      setSelectedProject(project);
                      setDetailsOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {project.status === "active" && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={isLoading}
                        onClick={() => handleCompleteProject(project.id)}
                      >
                        {isLoading ? "Completing..." : "Complete"}
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => {
                          toast({
                            title: "Coming Soon",
                            description: "Edit functionality will be added soon",
                          });
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Projects</h1>
          <CreateProjectDialog />
        </div>
        
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed Projects</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectTable projects={activeProjects} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectTable projects={completedProjects} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ProjectDetailsDialog
          project={selectedProject}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProducerProjects;