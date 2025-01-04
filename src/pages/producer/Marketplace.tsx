import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const genres = [
  "Hip Hop", "Trap", "R&B", "Pop", "Drill", "Afrobeats", 
  "Lo-Fi", "House", "Rock", "Jazz", "Latin", "Gospel"
];

const spotlightArtist = {
  name: "J. Cole",
  image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
  description: "Multi-platinum producer with a unique sound blending soul and hip-hop.",
  location: "New York, NY",
  followers: "2.5M"
};

const newBeats = [
  {
    id: 1,
    title: "Summer Nights",
    producer: "Metro Boomin",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    bpm: 140,
    genre: "Trap",
    price: 299
  },
  // ... Add 9 more similar beat objects
];

const upcomingArtists = [
  {
    name: "Sarah Wave",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop",
    description: "Rising star known for ethereal melodies and innovative sound design.",
    location: "Los Angeles, CA",
    followers: "50K"
  },
  // ... Add more artists
];

const popularGenres = [
  {
    name: "Hip Hop",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "R&B",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop"
  },
  // ... Add 3 more genres
];

const ProducerMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-8 px-4 max-w-7xl mx-auto">
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

        {/* Spotlight Artist */}
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
              <Button>View Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* New Beats Carousel */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">New Beats</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {newBeats.map((beat) => (
                <CarouselItem key={beat.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="glass-card">
                    <img
                      src={beat.image}
                      alt={beat.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="space-y-2 p-4">
                      <h3 className="font-bold">{beat.title}</h3>
                      <p className="text-sm text-muted-foreground">by {beat.producer}</p>
                      <div className="flex justify-between text-sm">
                        <span>{beat.bpm} BPM</span>
                        <span>{beat.genre}</span>
                        <span>${beat.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Upcoming Artists */}
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

        {/* Popular Genres */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Popular Genres</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularGenres.map((genre) => (
              <div key={genre.name} className="space-y-2">
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <h3 className="text-center font-medium">{genre.name}</h3>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="link">View All Genres</Button>
          </div>
        </div>

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
    </DashboardLayout>
  );
};

export default ProducerMarketplace;