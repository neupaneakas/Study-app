import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, BookOpen, Coffee, Edit, Sun, Beaker, Sandwich, Book, Gamepad2 } from "lucide-react";

const iconOptions = [
  { value: "BookOpen", label: "Study", icon: BookOpen },
  { value: "Coffee", label: "Break", icon: Coffee },
  { value: "Edit", label: "Homework", icon: Edit },
  { value: "Sun", label: "Morning", icon: Sun },
  { value: "Beaker", label: "Science", icon: Beaker },
  { value: "Sandwich", label: "Meal", icon: Sandwich },
  { value: "Book", label: "Reading", icon: Book },
  { value: "Gamepad2", label: "Fun", icon: Gamepad2 }
];

const colors = [
  "bg-blue-500", "bg-green-500", "bg-orange-500", "bg-purple-500",
  "bg-red-500", "bg-yellow-500", "bg-indigo-500", "bg-pink-500"
];

const daysOfWeek = [
  { id: "monday", label: "Mon" },
  { id: "tuesday", label: "Tue" },
  { id: "wednesday", label: "Wed" },
  { id: "thursday", label: "Thu" },
  { id: "friday", label: "Fri" },
  { id: "saturday", label: "Sat" },
  { id: "sunday", label: "Sun" }
];

interface RoutineDialogProps {
  onAddRoutine: (routine: any) => void;
}

export const RoutineDialog = ({ onAddRoutine }: RoutineDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("BookOpen");
  const [selectedColor, setSelectedColor] = useState("bg-blue-500");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !time) return;

    const newRoutine = {
      id: Date.now(),
      title,
      time,
      icon: iconOptions.find(icon => icon.value === selectedIcon)?.icon || BookOpen,
      color: selectedColor,
      days: selectedDays
    };

    onAddRoutine(newRoutine);
    setOpen(false);
    setTitle("");
    setTime("");
    setSelectedIcon("BookOpen");
    setSelectedColor("bg-blue-500");
    setSelectedDays([]);
  };

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90" size="lg">
          <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Routine</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter routine title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Icon</Label>
            <Select value={selectedIcon} onValueChange={setSelectedIcon}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Icon size={16} />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-lg ${color} ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Days of Week</Label>
            <div className="flex gap-2 flex-wrap">
              {daysOfWeek.map((day) => (
                <div key={day.id} className="flex items-center space-x-1">
                  <Checkbox
                    id={day.id}
                    checked={selectedDays.includes(day.id)}
                    onCheckedChange={() => toggleDay(day.id)}
                  />
                  <Label htmlFor={day.id} className="text-sm">{day.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">Add Routine</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};