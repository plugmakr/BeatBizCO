import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Track {
  id: string;
  title: string;
  bpm: number;
  key: string;
  audioUrl: string;
}

interface MusicPlayerEditorProps {
  content: {
    heading?: string;
    playlist: Track[];
  };
  onSave: (content: any) => void;
}

export const MusicPlayerEditor = ({ content, onSave }: MusicPlayerEditorProps) => {
  const [heading, setHeading] = React.useState(content.heading || "Featured Tracks");
  const [playlist, setPlaylist] = React.useState<Track[]>(content.playlist || []);

  const addTrack = () => {
    const newTrack = {
      id: `track-${Date.now()}`,
      title: "",
      bpm: 0,
      key: "",
      audioUrl: "",
    };
    setPlaylist([...playlist, newTrack]);
  };

  const updateTrack = (index: number, field: keyof Track, value: string | number) => {
    const updatedPlaylist = [...playlist];
    updatedPlaylist[index] = {
      ...updatedPlaylist[index],
      [field]: value,
    };
    setPlaylist(updatedPlaylist);
  };

  const removeTrack = (index: number) => {
    const updatedPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(updatedPlaylist);
  };

  const handleSave = () => {
    onSave({
      heading,
      playlist,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="heading">Section Heading</Label>
        <Input
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Featured Tracks"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Tracks</h3>
          <Button onClick={addTrack} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Track
          </Button>
        </div>

        {playlist.map((track, index) => (
          <div key={track.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Track {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTrack(index)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor={`title-${index}`}>Title</Label>
                <Input
                  id={`title-${index}`}
                  value={track.title}
                  onChange={(e) => updateTrack(index, "title", e.target.value)}
                  placeholder="Track Title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`bpm-${index}`}>BPM</Label>
                  <Input
                    id={`bpm-${index}`}
                    type="number"
                    value={track.bpm}
                    onChange={(e) =>
                      updateTrack(index, "bpm", parseInt(e.target.value))
                    }
                    placeholder="120"
                  />
                </div>
                <div>
                  <Label htmlFor={`key-${index}`}>Key</Label>
                  <Input
                    id={`key-${index}`}
                    value={track.key}
                    onChange={(e) => updateTrack(index, "key", e.target.value)}
                    placeholder="Am"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`audio-${index}`}>Audio URL</Label>
                <Input
                  id={`audio-${index}`}
                  value={track.audioUrl}
                  onChange={(e) => updateTrack(index, "audioUrl", e.target.value)}
                  placeholder="https://example.com/audio.mp3"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  );
};