import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const spotlightProducer = {
  name: "Metro Boomin",
  image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop",
  description: "Legendary producer behind countless platinum hits. Known for innovative sound design and genre-defining beats.",
  location: "Atlanta, GA",
  followers: "5.2M"
};

export function SpotlightProducer() {
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <CardTitle>Spotlight Producer</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6">
        <img
          src={spotlightProducer.image}
          alt={spotlightProducer.name}
          className="w-48 h-48 object-cover rounded-lg"
        />
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">{spotlightProducer.name}</h3>
          <p className="text-muted-foreground">{spotlightProducer.description}</p>
          <div className="flex gap-4">
            <span>{spotlightProducer.location}</span>
            <span>{spotlightProducer.followers} followers</span>
          </div>
          <Link to="/producer/metro-boomin">
            <Button>View Profile</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}