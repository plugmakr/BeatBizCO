import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Database } from "@/integrations/supabase/types";

type SoundType = Database["public"]["Enums"]["sound_type"];

interface SoundLibraryFormFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  type: SoundType | "";
  setType: (value: SoundType) => void;
  bpm: string;
  setBpm: (value: string) => void;
  key: string;
  setKey: (value: string) => void;
  genre: string;
  setGenre: (value: string) => void;
  tags: string;
  setTags: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
}

export function SoundLibraryFormFields({
  title,
  setTitle,
  description,
  setDescription,
  type,
  setType,
  bpm,
  setBpm,
  key,
  setKey,
  genre,
  setGenre,
  tags,
  setTags,
  file,
  setFile,
}: SoundLibraryFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label>Audio File</Label>
        <Input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>
        <div>
          <Label>Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beat">Beat</SelectItem>
              <SelectItem value="sound_kit">Sound Kit</SelectItem>
              <SelectItem value="midi_kit">MIDI Kit</SelectItem>
              <SelectItem value="loop_kit">Loop Kit</SelectItem>
              <SelectItem value="drum_kit">Drum Kit</SelectItem>
              <SelectItem value="one_shot">One Shot</SelectItem>
              <SelectItem value="sample">Sample</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>BPM</Label>
          <Input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(e.target.value)}
            placeholder="Enter BPM"
          />
        </div>
        <div>
          <Label>Key</Label>
          <Input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter key"
          />
        </div>
        <div>
          <Label>Genre</Label>
          <Input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter genre"
          />
        </div>
      </div>
      <div>
        <Label>Tags (comma-separated)</Label>
        <Input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g., dark, trap, melodic"
        />
      </div>
    </div>
  );
}