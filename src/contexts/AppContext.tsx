import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BookOpen, Coffee, Edit, Sun, Beaker, Sandwich, Book, Gamepad2, Calendar } from 'lucide-react';

export interface Assignment {
  id: number;
  title: string;
  subject: string;
  description?: string;
  dueDate: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  icon: any;
}

export interface RoutineItem {
  id: number;
  title: string;
  time: string;
  icon: any;
  color: string;
}

interface AppContextType {
  assignments: Assignment[];
  routineItems: RoutineItem[];
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (id: number, updates: Partial<Assignment>) => void;
  deleteAssignment: (id: number) => void;
  addRoutineItem: (item: RoutineItem) => void;
  deleteRoutineItem: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: "Algebra Assignment",
    subject: "Math",
    description: "Complete exercises 1-20 from Chapter 5",
    dueDate: "Due Today",
    dueTime: "11:59 PM",
    priority: "high",
    completed: false,
    icon: Calendar
  },
  {
    id: 2,
    title: "Essay on World War II",
    subject: "History",
    description: "Write a 1000-word essay on the causes of WWII",
    dueDate: "Due Tomorrow",
    dueTime: "5:00 PM",
    priority: "medium",
    completed: false,
    icon: BookOpen
  },
  {
    id: 3,
    title: "Science Lab Report",
    subject: "Science",
    description: "Complete lab report on chemical reactions",
    dueDate: "Due in 3 days",
    dueTime: "2:00 PM",
    priority: "low",
    completed: false,
    icon: Beaker
  }
];

const initialRoutineItems: RoutineItem[] = [
  {
    id: 1,
    title: "Study Session",
    time: "8:00 AM - 9:00 AM",
    icon: BookOpen,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Breakfast",
    time: "9:00 AM - 9:30 AM", 
    icon: Coffee,
    color: "bg-orange-500"
  },
  {
    id: 3,
    title: "Math Homework",
    time: "9:30 AM - 10:30 AM",
    icon: Edit,
    color: "bg-green-500"
  },
  {
    id: 4,
    title: "Break",
    time: "10:30 AM - 11:00 AM",
    icon: Sun,
    color: "bg-yellow-500"
  },
  {
    id: 5,
    title: "Science Project",
    time: "11:00 AM - 12:00 PM",
    icon: Beaker,
    color: "bg-purple-500"
  },
  {
    id: 6,
    title: "Lunch",
    time: "12:00 PM - 1:00 PM",
    icon: Sandwich,
    color: "bg-red-500"
  },
  {
    id: 7,
    title: "Reading",
    time: "1:00 PM - 2:00 PM",
    icon: Book,
    color: "bg-indigo-500"
  },
  {
    id: 8,
    title: "Free Time",
    time: "2:00 PM - 3:00 PM",
    icon: Gamepad2,
    color: "bg-pink-500"
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>(initialRoutineItems);

  const addAssignment = (assignment: Assignment) => {
    setAssignments(prev => [...prev, assignment]);
  };

  const updateAssignment = (id: number, updates: Partial<Assignment>) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === id ? { ...assignment, ...updates } : assignment
    ));
  };

  const deleteAssignment = (id: number) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id));
  };

  const addRoutineItem = (item: RoutineItem) => {
    setRoutineItems(prev => [...prev, item]);
  };

  const deleteRoutineItem = (id: number) => {
    setRoutineItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider value={{
      assignments,
      routineItems,
      addAssignment,
      updateAssignment,
      deleteAssignment,
      addRoutineItem,
      deleteRoutineItem
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}