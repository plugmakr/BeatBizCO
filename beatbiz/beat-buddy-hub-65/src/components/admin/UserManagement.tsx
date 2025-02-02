import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MoreHorizontal, Plus, Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface User {
  id: string
  email: string
  role: 'guest' | 'artist' | 'producer' | 'admin'
  created_at: string
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({ email: "", password: "", role: "guest" as const })
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)

      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, role, created_at, auth.users!inner(email)')
        .order('created_at', { ascending: false })

      if (error) {
        toast({
          title: "Error fetching users",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      setUsers(profiles.map(profile => ({
        id: profile.id,
        email: profile.users?.email || '',
        role: profile.role,
        created_at: profile.created_at
      })))

    } catch (error: any) {
      toast({
        title: "Error fetching users",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddUser = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
        options: {
          data: {
            role: newUser.role
          }
        }
      })

      if (error) {
        if (error.message.includes('already exists')) {
          toast({
            title: "Error creating user",
            description: "A user with this email already exists",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Error creating user",
            description: error.message,
            variant: "destructive",
          })
        }
        return
      }

      if (!data.user) {
        toast({
          title: "Error creating user",
          description: "Failed to create user",
          variant: "destructive",
        })
        return
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          role: newUser.role,
        })

      if (profileError) {
        toast({
          title: "Error setting user role",
          description: profileError.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "User created successfully",
        description: "An email has been sent for verification.",
      })
      setIsAddDialogOpen(false)
      setNewUser({ email: "", password: "", role: "guest" })
      fetchUsers()

    } catch (error: any) {
      toast({
        title: "Error creating user",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleEditUser = async () => {
    if (!selectedUser) return

    const { error } = await supabase
      .from('profiles')
      .update({ role: selectedUser.role })
      .eq('id', selectedUser.id)

    if (error) {
      toast({
        title: "Error updating user",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({ title: "User updated successfully" })
      setIsEditDialogOpen(false)
      setSelectedUser(null)
      fetchUsers()
    }
  }

  const handleDeleteUser = async (userId: string) => {
    const { error } = await supabase.auth.admin.deleteUser(userId)

    if (error) {
      toast({
        title: "Error deleting user",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({ title: "User deleted successfully" })
      fetchUsers()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: 'guest' | 'artist' | 'producer' | 'admin') =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guest">Guest</SelectItem>
                    <SelectItem value="artist">Artist</SelectItem>
                    <SelectItem value="producer">Producer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddUser}>Add User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" value={selectedUser.email} disabled />
              </div>
              <div>
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value: 'guest' | 'artist' | 'producer' | 'admin') =>
                    setSelectedUser({ ...selectedUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guest">Guest</SelectItem>
                    <SelectItem value="artist">Artist</SelectItem>
                    <SelectItem value="producer">Producer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleEditUser}>Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}