import { Card, CardContent } from "@/components/ui/card";

const upcomingArtists = [
  {
    name: "Sarah Wave",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop",
    description: "Rising star known for ethereal melodies and innovative sound design.",
    location: "Los Angeles, CA",
    followers: "50K"
  },
  {
    name: "Beat Master K",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
    description: "Underground producer making waves in the trap scene.",
    location: "Atlanta, GA",
    followers: "75K"
  },
  {
    name: "Luna Beats",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    description: "Innovative producer blending electronic and organic sounds.",
    location: "Miami, FL",
    followers: "45K"
  },
  {
    name: "DJ Rhythm",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2070&auto=format&fit=crop",
    description: "Up-and-coming DJ known for unique remix style.",
    location: "Chicago, IL",
    followers: "60K"
  },
  {
    name: "Sonic Wave",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2070&auto=format&fit=crop",
    description: "Experimental producer pushing genre boundaries.",
    location: "Seattle, WA",
    followers: "40K"
  },
  {
    name: "Crystal Harmony",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
    description: "Emerging producer known for ethereal soundscapes and immersive beats.",
    location: "Portland, OR",
    followers: "35K"
  }
];

export function UpcomingArtists() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Up and Coming Artists</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingArtists.map((artist) => (
          <Card key={artist.name} className="glass-card">
            <CardContent className="space-y-4 p-6">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-24 h-24 rounded-full mx-auto"
              />
              <div className="text-center">
                <h3 className="font-bold">{artist.name}</h3>
                <p className="text-sm text-muted-foreground">{artist.description}</p>
                <div className="mt-2 text-sm">
                  <span>{artist.location}</span>
                  <span className="mx-2">•</span>
                  <span>{artist.followers} followers</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}