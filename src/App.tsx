
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import Supabase Auth provider
import { SupabaseAuthProvider } from '@/lib/supabase-auth-provider';

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
import ProtectedRoute from '@/components/ProtectedRoute';

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
        <SupabaseAuthProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes with required roles */}
            <Route path="/company-dashboard" element={
              <ProtectedRoute requiredRole="company">
                <CompanyDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/student-dashboard" element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/internships" element={
              <ProtectedRoute>
                <Internships />
              </ProtectedRoute>
            } />
            
            <Route path="/internships/:id" element={
              <ProtectedRoute>
                <InternshipDetail />
              </ProtectedRoute>
            } />
            
            <Route path="/student-profile" element={
              <ProtectedRoute requiredRole="student">
                <StudentProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/company-profile" element={
              <ProtectedRoute requiredRole="company">
                <CompanyProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/post-internship" element={
              <ProtectedRoute requiredRole="company">
                <PostInternship />
              </ProtectedRoute>
            } />
            
            <Route path="/applicant-profile/:id" element={
              <ProtectedRoute requiredRole="company">
                <ApplicantProfile />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </SupabaseAuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
