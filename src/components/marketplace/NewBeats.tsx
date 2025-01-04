import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

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
  {
    id: 2,
    title: "Ocean Waves",
    producer: "Timbaland",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2070&auto=format&fit=crop",
    bpm: 128,
    genre: "R&B",
    price: 349
  },
  {
    id: 3,
    title: "City Lights",
    producer: "Mike Will Made-It",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=2070&auto=format&fit=crop",
    bpm: 145,
    genre: "Hip Hop",
    price: 279
  },
  {
    id: 4,
    title: "Mountain High",
    producer: "DJ Khaled",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop",
    bpm: 130,
    genre: "Pop",
    price: 399
  },
  {
    id: 5,
    title: "Forest Dreams",
    producer: "Dr. Dre",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2070&auto=format&fit=crop",
    bpm: 95,
    genre: "Lo-Fi",
    price: 249
  },
  {
    id: 6,
    title: "Sunset Vibes",
    producer: "Pharrell",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2070&auto=format&fit=crop",
    bpm: 118,
    genre: "R&B",
    price: 329
  },
  {
    id: 7,
    title: "Starry Night",
    producer: "Travis Scott",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2070&auto=format&fit=crop",
    bpm: 150,
    genre: "Trap",
    price: 379
  },
  {
    id: 8,
    title: "Misty Morning",
    producer: "Kenny Beats",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?q=80&w=2070&auto=format&fit=crop",
    bpm: 125,
    genre: "Hip Hop",
    price: 299
  },
  {
    id: 9,
    title: "Mountain Echo",
    producer: "Murda Beatz",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2070&auto=format&fit=crop",
    bpm: 140,
    genre: "Drill",
    price: 349
  },
  {
    id: 10,
    title: "Urban Jungle",
    producer: "London On Da Track",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2070&auto=format&fit=crop",
    bpm: 135,
    genre: "Trap",
    price: 319
  }
];

export function NewBeats() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">New Beats</h2>
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {newBeats.map((beat) => (
            <CarouselItem key={beat.id} className="md:basis-1/3 lg:basis-1/5">
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
  );
}