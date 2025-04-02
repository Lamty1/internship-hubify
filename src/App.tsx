
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import CompanyDashboard from '@/pages/company/Dashboard';
import StudentDashboard from '@/pages/StudentDashboard';
import Internships from '@/pages/Internships';
import InternshipDetail from '@/pages/InternshipDetail';
import StudentProfile from '@/pages/StudentProfile';
import CompanyProfile from '@/pages/CompanyProfile';
import PostInternship from '@/pages/PostInternship';
import ApplicantProfile from '@/pages/ApplicantProfile';
import NotFound from '@/pages/NotFound';

// Create a client with defaultOptions to handle errors gracefully
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Use correct format for error handling in tanstack v5+
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internships/:id" element={<InternshipDetail />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/post-internship" element={<PostInternship />} />
          <Route path="/applicant-profile/:id" element={<ApplicantProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
