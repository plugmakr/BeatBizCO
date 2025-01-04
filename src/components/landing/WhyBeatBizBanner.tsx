import { Card, CardContent } from "@/components/ui/card";

const WhyBeatBizBanner = () => {
  const reasons = [
    {
      title: "Streamlined Workflow",
      description: "Manage all aspects of your music production business in one place."
    },
    {
      title: "Increased Productivity",
      description: "Focus more on creating music and less on administrative tasks."
    },
    {
      title: "Faster Growth",
      description: "Leverage powerful tools to expand your client base and increase revenue."
    },
    {
      title: "Enhanced Professionalism",
      description: "Present a polished image to clients with our integrated tools."
    }
  ];

  return (
    <section className="content-section bg-secondary/50 backdrop-blur-md">
      <div className="container mx-auto">
        <h2 className="section-title">Why use BeatBiz Pro?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="feature-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{reason.title}</h3>
                <p className="text-white/80">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBeatBizBanner;