import { useState } from "react";
import { ClientForm } from "./ClientForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Client } from "@/types/database";

interface EditClientDialogProps {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditClientDialog({ client, open, onOpenChange, onSuccess }: EditClientDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('clients')
        .update({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          website: formData.get('website'),
          budget_range: formData.get('budget_range'),
          genre_focus: formData.get('genre_focus'),
          project_type: formData.get('project_type'),
          social_media: formData.get('social_media'),
          notes: formData.get('notes'),
        })
        .eq('id', client.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Client updated successfully",
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating client:', error);
      toast({
        title: "Error",
        description: "Failed to update client",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        <ClientForm 
          onSubmit={handleSubmit} 
          isLoading={isLoading}
          defaultValues={{
            name: client.name,
            email: client.email || '',
            phone: client.phone || '',
            website: client.website || '',
            budget_range: client.budget_range || '',
            genre_focus: client.genre_focus || '',
            project_type: client.project_type || '',
            social_media: client.social_media || '',
            notes: client.notes || '',
          }}
        />
      </DialogContent>
    </Dialog>
  );
}