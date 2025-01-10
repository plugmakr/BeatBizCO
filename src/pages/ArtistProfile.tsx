import { useState } from "react";
import TopNavigation from "@/components/navigation/TopNavigation";
import { ArtistHeader } from "@/components/artist/ArtistHeader";
import { ArtistTabs } from "@/components/artist/ArtistTabs";
import { MusicPlayer } from "@/components/artist/MusicPlayer";
import { toast } from "react-hot-toast";

const artistData = {
  name: "J. Cole",
  coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
  profileImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
  bio: "Multi-platinum producer with a unique sound blending soul and hip-hop. Known for creating atmospheric beats that tell stories.",
  location: "New York, NY",
  followers: "2.5M",
  genres: ["Hip Hop", "R&B", "Soul"],
  featuredTracks: [
    { id: 1, title: "Summer Nights", duration: "3:45", price: 299, plays: "1.2M" },
    { id: 2, title: "City Lights", duration: "4:12", price: 349, plays: "980K" },
    { id: 3, title: "Midnight Drive", duration: "3:58", price: 299, plays: "850K" },
  ],
  socialMedia: {
    instagram: "@jcole",
    twitter: "@JColeNC",
    spotify: "J. Cole",
    youtube: "J. Cole Official"
  },
  albums: [
    { id: 1, title: "The Off-Season", year: "2021", tracks: 12 },
    { id: 2, title: "KOD", year: "2018", tracks: 12 },
    { id: 3, title: "4 Your Eyez Only", year: "2016", tracks: 10 }
  ],
  singles: [
    { id: 1, title: "p r i d e . i s . t h e . d e v i l", year: "2021" },
    { id: 2, title: "Middle Child", year: "2019" },
    { id: 3, title: "ATM", year: "2018" }
  ],
  collaborations: [
    { id: 1, title: "a lot", artist: "21 Savage", year: "2018" },
    { id: 2, title: "My Life", artist: "J. Cole & 21 Savage", year: "2021" },
    { id: 3, title: "Family and Loyalty", artist: "Gang Starr", year: "2019" }
  ]
};

export default function ArtistProfile() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock functions for TopNavigation props
  const scrollToSection = (id: string) => {};
  const getDashboardRoute = () => "/dashboard";

  const togglePlay = (trackId: number) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? "Unfollowed artist" : "Following artist");
  };

  const handleMessage = () => {
    toast.success("Message feature coming soon!");
  };

  const currentTrackData = artistData.featuredTracks.find(t => t.id === currentTrack);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <TopNavigation 
        scrollToSection={scrollToSection}
        getDashboardRoute={getDashboardRoute}
      />
      
      <ArtistHeader 
        {...artistData}
        isFollowing={isFollowing}
        onFollowToggle={handleFollow}
        onMessage={handleMessage}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <ArtistTabs 
          featuredTracks={artistData.featuredTracks}
          albums={artistData.albums}
          singles={artistData.singles}
          collaborations={artistData.collaborations}
          socialMedia={artistData.socialMedia}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayToggle={togglePlay}
        />
      </div>

      <MusicPlayer 
        currentTrack={currentTrackData}
        isPlaying={isPlaying}
        artistName={artistData.name}
        onPlayToggle={() => setIsPlaying(!isPlaying)}
      />
    </div>
  );
}
