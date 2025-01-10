import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import TopNavigation from "@/components/navigation/TopNavigation";
import { SpotlightArtist } from "@/components/marketplace/SpotlightArtist";
import { SpotlightProducer } from "@/components/marketplace/SpotlightProducer";
import { NewBeats } from "@/components/marketplace/NewBeats";
import { UpcomingArtists } from "@/components/marketplace/UpcomingArtists";
import { PopularGenres } from "@/components/marketplace/PopularGenres";

const genres = [
  "Hip Hop", "Trap", "R&B", "Pop", "Drill", "Afrobeats", 
  "Lo-Fi", "House", "Rock", "Jazz", "Latin", "Gospel"
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToSection = (id: string) => {};
  const getDashboardRoute = () => "/dashboard";

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        scrollToSection={scrollToSection}
        getDashboardRoute={getDashboardRoute}
      />
      
      <div className="space-y-8 px-4 py-8 max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search beats, producers, or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 bg-background/50 backdrop-blur-sm"
          />
          <Search className="absolute left-4 top-3.5 text-muted-foreground" />
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Badge
              key={genre}
              variant="secondary"
              className="px-4 py-2 hover:bg-primary/20 cursor-pointer"
            >
              {genre}
            </Badge>
          ))}
        </div>

        {/* Spotlight Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          <SpotlightArtist />
          <SpotlightProducer />
        </div>

        {/* New Beats */}
        <NewBeats />

        {/* Upcoming Artists */}
        <UpcomingArtists />

        {/* Popular Genres */}
        <PopularGenres />

        {/* For Producers & Artists */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>For Producers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join our community of producers and start selling your beats today.
                Get access to powerful tools and reach more clients.
              </p>
              <Button className="mt-4">Start Selling</Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>For Artists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Find the perfect beat for your next hit. Browse thousands of high-quality
                beats from top producers.
              </p>
              <Button className="mt-4">Start Browsing</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
