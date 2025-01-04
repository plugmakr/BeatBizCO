import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Music, Package, Disc, CreditCard, Settings, Users } from "lucide-react";

const producerData = {
  name: "Metro Boomin",
  coverImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop",
  profileImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop",
  bio: "Multi-platinum producer crafting the sound of a generation. Specializing in trap, hip-hop, and innovative sound design.",
  location: "Atlanta, GA",
  followers: "5.2M",
  recentWork: {
    beats: [
      { id: 1, title: "Night Vision", price: 299, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop" },
      { id: 2, title: "Trap Soul", price: 349, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop" },
      { id: 3, title: "Dark Matter", price: 399, image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2070&auto=format&fit=crop" },
    ],
    sampleKits: [
      { id: 1, title: "808 Essentials", price: 79, image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2070&auto=format&fit=crop" },
      { id: 2, title: "Melody Pack Vol.1", price: 89, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" },
    ],
    drumKits: [
      { id: 1, title: "Trap Drums 2024", price: 59, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop" },
      { id: 2, title: "Future Bass Kit", price: 69, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop" },
    ],
  },
};

export default function ProducerProfile() {
  const [activeTab, setActiveTab] = useState("beats");

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-yellow-500/20 to-red-500/20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${producerData.coverImage})` }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto flex items-end gap-8">
            <img
              src={producerData.profileImage}
              alt={producerData.name}
              className="w-40 h-40 rounded-lg border-2 border-yellow-500 shadow-xl"
            />
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-white">{producerData.name}</h1>
              <p className="text-yellow-500">{producerData.location} • {producerData.followers} followers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-black/95 border-b border-yellow-500/20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
          <TabsList className="h-16 bg-transparent border-b border-yellow-500/20">
            <TabsTrigger value="beats" className="gap-2 text-lg">
              <Music className="w-5 h-5" /> Beats
            </TabsTrigger>
            <TabsTrigger value="sampleKits" className="gap-2 text-lg">
              <Package className="w-5 h-5" /> Sample Kits
            </TabsTrigger>
            <TabsTrigger value="drumKits" className="gap-2 text-lg">
              <Disc className="w-5 h-5" /> Drum Kits
            </TabsTrigger>
            <TabsTrigger value="licensing" className="gap-2 text-lg">
              <CreditCard className="w-5 h-5" /> Licensing
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2 text-lg">
              <Settings className="w-5 h-5" /> Services
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="gap-2 text-lg">
              <Users className="w-5 h-5" /> Collaboration
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-8">
        <TabsContent value="beats" className="mt-0">
          <h2 className="text-2xl font-bold mb-6 text-yellow-500">Featured Beats</h2>
          <div className="grid grid-cols-3 gap-6">
            {producerData.recentWork.beats.map((beat) => (
              <Card key={beat.id} className="bg-zinc-900 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                <CardContent className="p-0">
                  <img src={beat.image} alt={beat.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-white">{beat.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-yellow-500">${beat.price}</span>
                      <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sampleKits" className="mt-0">
          <h2 className="text-2xl font-bold mb-6 text-yellow-500">Sample Kits</h2>
          <div className="grid grid-cols-2 gap-6">
            {producerData.recentWork.sampleKits.map((kit) => (
              <Card key={kit.id} className="bg-zinc-900 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                <CardContent className="p-0">
                  <img src={kit.image} alt={kit.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-white">{kit.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-yellow-500">${kit.price}</span>
                      <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drumKits" className="mt-0">
          <h2 className="text-2xl font-bold mb-6 text-yellow-500">Drum Kits</h2>
          <div className="grid grid-cols-2 gap-6">
            {producerData.recentWork.drumKits.map((kit) => (
              <Card key={kit.id} className="bg-zinc-900 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                <CardContent className="p-0">
                  <img src={kit.image} alt={kit.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-white">{kit.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-yellow-500">${kit.price}</span>
                      <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </div>
    </div>
  );
}