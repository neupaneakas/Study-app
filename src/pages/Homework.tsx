import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar, BookOpen, Plus, MoreHorizontal, CalendarDays, Check, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const subjects = [
  { value: "math", label: "Math" },
  { value: "history", label: "History" },
  { value: "science", label: "Science" },
  { value: "english", label: "English" },
  { value: "art", label: "Art" }
];

export default function Homework() {
  const { assignments, updateAssignment, deleteAssignment, addAssignment } = useAppContext();
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    subject: "",
    dueDate: "",
    notes: "",
    priority: false,
    reminder: false
  });

  const getDueBadgeVariant = (dueDate: string) => {
    if (dueDate === "Due Today") return "destructive";
    if (dueDate === "Due Tomorrow") return "default";
    return "secondary";
  };

  const handleAddAssignment = () => {
    if (!newAssignment.title || !newAssignment.subject || !newAssignment.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const assignment = {
      id: Date.now(),
      title: newAssignment.title,
      subject: subjects.find(s => s.value === newAssignment.subject)?.label || newAssignment.subject,
      description: newAssignment.notes,
      dueDate: "Due in 3 days", // You could format the actual date here
      dueTime: "11:59 PM",
      priority: newAssignment.priority ? "high" : "medium" as "high" | "medium" | "low",
      completed: false,
      icon: BookOpen
    };

    addAssignment(assignment);
    setIsAddOpen(false);
    setNewAssignment({
      title: "",
      subject: "",
      dueDate: "",
      notes: "",
      priority: false,
      reminder: false
    });

    toast({
      title: "Assignment Added",
      description: `${assignment.title} has been added to your homework list.`,
    });
  };

  const toggleCompletion = (id: number) => {
    const assignment = assignments.find(a => a.id === id);
    if (assignment) {
      updateAssignment(id, { completed: !assignment.completed });
      
      toast({
        title: assignment.completed ? "Assignment Reopened" : "Assignment Completed",
        description: `${assignment.title} has been ${assignment.completed ? 'reopened' : 'completed'}.`,
      });
    }
  };

  const handleDeleteAssignment = (id: number) => {
    const assignment = assignments.find(a => a.id === id);
    deleteAssignment(id);
    
    toast({
      title: "Assignment Deleted",
      description: `${assignment?.title} has been removed.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header title="Homework" showBackButton={false} />
      
      <main className="flex-1 p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus size={16} className="mr-2" />
                Add Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle>Add Assignment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Name</Label>
                  <Input
                    id="title"
                    placeholder="Assignment Name"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select 
                    value={newAssignment.subject} 
                    onValueChange={(value) => setNewAssignment(prev => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.value} value={subject.value}>
                          {subject.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <div className="relative">
                    <Input
                      id="dueDate"
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="pl-10"
                    />
                    <CalendarDays size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Notes"
                    value={newAssignment.notes}
                    onChange={(e) => setNewAssignment(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-sm font-medium text-foreground">AI Suggestions</h3>
                  <p className="text-xs text-muted-foreground">Based on your schedule and past performance, AI suggests the following:</p>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="priority" className="text-sm">Prioritize this assignment</Label>
                    <Switch
                      id="priority"
                      checked={newAssignment.priority}
                      onCheckedChange={(checked) => setNewAssignment(prev => ({ ...prev, priority: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="reminder" className="text-sm">Set a reminder</Label>
                    <Switch
                      id="reminder"
                      checked={newAssignment.reminder}
                      onCheckedChange={(checked) => setNewAssignment(prev => ({ ...prev, reminder: checked }))}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAddAssignment} 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Add Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {assignments.map((assignment) => {
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
                        <h3 className={`font-medium ${assignment.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {assignment.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                        {assignment.description && (
                          <p className="text-xs text-muted-foreground mt-1">{assignment.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <Badge variant={assignment.completed ? "secondary" : getDueBadgeVariant(assignment.dueDate)} className="mb-1">
                          {assignment.completed ? 'Completed' : assignment.dueDate}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{assignment.dueTime}</p>
                      </div>
                      <div className="flex gap-1">
                        {!assignment.completed && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleCompletion(assignment.id)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check size={16} />
                          </Button>
                        )}
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
                              <AlertDialogTitle>Delete Assignment</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{assignment.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteAssignment(assignment.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {assignments.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium mb-2">No assignments yet</h3>
              <p className="text-sm">Add your first assignment to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}