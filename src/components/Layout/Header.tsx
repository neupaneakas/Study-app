import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import scholaroLogo from "@/assets/scholaro-logo.png";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export const Header = ({ title, showBackButton = false }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              ←
            </Button>
          )}
          
          {title ? (
            <div className="flex items-center gap-2">
              <img 
                src={scholaroLogo} 
                alt="Scholaro" 
                className="h-6 w-6 object-contain dark:invert"
              />
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <img 
                src={scholaroLogo} 
                alt="Scholaro" 
                className="h-10 w-10 object-contain dark:invert"
              />
              <div>
                <p className="text-sm text-muted-foreground">Welcome back!</p>
                <h1 className="text-lg font-semibold text-foreground">Scholaro</h1>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/settings/notifications">
            <Button variant="ghost" size="sm" className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" size="sm">
              <Settings size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};