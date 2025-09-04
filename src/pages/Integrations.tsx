import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar,
  Mail,
  Smartphone,
  Globe
} from "lucide-react";

const integrations = [
  {
    id: "google-calendar",
    title: "Google Calendar",
    description: "Sync your assignments and routines",
    icon: Calendar,
    connected: true
  },
  {
    id: "email",
    title: "Email Notifications",
    description: "Receive reminders via email",
    icon: Mail,
    connected: true
  },
  {
    id: "mobile",
    title: "Mobile Push",
    description: "Get notifications on your phone",
    icon: Smartphone,
    connected: false
  },
  {
    id: "webhooks",
    title: "Webhooks",
    description: "Connect with external tools",
    icon: Globe,
    connected: false
  }
];

export default function Integrations() {
  const { toast } = useToast();
  const [connectionStates, setConnectionStates] = useState(
    integrations.reduce((acc, integration) => {
      acc[integration.id] = integration.connected;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleToggle = (integrationId: string) => {
    setConnectionStates(prev => {
      const newState = !prev[integrationId];
      const integration = integrations.find(i => i.id === integrationId);
      
      toast({
        title: `${integration?.title} ${newState ? 'Connected' : 'Disconnected'}`,
        description: newState 
          ? `${integration?.title} has been successfully connected.`
          : `${integration?.title} has been disconnected.`,
      });
      
      return { ...prev, [integrationId]: newState };
    });
  };

  const handleConnect = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    
    if (integrationId === 'mobile') {
      // Request notification permission for mobile push
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            setConnectionStates(prev => ({ ...prev, [integrationId]: true }));
            toast({
              title: "Mobile Push Connected",
              description: "You'll now receive push notifications on this device.",
            });
          } else {
            toast({
              title: "Permission Denied",
              description: "Please enable notifications in your browser settings.",
              variant: "destructive",
            });
          }
        });
      }
    } else {
      setConnectionStates(prev => ({ ...prev, [integrationId]: true }));
      toast({
        title: `${integration?.title} Connected`,
        description: `${integration?.title} has been successfully connected.`,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header title="Integrations" showBackButton={true} />
      
      <main className="flex-1 p-4 space-y-4">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <Card key={integration.id} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{integration.title}</h3>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={connectionStates[integration.id]} 
                      onCheckedChange={() => handleToggle(integration.id)}
                    />
                    {!connectionStates[integration.id] && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConnect(integration.id)}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </main>
    </div>
  );
}