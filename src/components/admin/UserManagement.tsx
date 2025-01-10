import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, UserCheck, UserX } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  auth_users: {
    email: string;
    created_at: string;
  };
};

type UserRole = "producer" | "artist" | "buyer" | "admin";

export function UserManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  // Fetch users with their profiles
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users', selectedRole],
    queryFn: async () => {
      const query = supabase
        .from('profiles')
        .select('*, auth_users:id(email, created_at)');

      if (selectedRole) {
        query.eq('role', selectedRole);
      }

      const { data, error } = await query;
      
      if (error) {
        toast({
          title: "Error fetching users",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      // Validate and transform the data to ensure it matches our Profile type
      const validatedData = data?.map(user => {
        if (!user.auth_users) {
          return {
            ...user,
            auth_users: {
              email: 'No email available',
              created_at: user.created_at
            }
          };
        }
        return user;
      });
      
      return validatedData as Profile[];
    },
  });

  // Update user role mutation
  const updateUserRole = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string, newRole: UserRole }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "User role updated",
        description: "The user's role has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating user role",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Ban user mutation
  const banUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        ban_duration: 'infinite'
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "User banned",
        description: "The user has been successfully banned.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error banning user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Management</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={selectedRole === null ? "default" : "outline"}
            onClick={() => setSelectedRole(null)}
          >
            All
          </Button>
          <Button
            variant={selectedRole === "producer" ? "default" : "outline"}
            onClick={() => setSelectedRole("producer")}
          >
            Producers
          </Button>
          <Button
            variant={selectedRole === "artist" ? "default" : "outline"}
            onClick={() => setSelectedRole("artist")}
          >
            Artists
          </Button>
          <Button
            variant={selectedRole === "buyer" ? "default" : "outline"}
            onClick={() => setSelectedRole("buyer")}
          >
            Buyers
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.full_name || 'Unnamed'}</span>
                    <span className="text-sm text-muted-foreground">
                      {user.auth_users?.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    Active
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          updateUserRole.mutate({
                            userId: user.id,
                            newRole: user.role === 'producer' ? 'artist' : 'producer'
                          });
                        }}
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => banUser.mutate(user.id)}
                        className="text-red-600"
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Ban User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}