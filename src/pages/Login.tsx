
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/auth/LoginForm';
import SocialLoginOptions from '@/components/auth/SocialLoginOptions';
import RoleSelectorTabs from '@/components/auth/RoleSelectorTabs';
import { useLoginRedirect } from '@/hooks/useLoginRedirect';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'company'>('student');
  const { isLoading } = useLoginRedirect();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading authentication...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-sattejli-blue mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Log in to Sattejli</h1>
          
          <RoleSelectorTabs selectedRole={selectedRole} onRoleChange={setSelectedRole} />
          
          {/* Social Login Options */}
          <div className="mb-6">
            <SocialLoginOptions selectedRole={selectedRole} />
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">Or continue with email</span>
            </div>
          </div>

          <LoginForm selectedRole={selectedRole} />
          
          <p className="text-sm text-gray-600 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-sattejli-blue hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
