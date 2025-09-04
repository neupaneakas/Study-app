import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const notificationSettings = [
  {
    category: "Assignment Reminders",
    settings: [
      {
        id: "upcoming-deadlines",
        title: "Upcoming Deadlines",
        description: "Notify me about assignments due soon",
        enabled: true
      },
      {
        id: "new-grades",
        title: "New Grades", 
        description: "Notify me when a new grade is posted",
        enabled: true
      }
    ]
  },
  {
    category: "Routine Reminders",
    settings: [
      {
        id: "morning-routine",
        title: "Morning Routine",
        description: "Remind me to start my morning tasks",
        enabled: true
      },
      {
        id: "evening-routine",
        title: "Evening Routine",
        description: "Remind me to wind down for the night",
        enabled: false
      }
    ]
  },
  {
    category: "AI Assistant",
    settings: [
      {
        id: "daily-briefing",
        title: "Daily Briefing",
        description: "Get a summary of your day",
        enabled: true
      },
      {
        id: "smart-suggestions",
        title: "Smart Suggestions", 
        description: "Receive productive study tips",
        enabled: true
      }
    ]
  }
];

export default function Notifications() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(notificationSettings);

  const handleToggle = (categoryIndex: number, settingIndex: number) => {
    setSettings(prev => {
      const newSettings = [...prev];
      const oldValue = newSettings[categoryIndex].settings[settingIndex].enabled;
      newSettings[categoryIndex].settings[settingIndex].enabled = !oldValue;
      
      const setting = newSettings[categoryIndex].settings[settingIndex];
      toast({
        title: `${setting.title} ${setting.enabled ? 'Enabled' : 'Disabled'}`,
        description: setting.enabled ? setting.description : `${setting.title} notifications have been turned off.`,
      });
      
      return newSettings;
    });
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header title="Notifications" showBackButton={true} />
      
      <main className="flex-1 p-4 space-y-6">
        {settings.map((category, categoryIndex) => (
          <section key={category.category}>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              {category.category}
            </h2>
            <div className="space-y-2">
              {category.settings.map((setting, settingIndex) => (
                <Card key={setting.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Label htmlFor={setting.id} className="font-medium text-foreground cursor-pointer">
                          {setting.title}
                        </Label>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch 
                        id={setting.id} 
                        checked={setting.enabled}
                        onCheckedChange={() => handleToggle(categoryIndex, settingIndex)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}