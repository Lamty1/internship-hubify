
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, GraduationCap, Building2, Github, Mail, Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useAuthManager } from '@/lib/auth-utils';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleLogin, isAuthenticated, isLoading, syncUserWithDatabase } = useAuthManager();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Sync with database to get user role
      syncUserWithDatabase().then((dbUser) => {
        toast({
          title: "Registration successful!",
          description: "Your account has been created. Welcome to Sattejli!",
        });
        
        // Navigate to appropriate onboarding based on user role
        if (dbUser?.role === 'company') {
          navigate('/company-onboarding');
        } else {
          navigate('/student-onboarding');
        }
      });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSignUp = () => {
    // Auth0 will handle the signup process
    handleLogin();
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-sattejli-blue mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create your account</h1>
          
          <Tabs defaultValue="student" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student" className="flex items-center justify-center">
                <GraduationCap className="mr-2 h-4 w-4" /> I'm a Student
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center justify-center">
                <Building2 className="mr-2 h-4 w-4" /> We're a Company
              </TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <p className="text-gray-600 text-sm mb-4 text-center">
                Create a student account to discover and apply for internships
              </p>
            </TabsContent>
            <TabsContent value="company">
              <p className="text-gray-600 text-sm mb-4 text-center">
                Create a company account to post internship opportunities and find talented students
              </p>
            </TabsContent>
          </Tabs>
          
          <Button onClick={handleSignUp} className="w-full bg-sattejli-blue hover:bg-blue-600 mb-4" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Continue with Email'}
          </Button>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>
          
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <Mail className="h-5 w-5 text-red-500" />
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <Github className="h-5 w-5 text-gray-900" />
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <Linkedin className="h-5 w-5 text-blue-700" />
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-sattejli-blue hover:text-blue-700 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
