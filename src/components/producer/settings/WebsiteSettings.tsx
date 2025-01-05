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

const websiteSettingsSchema = z.object({
  custom_domain: z.string().optional(),
  google_analytics_id: z.string().optional(),
  meta_description: z.string().max(160).optional(),
  meta_keywords: z.string().optional(),
});

export function WebsiteSettings() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof websiteSettingsSchema>>({
    resolver: zodResolver(websiteSettingsSchema),
    defaultValues: {
      custom_domain: "",
      google_analytics_id: "",
      meta_description: "",
      meta_keywords: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof websiteSettingsSchema>) => {
    toast({
      title: "Success",
      description: "Website settings have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="custom_domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Domain</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="www.yourdomain.com" />
                  </FormControl>
                  <FormDescription>
                    Your custom domain for the producer website
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="google_analytics_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Analytics ID</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="UA-XXXXXXXXX-X" />
                  </FormControl>
                  <FormDescription>
                    Track website traffic with Google Analytics
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    SEO description for your website
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meta_keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Keywords</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="music, producer, beats" />
                  </FormControl>
                  <FormDescription>
                    Comma-separated keywords for SEO
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save Website Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}