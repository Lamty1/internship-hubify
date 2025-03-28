
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";

// Import pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import CompanyDashboard from '@/pages/CompanyDashboard';
import StudentDashboard from '@/pages/StudentDashboard';
import Internships from '@/pages/Internships';
import InternshipDetail from '@/pages/InternshipDetail';
import StudentProfile from '@/pages/StudentProfile';
import CompanyProfile from '@/pages/CompanyProfile';
import PostInternship from '@/pages/PostInternship';
import ApplicantProfile from '@/pages/ApplicantProfile';
import NotFound from '@/pages/NotFound';

function App() {
  return (
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
  );
}

export default App;
