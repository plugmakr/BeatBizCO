import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="content-section">
      <div className="container mx-auto">
        <div className="hero-gradient p-12 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to take your music production to the next level?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Schedule a demo and see how BeatBiz Pro can transform your workflow.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            Request a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;