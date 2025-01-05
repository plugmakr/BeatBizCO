import { Button } from "@/components/ui/button";

interface LandingPageStepProps {
  config: {
    heading: string;
    subheading: string;
    ctaText: string;
    ctaUrl: string;
  };
}

export function LandingPageStep({ config }: LandingPageStepProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">{config.heading}</h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
        {config.subheading}
      </p>
      <Button size="lg" asChild>
        <a href={config.ctaUrl}>{config.ctaText}</a>
      </Button>
    </div>
  );
}