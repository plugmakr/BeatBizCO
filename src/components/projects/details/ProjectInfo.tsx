import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectInfoProps {
  project: {
    name: string;
    description: string | null;
    deadline: string | null;
    status: string;
  };
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <Card className="bg-[#2A2F3C] border-[#9b87f5]/20">
      <CardContent className="pt-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-300">Description</h3>
          <p className="mt-1 text-white">{project.description || "No description provided"}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-300">Deadline</h3>
          <p className="mt-1 text-white">
            {project.deadline ? format(new Date(project.deadline), "PPP") : "No deadline set"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-300">Status</h3>
          <p className="mt-1 text-white capitalize">{project.status}</p>
        </div>
      </CardContent>
    </Card>
  );
}