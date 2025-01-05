import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, Phone, Mail, HelpCircle } from "lucide-react";

export function CustomerSupportTab() {
  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">Customer Messages</CardTitle>
            <CardDescription>View and manage customer inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              View Messages
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">Support Hours</CardTitle>
            <CardDescription>Set your availability</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Manage Hours
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">Auto-Responses</CardTitle>
            <CardDescription>Configure automatic replies</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Setup Responses
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Management */}
      <Card>
        <CardHeader>
          <CardTitle>Customer FAQ Management</CardTitle>
          <CardDescription>
            Manage frequently asked questions that appear on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I add new FAQs to my website?
              </AccordionTrigger>
              <AccordionContent>
                Use the FAQ manager to add, edit, or remove questions that your customers
                commonly ask. These will be displayed on your website's support section.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Can I customize response templates?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Create templates for common responses to save time when replying
                to customer inquiries. Access this feature in the Auto-Responses section.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How do I set up automated responses?
              </AccordionTrigger>
              <AccordionContent>
                Configure automated responses for common questions or during off-hours.
                This helps maintain quick response times for your customers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}