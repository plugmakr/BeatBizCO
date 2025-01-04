import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const spotlightArtist = {
  name: "J. Cole",
  image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
  description: "Multi-platinum producer with a unique sound blending soul and hip-hop.",
  location: "New York, NY",
  followers: "2.5M"
};

export function SpotlightArtist() {
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <CardTitle>Spotlight Artist</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6">
        <img
          src={spotlightArtist.image}
          alt={spotlightArtist.name}
          className="w-48 h-48 object-cover rounded-lg"
        />
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">{spotlightArtist.name}</h3>
          <p className="text-muted-foreground">{spotlightArtist.description}</p>
          <div className="flex gap-4">
            <span>{spotlightArtist.location}</span>
            <span>{spotlightArtist.followers} followers</span>
          </div>
          <Link to="/artist/j-cole">
            <Button>View Profile</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}