
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, GraduationCap, Building2, Github, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSupabaseAuth } from '@/lib/supabase-auth-provider';
import { supabase } from '@/integrations/supabase/client';

// Form validation schema
const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'student' | 'company'>('student');
  const { isAuthenticated, isLoading: authLoading, signUp, getUserRole } = useSupabaseAuth();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // Check if user is already authenticated and redirect if needed
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      if (isAuthenticated && !authLoading) {
        try {
          // Get user role and redirect accordingly
          const userRole = await getUserRole();
          console.log("User authenticated with role:", userRole);
          
          if (userRole === 'company') {
            navigate('/company-dashboard');
          } else {
            navigate('/student-dashboard');
          }
        } catch (error) {
          console.error("Error during auth redirect:", error);
        }
      }
    };
    
    checkAuthAndRedirect();
  }, [isAuthenticated, authLoading, navigate, getUserRole]);

  const handleSignUp = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      console.log("Attempting signup with:", values.email, "role:", selectedRole);
      await signUp(values.email, values.password, selectedRole);
      
      // Check if the user is authenticated after signup
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Session error:", sessionError);
        throw sessionError;
      }
      
      if (sessionData.session) {
        // If session exists, user is authenticated, redirect accordingly
        const userRole = await getUserRole();
        const dashboardPath = userRole === 'company' ? '/company-dashboard' : '/student-dashboard';
        
        // Show registration success message
        toast({
          title: "Registration successful",
          description: "Your account has been created. You'll be redirected to your dashboard.",
        });

        console.log("Registration successful, redirecting to:", dashboardPath);
        // Redirect to dashboard
        navigate(dashboardPath);
      } else {
        // If no session, show message to check email
        toast({
          title: "Registration successful",
          description: "Please check your email to confirm your account before logging in.",
        });
        
        // Redirect to login page
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      // Error is already handled in signUp function
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    setIsLoading(true);
    try {
      console.log(`Attempting ${provider} signup with role:`, selectedRole);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            role: selectedRole, // Pass role as metadata
          }
        }
      });
      
      if (error) {
        throw error;
      }
      // Redirect is handled by Supabase
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      toast({
        title: "Registration failed",
        description: error.message || `There was a problem registering with ${provider}.`,
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading authentication...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-sattejli-blue mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create your account</h1>
          
          <Tabs 
            defaultValue="student" 
            className="mb-6"
            onValueChange={(value) => setSelectedRole(value as 'student' | 'company')}
          >
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
          
          {/* Social Login Options */}
          <div className="mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => handleSocialLogin('github')}
                    disabled={isLoading}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    <span>Continue with GitHub</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Continue with Google</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">Or continue with email</span>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        type="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Create a password" 
                        type="password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Confirm your password" 
                        type="password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-sattejli-blue hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Register'}
              </Button>
            </form>
          </Form>
          
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
