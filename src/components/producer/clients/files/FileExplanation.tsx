import { Card, CardContent } from "@/components/ui/card";
import { FileText, Music, Video, Archive, Folder } from "lucide-react";

export function FileExplanation() {
  return (
    <Card className="mb-4">
      <CardContent className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          Organize your client files into the following categories:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Documents</span>
          </div>
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-green-500" />
            <span className="text-sm">Audio Files</span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-purple-500" />
            <span className="text-sm">Video Files</span>
          </div>
          <div className="flex items-center gap-2">
            <Archive className="h-4 w-4 text-orange-500" />
            <span className="text-sm">Zip Archives</span>
          </div>
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">Custom Folders</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}