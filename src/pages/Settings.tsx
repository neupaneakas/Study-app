import { useState, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { 
  User,
  Bell,
  Moon,
  Link,
  Info,
  ChevronRight
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const accountSettings = [
  {
    id: "profile",
    title: "Personal Information",
    description: "View and edit your personal info",
    icon: User,
    href: "/settings/profile"
  },
  {
    id: "notifications",
    title: "Notifications", 
    description: "Manage your notification preferences",
    icon: Bell,
    href: "/settings/notifications"
  }
];

const appSettings = [
  {
    id: "darkMode",
    title: "Dark Mode",
    description: "Switch between light and dark themes",
    icon: Moon,
    toggle: true
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect with other tools",
    icon: Link,
    href: "/settings/integrations"
  },
  {
    id: "about",
    title: "About",
    description: "Learn more about the app", 
    icon: Info,
    href: "/settings/about"
  }
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(theme === 'dark');
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header title="Settings" showBackButton={true} />
      
      <main className="flex-1 p-4 space-y-6">
        {/* Account Section */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
            Account
          </h2>
          <div className="space-y-2">
            {accountSettings.map((setting) => {
              const Icon = setting.icon;
              return (
                <RouterLink key={setting.id} to={setting.href}>
                  <Card className="shadow-card hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon size={20} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{setting.title}</h3>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </RouterLink>
              );
            })}
          </div>
        </section>

        {/* App Settings Section */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
            App Settings
          </h2>
          <div className="space-y-2">
            {appSettings.map((setting) => {
              const Icon = setting.icon;
              
              if (setting.toggle) {
                return (
                  <Card key={setting.id} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon size={20} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{setting.title}</h3>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                        </div>
                        <Switch 
                          checked={setting.id === 'darkMode' ? darkMode : false} 
                          onCheckedChange={setting.id === 'darkMode' ? toggleDarkMode : undefined}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              }

              return (
                <RouterLink key={setting.id} to={setting.href || "#"}>
                  <Card className="shadow-card hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon size={20} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{setting.title}</h3>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </RouterLink>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}