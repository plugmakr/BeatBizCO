import { DataTable } from "@/components/ui/data-table";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_management (
            status,
            last_login,
            login_count
          )
        `);

      if (error) throw error;
      setUsers(profiles || []);
    } catch (error) {
      toast({
        title: "Error fetching users",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const columns = [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "full_name",
      header: "Full Name",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "user_management.status",
      header: "Status",
    },
    {
      accessorKey: "user_management.last_login",
      header: "Last Login",
      cell: ({ row }) => {
        const date = row.original.user_management?.last_login;
        return date ? new Date(date).toLocaleDateString() : "Never";
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
                  // TODO: Implement edit functionality
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  // TODO: Implement delete functionality
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
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button>Add User</Button>
        </div>
        <DataTable columns={columns} data={users} />
      </div>
    </AdminLayout>
  );
}