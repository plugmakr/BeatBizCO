import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebsiteBuilder } from "@/components/producer/website/WebsiteBuilder";
import { DomainSettings } from "@/components/producer/website/DomainSettings";
import { TemplateLibrary } from "@/components/producer/website/TemplateLibrary";
import { PreviewMode } from "@/components/producer/website/PreviewMode";
import { Button } from "@/components/ui/button";
import { Globe, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { templates } from "@/components/producer/website/data/templates";

const Website = () => {
  const [currentTemplate, setCurrentTemplate] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();

  const handleTemplateSelect = (templateId: string) => {
    const selectedTemplate = templates.find(t => t.id === templateId);
    if (selectedTemplate) {
      setCurrentTemplate(templateId);
      setBlocks([...selectedTemplate.blocks]);
      console.log(`Loading template ${templateId} with ${selectedTemplate.blocks.length} blocks`);
      
      toast({
        title: "Template Applied",
        description: `${selectedTemplate.name} template has been loaded with ${selectedTemplate.blocks.length} sections.`,
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your website changes have been saved successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Website Builder</h1>
            <p className="text-muted-foreground">
              Create and manage your professional producer website
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button onClick={() => setIsPreviewOpen(true)}>
              <Globe className="mr-2 h-4 w-4" />
              Preview Site
            </Button>
          </div>
        </div>

        <Tabs defaultValue="builder" className="space-y-6">
          <TabsList>
            <TabsTrigger value="builder">Builder</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="domain">Domain Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6">
            <WebsiteBuilder
              currentTemplate={currentTemplate}
              onSave={handleSave}
              blocks={blocks}
              onBlocksChange={setBlocks}
            />
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <TemplateLibrary
              onSelectTemplate={handleTemplateSelect}
              currentTemplate={currentTemplate}
            />
          </TabsContent>

          <TabsContent value="domain" className="space-y-6">
            <DomainSettings />
          </TabsContent>
        </Tabs>

        <PreviewMode
          blocks={blocks}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
};

export default Website;