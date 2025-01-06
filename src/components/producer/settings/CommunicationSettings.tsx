import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const emailSettingsSchema = z.object({
  email_notifications: z.boolean(),
  reply_to_email: z.string().email().optional().or(z.literal("")),
  email_signature: z.string().max(500).optional(),
});

export function CommunicationSettings() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof emailSettingsSchema>>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      email_notifications: true,
      reply_to_email: "",
      email_signature: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof emailSettingsSchema>) => {
    // Here we'll implement the email settings update logic
    toast({
      title: "Success",
      description: "Email settings have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email_notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Email Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive email notifications for important updates
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reply_to_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reply-to Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="your@email.com" />
                  </FormControl>
                  <FormDescription>
                    Email address for client responses
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email_signature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Signature</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your professional signature" />
                  </FormControl>
                  <FormDescription>
                    This will be added to all your outgoing emails
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save Email Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}