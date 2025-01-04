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
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        website: String(formData.get('website') || ''),
        budget_range: String(formData.get('budget_range') || ''),
        genre_focus: String(formData.get('genre_focus') || ''),
        project_type: String(formData.get('project_type') || ''),
        social_media: String(formData.get('social_media') || ''),
        notes: String(formData.get('notes') || ''),
        producer_id: session.session.user.id
      };

      const { error } = await supabase.from('clients').insert(clientData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Client added successfully",
      });

      onSuccess();
      onClose();
    } catch (error) {
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