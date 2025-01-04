import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">
        Ready to take your music production to the next level?
      </h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Schedule a demo and see how BeatBiz Pro can transform your workflow.
      </p>
      <Button size="lg" className="px-8">
        Request a Demo
      </Button>
    </section>
  );
};

export default CallToAction;