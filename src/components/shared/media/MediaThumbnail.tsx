import { FileMusic, FileVideo, FileImage, File } from "lucide-react";

interface MediaThumbnailProps {
  type: string;
  src?: string;
  className?: string;
}

export function MediaThumbnail({ type, src, className = "w-16 h-16" }: MediaThumbnailProps) {
  if (type.startsWith("image/") && src) {
    return (
      <div className={`${className} relative rounded-lg overflow-hidden bg-muted`}>
        <img src={src} alt="thumbnail" className="w-full h-full object-cover" />
      </div>
    );
  }

  const IconComponent = type.startsWith("audio/")
    ? FileMusic
    : type.startsWith("video/")
    ? FileVideo
    : type.startsWith("image/")
    ? FileImage
    : File;

  return (
    <div className={`${className} flex items-center justify-center rounded-lg bg-muted`}>
      <IconComponent className="w-8 h-8 text-muted-foreground" />
    </div>
  );
}