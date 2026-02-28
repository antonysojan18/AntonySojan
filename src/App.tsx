import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Prism from "@/components/ui/Prism";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="antony-theme">
      <TooltipProvider>
        <div className="relative min-h-screen font-body text-foreground">
          {/* Animated Background Orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-pulse delay-75" />
            <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[150px] mix-blend-screen animate-pulse delay-500" />
            <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-gold-light/10 blur-[120px] mix-blend-screen animate-pulse delay-1000" />
          </div>

          <div className="fixed inset-0 z-0">
            <Prism
              colorFrequency={1.2}
              glow={1.5}
              bloom={2.0}
              hueShift={0.65}
              transparent={true}
            />
          </div>

          <div className="relative z-10">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
