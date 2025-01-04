import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
  fileName: string;
}

export function UploadProgress({ progress, fileName }: UploadProgressProps) {
  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{fileName}</span>
        <span className="text-muted-foreground">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} />
    </div>
  );
}