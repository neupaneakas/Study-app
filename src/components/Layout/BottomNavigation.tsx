import { Home, BookOpen, Calendar, MessageCircle, BarChart3 } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { 
    id: "dashboard", 
    label: "Dashboard", 
    icon: Home, 
    path: "/" 
  },
  { 
    id: "homework", 
    label: "Homework", 
    icon: BookOpen, 
    path: "/homework" 
  },
  { 
    id: "routine", 
    label: "Routine", 
    icon: Calendar, 
    path: "/routine" 
  },
  { 
    id: "chat", 
    label: "AI Chat", 
    icon: MessageCircle, 
    path: "/chat" 
  },
  { 
    id: "progress", 
    label: "Progress", 
    icon: BarChart3, 
    path: "/progress" 
  },
];

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                size={20} 
                className={cn(
                  "mb-1 transition-all duration-200",
                  isActive && "scale-110"
                )} 
              />
              <span 
                className={cn(
                  "text-xs font-medium truncate max-w-16 text-center",
                  isActive && "font-semibold"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};