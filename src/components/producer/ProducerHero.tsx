import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface ProducerHeroProps {
  name: string;
  image: string;
  location: string;
  followers: string;
  bio: string;
  isFollowing: boolean;
  onFollow: () => void;
  onMessage: () => void;
}

export function ProducerHero({
  name,
  image,
  location,
  followers,
  bio,
  isFollowing,
  onFollow,
  onMessage
}: ProducerHeroProps) {
  return (
    <div className="relative h-[40vh] bg-gradient-to-r from-yellow-500/20 via-red-500/20 to-purple-500/20">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end">
        <img
          src={image}
          alt={name}
          className="w-40 h-40 rounded-lg border-2 border-yellow-500 shadow-xl object-cover"
        />
        <div className="ml-8 mb-4 flex flex-col gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">{name}</h1>
            <p className="text-lg text-white/80 mt-2">
              {location} • {followers} followers
            </p>
            <p className="text-base text-white/70 mt-2 max-w-2xl">
              {bio}
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 gap-2"
              onClick={onFollow}
            >
              <Heart className={`w-5 h-5 ${isFollowing ? 'fill-current' : ''}`} />
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/20 gap-2"
              onClick={onMessage}
            >
              <MessageCircle className="w-5 h-5" />
              Message
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/20 gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}