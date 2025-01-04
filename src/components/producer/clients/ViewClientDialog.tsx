import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Client } from "@/types/database";

interface ViewClientDialogProps {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewClientDialog({ client, open, onOpenChange }: ViewClientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Client Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4 p-4">
            <div>
              <h3 className="font-semibold">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p>{client.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{client.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{client.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p>{client.website}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold">Project Details</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Genre Focus</p>
                  <p>{client.genre_focus}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget Range</p>
                  <p>{client.budget_range}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Project Type</p>
                  <p>{client.project_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Social Media</p>
                  <p>{client.social_media}</p>
                </div>
              </div>
            </div>

            {client.notes && (
              <div>
                <h3 className="font-semibold">Additional Notes</h3>
                <p className="mt-2 whitespace-pre-wrap">{client.notes}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}