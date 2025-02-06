
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
  full_name?: string;
  username?: string;
}

interface CreateUserForm {
  email: string;
  password: string;
  full_name: string;
  username: string;
  role: string;
}

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [updating, setUpdating] = useState(false);
  const [createForm, setCreateForm] = useState<CreateUserForm>({
    email: "",
    password: "",
    full_name: "",
    username: "",
    role: "artist",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Get profiles first
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get auth users
      const { data, error: authError } = await supabase.auth.admin.listUsers();
      if (authError) throw authError;

      // Merge profile and auth data
      const mergedUsers = profiles?.map(profile => {
        const authUser = data.users.find(u => u.id === profile.id);
        return {
          ...profile,
          email: authUser?.email || 'No email',
          username: profile.username || authUser?.user_metadata?.username || 'Not set',
          full_name: profile.full_name || authUser?.user_metadata?.full_name || 'Not set',
          role: profile.role || authUser?.user_metadata?.role || 'artist'
        };
      }) || [];

      setUsers(mergedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error fetching users",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!createForm.email || !createForm.password) {
      toast({
        title: "Validation Error",
        description: "Email and password are required",
        variant: "destructive",
      });
      return;
    }

    setUpdating(true);
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: createForm.email,
        password: createForm.password,
        email_confirm: true,
        user_metadata: {
          full_name: createForm.full_name,
          username: createForm.username,
          role: createForm.role,
        },
      });

      if (authError) throw authError;

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          role: createForm.role,
          full_name: createForm.full_name,
          username: createForm.username,
        });

      if (profileError) throw profileError;

      toast({
        title: "User created",
        description: "New user has been created successfully.",
      });

      // Reset form and refresh users list
      setCreateForm({
        email: "",
        password: "",
        full_name: "",
        username: "",
        role: "artist",
      });
      setCreateDialogOpen(false);
      await fetchUsers();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: "Error creating user",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleRoleChange = async () => {
    if (!selectedUser || !selectedRole) return;
    
    setUpdating(true);
    try {
      // Update profile role
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: selectedRole })
        .eq('id', selectedUser.id);

      if (profileError) throw profileError;

      // Update auth metadata
      const { error: authError } = await supabase.auth.admin.updateUserById(
        selectedUser.id,
        { user_metadata: { role: selectedRole } }
      );

      if (authError) throw authError;

      toast({
        title: "Role updated",
        description: "User role has been updated successfully.",
      });

      await fetchUsers();
      setEditDialogOpen(false);
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast({
        title: "Error updating role",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      // Delete from profiles first
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;

      // Then delete from auth
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      if (authError) throw authError;

      toast({
        title: "User deleted",
        description: "User has been deleted successfully.",
      });

      await fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error deleting user",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">User Management</h2>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={createForm.full_name}
                  onChange={(e) => setCreateForm({ ...createForm, full_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={createForm.username}
                  onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={createForm.role}
                  onValueChange={(value) => setCreateForm({ ...createForm, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="producer">Producer</SelectItem>
                    <SelectItem value="artist">Artist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateUser}
                disabled={updating || !createForm.email || !createForm.password}
              >
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create User'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.full_name}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Dialog 
                    open={editDialogOpen && selectedUser?.id === user.id} 
                    onOpenChange={(open) => {
                      setEditDialogOpen(open);
                      if (open) {
                        setSelectedUser(user);
                        setSelectedRole(user.role);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User Role</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Current Role: <span className="capitalize">{user.role}</span></p>
                          <p className="text-sm font-medium">Select New Role</p>
                          <Select
                            value={selectedRole}
                            onValueChange={setSelectedRole}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="producer">Producer</SelectItem>
                              <SelectItem value="artist">Artist</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleRoleChange} 
                          disabled={updating || selectedRole === user.role}
                        >
                          {updating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export { UserManagement };
