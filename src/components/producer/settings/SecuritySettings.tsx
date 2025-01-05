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
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const securitySettingsSchema = z.object({
  two_factor_auth: z.boolean(),
  session_timeout: z.string(),
  ip_whitelist: z.string().optional(),
  login_notifications: z.boolean(),
});

export function SecuritySettings() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof securitySettingsSchema>>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      two_factor_auth: false,
      session_timeout: "24h",
      ip_whitelist: "",
      login_notifications: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof securitySettingsSchema>) => {
    toast({
      title: "Success",
      description: "Security settings have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="two_factor_auth"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Two-Factor Authentication
                    </FormLabel>
                    <FormDescription>
                      Enable two-factor authentication for added security
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
              name="session_timeout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Timeout</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    How long until your session expires
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ip_whitelist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IP Whitelist</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Comma-separated IP addresses" />
                  </FormControl>
                  <FormDescription>
                    Restrict access to specific IP addresses
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="login_notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Login Notifications
                    </FormLabel>
                    <FormDescription>
                      Get notified of new login attempts
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

            <Button type="submit">Save Security Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}