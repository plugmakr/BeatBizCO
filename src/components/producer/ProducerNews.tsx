import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const news = [
  {
    id: 1,
    date: "2024-03-20",
    title: "New Album Collaboration",
    content: "Just wrapped up production on the upcoming album with Drake. Stay tuned for more updates!",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    date: "2024-03-15",
    title: "Studio Session Highlights",
    content: "Check out these behind-the-scenes moments from our latest studio session.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    date: "2024-03-10",
    title: "New Sample Pack Release",
    content: "Just dropped a new sample pack featuring unique sounds from my latest productions.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop"
  }
];

export function ProducerNews() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Card key={item.id} className="glass-card hover:scale-105 transition-transform duration-300">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.date}</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}