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

const soundLibrarySettingsSchema = z.object({
  auto_organize: z.boolean(),
  default_folder: z.string(),
  auto_backup: z.boolean(),
  backup_frequency: z.string(),
});

export function SoundLibrarySettings() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof soundLibrarySettingsSchema>>({
    resolver: zodResolver(soundLibrarySettingsSchema),
    defaultValues: {
      auto_organize: true,
      default_folder: "Uploads",
      auto_backup: true,
      backup_frequency: "daily",
    },
  });

  const onSubmit = async (values: z.infer<typeof soundLibrarySettingsSchema>) => {
    toast({
      title: "Success",
      description: "Sound library settings have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sound Library Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="auto_organize"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Auto-organize Files
                    </FormLabel>
                    <FormDescription>
                      Automatically organize files by type and date
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
              name="default_folder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Upload Folder</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Default folder for new uploads
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="auto_backup"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Automatic Backup
                    </FormLabel>
                    <FormDescription>
                      Automatically backup your sound library
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
              name="backup_frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Backup Frequency</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    How often to backup your library
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit">Save Library Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}