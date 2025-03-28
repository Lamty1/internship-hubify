
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Internships from "./pages/Internships";
import InternshipDetail from "./pages/InternshipDetail";
import StudentDashboard from "./pages/StudentDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
// Add any additional page imports here

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internships/:id" element={<InternshipDetail />} />
          
          {/* Student Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-profile" element={<StudentDashboard />} /> {/* Temporarily the same page */}
          <Route path="/student-onboarding" element={<StudentDashboard />} /> {/* Temporarily the same page */}
          
          {/* Company Routes */}
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/post-internship" element={<CompanyDashboard />} /> {/* Temporarily the same page */}
          <Route path="/edit-internship/:id" element={<CompanyDashboard />} /> {/* Temporarily the same page */}
          <Route path="/company-onboarding" element={<CompanyDashboard />} /> {/* Temporarily the same page */}
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
