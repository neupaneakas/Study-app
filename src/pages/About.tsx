import { Header } from "@/components/Layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header title="About" showBackButton={true} />
      
      <main className="flex-1 p-4 space-y-6">
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Student Productivity</h1>
            <Badge variant="secondary" className="mb-4">Version 1.0.0</Badge>
            <p className="text-muted-foreground">
              A comprehensive productivity app designed to help students manage their homework, 
              routines, and academic progress with AI-powered assistance.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Features</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Assignment tracking and reminders</li>
              <li>• Daily routine management</li>
              <li>• AI-powered study assistance</li>
              <li>• Progress tracking and analytics</li>
              <li>• Multi-language support</li>
              <li>• Cross-platform synchronization</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Support</h2>
            <p className="text-muted-foreground mb-4">
              Need help? Contact our support team or visit our documentation.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: support@studentproductivity.com</p>
              <p>Website: www.studentproductivity.com</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}