
import { Button } from "@/components/ui/button";
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
import { Loader2 } from "lucide-react";
import type { Client } from "@/types/database";

interface ClientFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
  defaultValues?: Client;
}

export default function ClientForm({ onSubmit, isLoading, defaultValues }: ClientFormProps) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit(formData);
    }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input 
            id="name" 
            name="name" 
            required 
            defaultValue={defaultValues?.name || ''}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email"
            defaultValue={defaultValues?.email || ''}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel"
            defaultValue={defaultValues?.phone || ''}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input 
            id="website" 
            name="website" 
            type="url" 
            placeholder="https://"
            defaultValue={defaultValues?.website || ''}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budget_range">Budget Range</Label>
          <Select name="budget_range" defaultValue={defaultValues?.budget_range || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1000">$0 - $1,000</SelectItem>
              <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
              <SelectItem value="10000+">$10,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="genre_focus">Genre Focus</Label>
          <Select name="genre_focus" defaultValue={defaultValues?.genre_focus || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select primary genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hip-hop">Hip Hop</SelectItem>
              <SelectItem value="pop">Pop</SelectItem>
              <SelectItem value="r-and-b">R&B</SelectItem>
              <SelectItem value="rock">Rock</SelectItem>
              <SelectItem value="electronic">Electronic</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="project_type">Project Type</Label>
        <Select name="project_type" defaultValue={defaultValues?.project_type || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="ep">EP</SelectItem>
            <SelectItem value="album">Album</SelectItem>
            <SelectItem value="mixing">Mixing Only</SelectItem>
            <SelectItem value="mastering">Mastering Only</SelectItem>
            <SelectItem value="production">Production Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="social_media">Social Media Links</Label>
        <Input 
          id="social_media" 
          name="social_media" 
          placeholder="Instagram, Spotify, SoundCloud, etc."
          defaultValue={defaultValues?.social_media || ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Project details, preferences, deadlines, etc."
          className="h-24"
          defaultValue={defaultValues?.notes || ''}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {defaultValues ? 'Updating Client...' : 'Adding Client...'}
          </>
        ) : (
          defaultValues ? 'Update Client' : 'Add Client'
        )}
      </Button>
    </form>
  );
}
