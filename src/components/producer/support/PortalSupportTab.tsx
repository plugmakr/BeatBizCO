import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FileText, Video, HelpCircle, MessageSquare } from "lucide-react";

export function PortalSupportTab() {
  const { toast } = useToast();
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ticket Submitted",
      description: "We'll get back to you within 24 hours.",
    });
    setTicketSubject("");
    setTicketMessage("");
  };

  return (
    <div className="space-y-4">
      {/* Knowledge Base */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Access comprehensive guides for all platform features.
            </p>
            <Button variant="outline" className="w-full">View Docs</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-5 w-5" />
              Tutorial Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Watch step-by-step video guides for the platform.
            </p>
            <Button variant="outline" className="w-full">Watch Tutorials</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Community Forum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with other producers and share tips.
            </p>
            <Button variant="outline" className="w-full">Join Discussion</Button>
          </CardContent>
        </Card>
      </div>

      {/* Submit Portal Support Ticket */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Support Ticket to BeatBiz</CardTitle>
          <CardDescription>
            Having issues with the platform? Our team is here to help.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="subject">Subject</label>
              <Input
                id="subject"
                placeholder="Brief description of your issue"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message">Message</label>
              <Textarea
                id="message"
                placeholder="Detailed explanation of your issue"
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                required
                className="min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="attachments">Attachments (optional)</label>
              <Input
                id="attachments"
                type="file"
                multiple
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground">
                Upload screenshots or relevant files (max 10MB each)
              </p>
            </div>
            <Button type="submit">Submit Ticket</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}