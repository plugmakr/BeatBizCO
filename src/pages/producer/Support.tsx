import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  FileText,
  BookOpen,
  Video,
  Headphones,
  Settings,
  Users,
} from "lucide-react";

const ProducerSupport = () => {
  const { toast } = useToast();
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the ticket to your support system
    toast({
      title: "Ticket Submitted",
      description: "We'll get back to you within 24 hours.",
    });
    setTicketSubject("");
    setTicketMessage("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Support Center</h1>
          <p className="text-muted-foreground mt-2">
            Get help with your producer account and platform features
          </p>
        </div>

        <Tabs defaultValue="customer" className="space-y-4">
          <TabsList>
            <TabsTrigger value="customer">Customer Support</TabsTrigger>
            <TabsTrigger value="portal">Portal Support</TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="space-y-4">
            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg">Live Chat</CardTitle>
                  <CardDescription>Connect with support instantly</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg">Schedule Call</CardTitle>
                  <CardDescription>Book a support call</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Book Time
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg">Email Support</CardTitle>
                  <CardDescription>Get help via email</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Quick answers to common questions about working with clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How do I share files with my clients?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can share files with clients through the client portal. Navigate to the
                      Clients section, select your client, and use the file upload feature to
                      share files securely.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How do I process payments?
                    </AccordionTrigger>
                    <AccordionContent>
                      We support multiple payment methods including credit cards and PayPal.
                      Go to the Finances section to set up your payment preferences and view
                      transaction history.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Can I customize my producer profile?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes! Visit your Profile settings to customize your bio, profile picture,
                      social links, and showcase your best work.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Submit Ticket */}
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>
                  Need more help? Submit a ticket and we'll respond within 24 hours.
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
                    />
                  </div>
                  <Button type="submit">Submit Ticket</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portal" className="space-y-4">
            {/* Knowledge Base */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive guides and documentation for all platform features.
                  </p>
                  <Button variant="outline" className="w-full">View Docs</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="mr-2 h-5 w-5" />
                    Video Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Step-by-step video guides for using the platform effectively.
                  </p>
                  <Button variant="outline" className="w-full">Watch Tutorials</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn from successful producers and optimize your workflow.
                  </p>
                  <Button variant="outline" className="w-full">Learn More</Button>
                </CardContent>
              </Card>
            </div>

            {/* Technical Support */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Support Resources</CardTitle>
                <CardDescription>
                  Get help with technical issues and platform functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Settings className="h-5 w-5 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">System Requirements</h4>
                        <p className="text-sm text-muted-foreground">
                          Check recommended specs and browser compatibility
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Headphones className="h-5 w-5 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Audio Setup Guide</h4>
                        <p className="text-sm text-muted-foreground">
                          Configure your audio settings for optimal performance
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Collaboration Tools</h4>
                        <p className="text-sm text-muted-foreground">
                          Learn about our real-time collaboration features
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <HelpCircle className="h-5 w-5 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Troubleshooting</h4>
                        <p className="text-sm text-muted-foreground">
                          Common issues and their solutions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProducerSupport;