import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface ArtistHeaderProps {
  name: string;
  location: string;
  followers: string;
  coverImage: string;
  profileImage: string;
  isFollowing: boolean;
  onFollowToggle: () => void;
  onMessage: () => void;
}

export function ArtistHeader({
  name,
  location,
  followers,
  coverImage,
  profileImage,
  isFollowing,
  onFollowToggle,
  onMessage
}: ArtistHeaderProps) {
  return (
    <div className="relative h-[50vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end">
        <img
          src={profileImage}
          alt={name}
          className="w-40 h-40 rounded-full border-4 border-primary shadow-xl"
        />
        <div className="ml-8 mb-4 flex flex-col gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">{name}</h1>
            <p className="text-xl text-white/80">{location} • {followers} followers</p>
          </div>
          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="gap-2"
              onClick={onFollowToggle}
            >
              <Heart className={`w-5 h-5 ${isFollowing ? 'fill-current' : ''}`} />
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="gap-2"
              onClick={onMessage}
            >
              <MessageCircle className="w-5 h-5" />
              Message
            </Button>
            <Button size="lg" variant="secondary" className="gap-2">
              <Share2 className="w-5 h-5" /> Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}