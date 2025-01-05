import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import { ClientFile } from "@/types/database";

export default function Projects() {
  const [projects, setProjects] = useState<ClientFile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('client_files')
        .select('*')
        .eq('type', 'folder')
        .eq('uploaded_by', session.user.id)
        .is('parent_id', null);

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast({
        title: "Error fetching projects",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const columns = [
    {
      accessorKey: "display_name",
      header: "Project Name",
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => {
        return new Date(row.original.created_at || "").toLocaleDateString();
      },
    },
    {
      accessorKey: "updated_at",
      header: "Last Modified",
      cell: ({ row }) => {
        return new Date(row.original.updated_at || "").toLocaleDateString();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  // Navigate to project details
                  window.location.href = `/producer/projects/${row.original.id}`;
                }}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // Open sharing modal
                }}
              >
                Share
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  // Delete project
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
        <DataTable columns={columns} data={projects} />
      </div>
    </DashboardLayout>
  );
}