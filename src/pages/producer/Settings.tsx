import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/producer/settings/ProfileSettings";
import { NotificationSettings } from "@/components/producer/settings/NotificationSettings";
import { MarketplaceSettings } from "@/components/producer/settings/MarketplaceSettings";
import { BillingSettings } from "@/components/producer/settings/BillingSettings";
import { SecuritySettings } from "@/components/producer/settings/SecuritySettings";
import { SoundLibrarySettings } from "@/components/producer/settings/SoundLibrarySettings";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-7 gap-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="soundlibrary">Sound Library</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="marketplace">
            <MarketplaceSettings />
          </TabsContent>
          
          <TabsContent value="soundlibrary">
            <SoundLibrarySettings />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="billing">
            <BillingSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}