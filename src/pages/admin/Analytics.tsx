import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";

const AdminAnalytics = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Platform analytics and insights</p>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminAnalytics;