import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAppContext } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar,
  BookOpen,
  Sun,
  Moon,
  MessageCircle,
  Plus,
  MoreHorizontal,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";


const quickActions = [
  {
    id: 1,
    title: "AI Chat",
    icon: MessageCircle,
    href: "/chat"
  },
  {
    id: 2,
    title: "New Task",
    icon: Plus,
    href: "/homework?add=true"
  }
];

export default function Dashboard() {
  const { assignments, routineItems, deleteRoutineItem } = useAppContext();
  const { toast } = useToast();
  
  // Get upcoming assignments (not completed and due soon)
  const upcomingAssignments = assignments
    .filter(assignment => !assignment.completed)
    .slice(0, 3); // Show only first 3 upcoming

  // Get first few routine items to display
  const displayRoutines = routineItems.slice(0, 2);

  const handleDeleteRoutine = (id: number, title: string) => {
    deleteRoutineItem(id);
    toast({
      title: "Routine Deleted",
      description: `${title} has been removed from your routine.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header />
      
      <main className="flex-1 p-4 space-y-6">
        {/* Upcoming Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Upcoming</h2>
          <div className="space-y-3">
            {upcomingAssignments.map((assignment) => {
              const Icon = assignment.icon;
              return (
                <Card key={assignment.id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon size={20} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={assignment.dueDate === "Due Today" ? "destructive" : "warning"}
                          className="mb-1"
                        >
                          {assignment.dueDate}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{assignment.dueTime}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Routine Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Routine</h2>
            <Link to="/routine" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {displayRoutines.map((routine) => {
              const Icon = routine.icon;
              return (
                <Card key={routine.id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${routine.color}`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{routine.title}</h3>
                          <p className="text-sm text-muted-foreground">{routine.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Routine Options</AlertDialogTitle>
                              <AlertDialogDescription>
                                What would you like to do with "{routine.title}"?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteRoutine(routine.id, routine.title)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                <Trash2 size={16} className="mr-2" />
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {displayRoutines.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Sun size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No routines yet. Add some in the Routine tab!</p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.id} to={action.href}>
                  <Card className="shadow-card hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="p-3 bg-primary/10 rounded-lg inline-flex mb-3">
                        <Icon size={24} className="text-primary" />
                      </div>
                      <h3 className="font-medium text-foreground">{action.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}