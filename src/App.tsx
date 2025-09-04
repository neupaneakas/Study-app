import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNavigation } from "@/components/Layout/BottomNavigation";
import { AppProvider } from "@/contexts/AppContext";
import { ThemeProvider } from "next-themes";
import Head from "next/head"; // <- add this

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
          <Head>
            {/* PWA META TAGS */}
            <meta name="application-name" content="PWA App" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="PWA App" />
            <meta name="description" content="Best PWA App in the world" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#000000" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="public/icon.png" />
            <link rel="apple-touch-icon" sizes="512x512" href="public/icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="public/icon.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="public/icon.png" />
          </Head>

          {/* Existing App Components */}
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
