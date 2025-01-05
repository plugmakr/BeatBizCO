import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AudioControls } from "./audio/AudioControls";
import { TimeDisplay } from "./audio/TimeDisplay";
import { VolumeControl } from "./audio/VolumeControl";

interface AudioPlayerProps {
  src: string;
  title?: string;
  compact?: boolean;
}

export function AudioPlayer({ src, title, compact = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setError(null);

    const loadAudioUrl = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('sound_library')
          .createSignedUrl(src, 3600);

        if (error) throw error;
        setAudioUrl(data.signedUrl);
        setError(null);
      } catch (err) {
        console.error("Error getting audio URL:", err);
        setError("Failed to load audio file");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load the audio file. Please try again later.",
        });
      }
    };

    if (src) {
      loadAudioUrl();
    }
  }, [src, toast]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error("Playback error:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to play audio",
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0];
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setError("Unable to load audio file");
    console.error("Audio error:", e);
    toast({
      variant: "destructive",
      title: "Audio Error",
      description: "Failed to load audio file",
    });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-destructive gap-2">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
          className="hidden"
        />
      )}
      <div className={`flex flex-col ${compact ? 'gap-2' : 'gap-4'}`}>
        <div className="flex items-center gap-4">
          <AudioControls
            isPlaying={isPlaying}
            onPlayPause={togglePlay}
            disabled={!audioUrl}
          />
          <TimeDisplay currentTime={currentTime} duration={duration} />
          <div className="flex-1" />
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={handleVolumeChange}
            onMuteToggle={toggleMute}
          />
        </div>
        <Slider
          value={[currentTime]}
          max={duration}
          step={0.1}
          onValueChange={handleSeek}
          className="flex-1"
        />
      </div>
    </div>
  );
}