import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LandingPageStep } from "./steps/LandingPageStep";
import { BeatPreviewStep } from "./steps/BeatPreviewStep";
import { LicensingStep } from "./steps/LicensingStep";
import { CheckoutStep } from "./steps/CheckoutStep";
import { LeadCaptureStep } from "./steps/LeadCaptureStep";
import { DeliveryStep } from "./steps/DeliveryStep";
import { OfferStep } from "./steps/OfferStep";
import { FeaturesStep } from "./steps/FeaturesStep";
import { SubscriptionStep } from "./steps/SubscriptionStep";
import { SignupStep } from "./steps/SignupStep";

interface FunnelStepPreviewDialogProps {
  step: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FunnelStepPreviewDialog({
  step,
  open,
  onOpenChange,
}: FunnelStepPreviewDialogProps) {
  const renderStep = () => {
    switch (step?.type) {
      case "landing":
        return <LandingPageStep config={step.config} />;
      case "product-showcase":
        return <BeatPreviewStep config={step.config} />;
      case "pricing":
        return <LicensingStep config={step.config} />;
      case "checkout":
        return <CheckoutStep config={step.config} />;
      case "lead-capture":
        return <LeadCaptureStep config={step.config} />;
      case "delivery":
        return <DeliveryStep config={step.config} />;
      case "offer":
        return <OfferStep config={step.config} />;
      case "features":
        return <FeaturesStep config={step.config} />;
      case "subscription":
        return <SubscriptionStep config={step.config} />;
      case "signup":
        return <SignupStep config={step.config} />;
      default:
        return <div>Step type not supported</div>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{step?.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="p-6">{renderStep()}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}