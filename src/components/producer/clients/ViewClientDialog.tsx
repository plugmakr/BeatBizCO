import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Client } from "@/types/database";
import { ClientFiles } from "./ClientFiles";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ViewClientDialogProps {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewClientDialog({ client, open, onOpenChange }: ViewClientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Client Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1">
          <div className="space-y-6 pr-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Name</h3>
                <p>{client.name}</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{client.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>{client.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Website</h3>
                <p>{client.website}</p>
              </div>
              <div>
                <h3 className="font-semibold">Budget Range</h3>
                <p>{client.budget_range}</p>
              </div>
              <div>
                <h3 className="font-semibold">Genre Focus</h3>
                <p>{client.genre_focus}</p>
              </div>
              <div>
                <h3 className="font-semibold">Project Type</h3>
                <p>{client.project_type}</p>
              </div>
              <div>
                <h3 className="font-semibold">Social Media</h3>
                <p>{client.social_media}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Notes</h3>
              <p>{client.notes}</p>
            </div>
            <ClientFiles client={client} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}