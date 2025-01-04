import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddClientDialog } from "@/components/producer/clients/AddClientDialog";
import { ViewClientDialog } from "@/components/producer/clients/ViewClientDialog";
import { EditClientDialog } from "@/components/producer/clients/EditClientDialog";
import { SendMessageDialog } from "@/components/producer/clients/SendMessageDialog";
import { supabase } from "@/integrations/supabase/client";
import type { Client } from "@/types/database";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  UserPlus,
  Search,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  User,
  Users,
  DollarSign,
  Activity,
  Globe,
  Eye,
  Edit,
  MessageSquare,
  Trash
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const ProducerClients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isViewingClient, setIsViewingClient] = useState(false);
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const { toast } = useToast();

  // Fetch clients data
  const { data: clients, isLoading, refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Client[];
    }
  });

  // Stats cards data
  const stats = [
    {
      title: "Total Clients",
      value: clients?.length || 0,
      icon: Users,
      description: "Active clients in your roster"
    },
    {
      title: "New This Month",
      value: clients?.filter(c => 
        new Date(c.created_at).getMonth() === new Date().getMonth()
      ).length || 0,
      icon: UserPlus,
      description: "Clients added this month"
    },
    {
      title: "Average Revenue",
      value: "$2,450",
      icon: DollarSign,
      description: "Per client revenue"
    },
    {
      title: "Engagement Rate",
      value: "85%",
      icon: Activity,
      description: "Client interaction rate"
    }
  ];

  // Filter clients based on search query
  const filteredClients = clients?.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.genre_focus?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClient = async () => {
    if (!selectedClient) return;

    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', selectedClient.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Client deleted successfully",
      });

      refetch();
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: "Error",
        description: "Failed to delete client",
        variant: "destructive",
      });
    } finally {
      setIsConfirmingDelete(false);
      setSelectedClient(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-muted-foreground">Manage your client relationships</p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsAddingClient(true)}
          >
            <UserPlus className="h-4 w-4" />
            Add Client
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Table */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Loading clients...
                      </TableCell>
                    </TableRow>
                  ) : filteredClients?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No clients found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredClients?.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{client.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span className="text-sm">{client.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span className="text-sm">{client.phone}</span>
                            </div>
                            {client.website && (
                              <div className="flex items-center space-x-2">
                                <Globe className="h-4 w-4" />
                                <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                                  Website
                                </a>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">Genre: {client.genre_focus}</div>
                            <div className="text-sm">Budget: {client.budget_range}</div>
                            <div className="text-sm">Type: {client.project_type}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  // Prevent the cell from becoming editable
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-background">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedClient(client);
                                  setIsViewingClient(true);
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedClient(client);
                                  setIsEditingClient(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Client
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedClient(client);
                                  setIsSendingMessage(true);
                                }}
                              >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedClient(client);
                                  setIsConfirmingDelete(true);
                                }}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Remove Client
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddClientDialog
        isOpen={isAddingClient}
        onClose={() => setIsAddingClient(false)}
        onSuccess={() => {
          refetch();
          setIsAddingClient(false);
        }}
      />

      {selectedClient && (
        <>
          <ViewClientDialog
            client={selectedClient}
            open={isViewingClient}
            onOpenChange={setIsViewingClient}
          />

          <EditClientDialog
            client={selectedClient}
            open={isEditingClient}
            onOpenChange={setIsEditingClient}
            onSuccess={() => {
              refetch();
              setIsEditingClient(false);
            }}
          />

          <SendMessageDialog
            client={selectedClient}
            open={isSendingMessage}
            onOpenChange={setIsSendingMessage}
          />

          <AlertDialog open={isConfirmingDelete} onOpenChange={setIsConfirmingDelete}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the client
                  and remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteClient}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </DashboardLayout>
  );
};

export default ProducerClients;
