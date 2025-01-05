import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/producer/settings/ProfileSettings";
import { CommunicationSettings } from "@/components/producer/settings/CommunicationSettings";
import { MarketplaceSettings } from "@/components/producer/settings/MarketplaceSettings";
import { WebsiteSettings } from "@/components/producer/settings/WebsiteSettings";
import { SoundLibrarySettings } from "@/components/producer/settings/SoundLibrarySettings";
import { NotificationSettings } from "@/components/producer/settings/NotificationSettings";
import { SecuritySettings } from "@/components/producer/settings/SecuritySettings";
import { BillingSettings } from "@/components/producer/settings/BillingSettings";
import { 
  User, 
  Mail, 
  ShoppingBag, 
  Globe, 
  Library, 
  Bell, 
  Lock, 
  CreditCard 
} from "lucide-react";

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
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Marketplace</span>
            </TabsTrigger>
            <TabsTrigger value="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Website</span>
            </TabsTrigger>
            <TabsTrigger value="soundlibrary" className="flex items-center gap-2">
              <Library className="h-4 w-4" />
              <span className="hidden sm:inline">Library</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="communication">
            <CommunicationSettings />
          </TabsContent>
          <TabsContent value="marketplace">
            <MarketplaceSettings />
          </TabsContent>
          <TabsContent value="website">
            <WebsiteSettings />
          </TabsContent>
          <TabsContent value="soundlibrary">
            <SoundLibrarySettings />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
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