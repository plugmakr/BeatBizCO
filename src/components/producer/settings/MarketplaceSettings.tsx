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

const marketplaceSettingsSchema = z.object({
  auto_watermark: z.boolean(),
  default_license_type: z.string(),
  default_price: z.string(),
  auto_generate_preview: z.boolean(),
});

export function MarketplaceSettings() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof marketplaceSettingsSchema>>({
    resolver: zodResolver(marketplaceSettingsSchema),
    defaultValues: {
      auto_watermark: true,
      default_license_type: "Basic License",
      default_price: "29.99",
      auto_generate_preview: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof marketplaceSettingsSchema>) => {
    toast({
      title: "Success",
      description: "Marketplace settings have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketplace Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="auto_watermark"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Automatic Watermarking
                    </FormLabel>
                    <FormDescription>
                      Add watermark to preview tracks automatically
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
              name="default_license_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default License Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Default license type for new beats
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="default_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.01" />
                  </FormControl>
                  <FormDescription>
                    Default price for new marketplace items
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="auto_generate_preview"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Auto-generate Previews
                    </FormLabel>
                    <FormDescription>
                      Automatically generate preview clips for uploaded beats
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

            <Button type="submit">Save Marketplace Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}