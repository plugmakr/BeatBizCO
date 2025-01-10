import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MusicUpload } from "@/components/artist/upload/MusicUpload";
import { MusicPlayer } from "@/components/artist/MusicPlayer";

interface Track {
  id: number;
  title: string;
  genre: string;
  price: number;
  audio_url: string;
  artwork_url: string | null;
  created_at: string;
}

export default function MyMusic() {
  const [isUploading, setIsUploading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { data: tracks, isLoading } = useQuery({
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

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Music</h1>
        <Button onClick={() => setIsUploading(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Music
        </Button>
      </div>

      <Tabs defaultValue="tracks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tracks">Tracks</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="tracks">
          <Card>
            <CardHeader>
              <CardTitle>Your Tracks</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div>Loading...</div>
              ) : tracks?.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  No tracks uploaded yet
                </div>
              ) : (
                <div className="space-y-4">
                  {tracks?.map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{track.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {track.genre}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCurrentTrack(track);
                          setIsPlaying(true);
                        }}
                      >
                        Play
                      </Button>
                    </div>
                  ))}
                </div>
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
              <MusicUpload />
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