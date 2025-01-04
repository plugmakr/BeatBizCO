import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, UserPlus } from "lucide-react";

interface ProjectClientProps {
  project: {
    id: string;
    client_id: string | null;
  };
}

export default function ProjectClient({ project }: ProjectClientProps) {
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(
    project.client_id
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: clients, isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const { data: currentClient } = useQuery({
    queryKey: ["client", project.client_id],
    queryFn: async () => {
      if (!project.client_id) return null;
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", project.client_id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!project.client_id,
  });

  const createClientMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .insert([{ name: newClientName, email: newClientEmail }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (newClient) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setSelectedClientId(newClient.id);
      setNewClientName("");
      setNewClientEmail("");
      toast({
        title: "Success",
        description: "Client created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create client",
        variant: "destructive",
      });
    },
  });

  const updateProjectClientMutation = useMutation({
    mutationFn: async (clientId: string | null) => {
      const { error } = await supabase
        .from("collaboration_projects")
        .update({ client_id: clientId })
        .eq("id", project.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    },
  });

  const handleCreateClient = () => {
    if (!newClientName.trim()) return;
    createClientMutation.mutate();
  };

  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId);
    updateProjectClientMutation.mutate(clientId);
  };

  if (isLoadingClients) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-[#2A2F3C] border-[#9b87f5]/20">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">
                Current Client
              </h3>
              <Select
                value={selectedClientId || undefined}
                onValueChange={handleClientChange}
              >
                <SelectTrigger className="bg-[#1A1F2C] border-[#9b87f5]/20">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Client</SelectItem>
                  {clients?.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">Create New Client</h3>
              <Input
                placeholder="Client name"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                className="bg-[#1A1F2C] border-[#9b87f5]/20"
              />
              <Input
                placeholder="Client email"
                type="email"
                value={newClientEmail}
                onChange={(e) => setNewClientEmail(e.target.value)}
                className="bg-[#1A1F2C] border-[#9b87f5]/20"
              />
              <Button
                onClick={handleCreateClient}
                disabled={createClientMutation.isPending || !newClientName.trim()}
                className="w-full bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
              >
                {createClientMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                Create Client
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}