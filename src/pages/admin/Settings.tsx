import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";
import { SiteSettings } from "@/components/admin/SiteSettings";

const AdminSettings = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage platform settings and configurations</p>
        </div>
        <SiteSettings />
      </div>
    </Suspense>
  );
};

export default AdminSettings;