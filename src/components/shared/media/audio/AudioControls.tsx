import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  disabled?: boolean;
}

export function AudioControls({ isPlaying, onPlayPause, disabled }: AudioControlsProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={onPlayPause}
      disabled={disabled}
    >
      {isPlaying ? (
        <Pause className="h-6 w-6" />
      ) : (
        <Play className="h-6 w-6" />
      )}
    </Button>
  );
}