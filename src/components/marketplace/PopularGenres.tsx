import { Button } from "@/components/ui/button";

const popularGenres = [
  {
    name: "Hip Hop",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "R&B",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Trap",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Lo-Fi",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Pop",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "House",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2070&auto=format&fit=crop"
  }
];

export function PopularGenres() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Popular Genres</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
  );
}