import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClientForm } from "./ClientForm";
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
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        website: formData.get('website') as string,
        budget_range: formData.get('budget_range') as string,
        genre_focus: formData.get('genre_focus') as string,
        project_type: formData.get('project_type') as string,
        social_media: formData.get('social_media') as string,
        notes: formData.get('notes') as string,
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