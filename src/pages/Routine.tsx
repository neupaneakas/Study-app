
import { Header } from "@/components/Layout/Header";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RoutineDialog } from "@/components/RoutineDialog";
import { 
  BookOpen,
  Coffee,
  Edit,
  Sun,
  Beaker,
  Sandwich,
  Book,
  Gamepad2,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Routine() {
  const { routineItems, addRoutineItem, deleteRoutineItem } = useAppContext();
  const { toast } = useToast();

  const handleAddRoutine = (newRoutine: any) => {
    addRoutineItem(newRoutine);
    toast({
      title: "Routine Added",
      description: `${newRoutine.title} has been added to your routine.`,
    });
  };

  const handleDeleteRoutine = (id: number) => {
    const routine = routineItems.find(item => item.id === id);
    deleteRoutineItem(id);
    
    toast({
      title: "Routine Deleted",
      description: `${routine?.title} has been removed from your routine.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header title="Routine" showBackButton={false} />
      
      <main className="flex-1 p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Today</h1>
            <p className="text-muted-foreground">Your daily schedule</p>
          </div>
          <RoutineDialog onAddRoutine={handleAddRoutine} />
        </div>

        <div className="space-y-3">
          {routineItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${item.color}`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Routine</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{item.title}" from your routine? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteRoutine(item.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {routineItems.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Sun size={48} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium mb-2">No routines yet</h3>
              <p className="text-sm">Add your first routine to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
