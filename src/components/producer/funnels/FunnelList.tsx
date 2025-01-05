import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EditFunnelDialog } from "./EditFunnelDialog";

interface Funnel {
  id: string;
  name: string;
  description: string | null;
  status: 'draft' | 'active' | 'archived';
  created_at: string;
}

export function FunnelList() {
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [editingFunnel, setEditingFunnel] = useState<Funnel | null>(null);
  const { toast } = useToast();

  const fetchFunnels = async () => {
    try {
      const { data, error } = await supabase
        .from('funnels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFunnels(data || []);
    } catch (error) {
      console.error('Error fetching funnels:', error);
      toast({
        title: "Error",
        description: "Failed to load funnels",
        variant: "destructive",
      });
    }
  };

  const deleteFunnel = async (id: string) => {
    try {
      const { error } = await supabase
        .from('funnels')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Funnel deleted successfully",
      });
      
      fetchFunnels();
    } catch (error) {
      console.error('Error deleting funnel:', error);
      toast({
        title: "Error",
        description: "Failed to delete funnel",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchFunnels();
  }, []);

  return (
    <div className="space-y-4">
      {funnels.map((funnel) => (
        <Card key={funnel.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{funnel.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{funnel.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditingFunnel(funnel)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteFunnel(funnel.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Status:</span>
                <span className="text-sm capitalize">{funnel.status}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Created:</span>
                <span className="text-sm">
                  {new Date(funnel.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {editingFunnel && (
        <EditFunnelDialog
          funnel={editingFunnel}
          open={!!editingFunnel}
          onOpenChange={(open) => !open && setEditingFunnel(null)}
          onSave={fetchFunnels}
        />
      )}
    </div>
  );
}