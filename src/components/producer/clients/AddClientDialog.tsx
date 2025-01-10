import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ClientForm from "./ClientForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Client } from "@/types/database";

interface AddClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddClientDialog({ isOpen, onClose, onSuccess }: AddClientDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.id) {
        throw new Error("No authenticated user");
      }

      const clientData = {
        name: String(formData.get('name')),
        email: formData.get('email') ? String(formData.get('email')) : null,
        phone: formData.get('phone') ? String(formData.get('phone')) : null,
        website: formData.get('website') ? String(formData.get('website')) : null,
        budget_range: formData.get('budget_range') ? String(formData.get('budget_range')) : null,
        genre_focus: formData.get('genre_focus') ? String(formData.get('genre_focus')) : null,
        project_type: formData.get('project_type') ? String(formData.get('project_type')) : null,
        social_media: formData.get('social_media') ? String(formData.get('social_media')) : null,
        notes: formData.get('notes') ? String(formData.get('notes')) : null,
        producer_id: session.session.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('clients')
        .insert([clientData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Client added successfully",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding client:', error);
      toast({
        title: "Error",
        description: "Failed to add client. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <ClientForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}