import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddClientDialog } from "@/components/producer/clients/AddClientDialog";
import { ViewClientDialog } from "@/components/producer/clients/ViewClientDialog";
import { EditClientDialog } from "@/components/producer/clients/EditClientDialog";
import { SendMessageDialog } from "@/components/producer/clients/SendMessageDialog";
import { ClientStats } from "@/components/producer/clients/ClientStats";
import { ClientTableRow } from "@/components/producer/clients/ClientTableRow";
import { supabase } from "@/integrations/supabase/client";
import type { Client } from "@/types/database";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
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
import { UserPlus, Search } from "lucide-react";
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

  const { data: clients, isLoading, refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('producer_id', user.user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Client[];
    }
  });

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

        <ClientStats clients={clients} />

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
                  ) : clients?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No clients found
                      </TableCell>
                    </TableRow>
                  ) : (
                    clients?.filter(client =>
                      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      client.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      client.genre_focus?.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((client) => (
                      <ClientTableRow
                        key={client.id}
                        client={client}
                        onView={(client) => {
                          setSelectedClient(client);
                          setIsViewingClient(true);
                        }}
                        onEdit={(client) => {
                          setSelectedClient(client);
                          setIsEditingClient(true);
                        }}
                        onMessage={(client) => {
                          setSelectedClient(client);
                          setIsSendingMessage(true);
                        }}
                        onDelete={(client) => {
                          setSelectedClient(client);
                          setIsConfirmingDelete(true);
                        }}
                      />
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
