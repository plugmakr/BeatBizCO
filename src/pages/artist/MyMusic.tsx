import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Music2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MusicUpload } from "@/components/artist/upload/MusicUpload";
import { MusicPlayer } from "@/components/artist/MusicPlayer";
import { MusicGrid } from "@/components/artist/music/MusicGrid";
import { useToast } from "@/hooks/use-toast";

interface Track {
  id: string;
  title: string;
  genre: string | null;
  price: number | null;
  audio_url: string | null;
  artwork_url: string | null;
  created_at: string;
  description?: string | null;
  artist_id: string | null;
  status: string | null;
}

export default function MyMusic() {
  const [isUploading, setIsUploading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const { data: tracks, isLoading, refetch } = useQuery({
    queryKey: ["my-music"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      const { data, error } = await supabase
        .from("music")
        .select("*")
        .eq("artist_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Track[];
    },
  });

  const handleDelete = async (trackId: string) => {
    try {
      const { error } = await supabase
        .from("music")
        .delete()
        .eq("id", trackId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Track deleted successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete track",
        variant: "destructive",
      });
    }
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Music</h1>
          <p className="text-muted-foreground">Manage your music catalog</p>
        </div>
        <Button onClick={() => setIsUploading(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Music
        </Button>
      </div>

      <Tabs defaultValue="tracks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tracks" className="flex items-center gap-2">
            <Music2 className="h-4 w-4" />
            Tracks
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracks">
          <Card>
            <CardHeader>
              <CardTitle>Your Tracks</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : tracks?.length === 0 ? (
                <div className="text-center py-8">
                  <Music2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold">No tracks yet</h3>
                  <p className="text-muted-foreground">
                    Upload your first track to get started
                  </p>
                </div>
              ) : (
                <MusicGrid
                  tracks={tracks || []}
                  onPlay={(track) => {
                    setCurrentTrack(track);
                    setIsPlaying(true);
                  }}
                  onDelete={handleDelete}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Music</CardTitle>
            </CardHeader>
            <CardContent>
              <MusicUpload onSuccess={() => {
                refetch();
                setIsUploading(false);
              }} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {currentTrack && (
        <MusicPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          artistName="You"
          onPlayToggle={handlePlayToggle}
        />
      )}
    </div>
  );
}