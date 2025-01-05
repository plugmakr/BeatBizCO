interface TimeDisplayProps {
  currentTime: number;
  duration: number;
}

export function TimeDisplay({ currentTime, duration }: TimeDisplayProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="min-w-[40px]">{formatTime(currentTime)}</span>
      <span>/</span>
      <span className="min-w-[40px]">{formatTime(duration)}</span>
    </div>
  );
}