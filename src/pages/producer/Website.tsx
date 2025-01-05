import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebsiteBuilder } from "@/components/producer/website/WebsiteBuilder";
import { DomainSettings } from "@/components/producer/website/DomainSettings";
import { TemplateLibrary } from "@/components/producer/website/TemplateLibrary";
import { PreviewMode } from "@/components/producer/website/PreviewMode";
import { Button } from "@/components/ui/button";
import { Eye, Save } from "lucide-react";
import { SaveTemplateDialog } from "@/components/producer/website/SaveTemplateDialog";
import { useToast } from "@/hooks/use-toast";

export default function Website() {
  const [currentTemplate, setCurrentTemplate] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saveTemplateOpen, setSaveTemplateOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveTemplate = (name: string) => {
    toast({
      title: "Template Saved",
      description: `Website template "${name}" has been saved successfully.`,
    });
    setSaveTemplateOpen(false);
  };

  const handleSave = () => {
    toast({
      title: "Changes Saved",
      description: "Your website changes have been saved successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Website Builder</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setPreviewOpen(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={() => setSaveTemplateOpen(true)}>
              <Save className="w-4 h-4 mr-2" />
              Save as Template
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>

        <Tabs defaultValue="builder">
          <TabsList>
            <TabsTrigger value="builder">Website Builder</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="domain">Domain Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="mt-6">
            <WebsiteBuilder
              currentTemplate={currentTemplate}
              onSave={handleSave}
              blocks={blocks}
              onBlocksChange={setBlocks}
            />
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <TemplateLibrary
              onSelectTemplate={setCurrentTemplate}
              currentTemplate={currentTemplate}
            />
          </TabsContent>

          <TabsContent value="domain" className="mt-6">
            <DomainSettings />
          </TabsContent>
        </Tabs>

        <PreviewMode
          blocks={blocks}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
        />

        <SaveTemplateDialog
          isOpen={saveTemplateOpen}
          onClose={() => setSaveTemplateOpen(false)}
          onSave={handleSaveTemplate}
        />
      </div>
    </DashboardLayout>
  );
}