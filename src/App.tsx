
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Forecasts from "./pages/Forecasts";
import Analysis from "./pages/Analysis";
import RoomTypes from "./pages/RoomTypes";
import Segments from "./pages/Segments";
import Calendar from "./pages/Calendar";
import Alerts from "./pages/Alerts";
import DataSources from "./pages/DataSources";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/forecasts" element={<Forecasts />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/rooms" element={<RoomTypes />} />
          <Route path="/segments" element={<Segments />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/data" element={<DataSources />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
