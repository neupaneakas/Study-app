import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNavigation } from "@/components/Layout/BottomNavigation";
import { AppProvider } from "@/contexts/AppContext";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Homework from "./pages/Homework";
import Routine from "./pages/Routine";
import AIChat from "./pages/AIChat";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Integrations from "./pages/Integrations";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="relative bg-background min-h-screen">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/homework" element={<Homework />} />
                <Route path="/routine" element={<Routine />} />
                <Route path="/chat" element={<AIChat />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/notifications" element={<Notifications />} />
                <Route path="/settings/profile" element={<Profile />} />
                <Route path="/settings/integrations" element={<Integrations />} />
                <Route path="/settings/about" element={<About />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <BottomNavigation />
            </div>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
