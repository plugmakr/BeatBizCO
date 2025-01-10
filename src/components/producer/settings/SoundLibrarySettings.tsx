import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function SoundLibrarySettings() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: folders, isLoading } = useQuery({
    queryKey: ["sound-library-folders", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("sound_library_folders")
        .select("*")
        .eq("producer_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ["active-projects", userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("collaboration_projects")
        .select("*")
        .eq("created_by", userId)
        .eq("status", "active");

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  if (!userId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sound Library Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please sign in to view your sound library settings.</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || isLoadingProjects) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sound Library Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sound Library Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Folders</h3>
            <p className="text-sm text-muted-foreground">
              {folders?.length || 0} folders in your sound library
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Active Projects</h3>
            <p className="text-sm text-muted-foreground">
              {projects?.length || 0} active projects
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}