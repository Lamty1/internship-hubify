
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, GraduationCap, Building2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUserByEmail } from '@/lib/api';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'student' | 'company'>('student');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Check if user exists in our database
      const user = await getUserByEmail(values.email);
      
      if (!user || user.password !== values.password) {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back to Sattejli!",
      });
      
      // Navigate to appropriate dashboard based on user role
      if (user.role === 'company') {
        navigate('/company-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "There was a problem logging in. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-sattejli-blue mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Log in to Sattejli</h1>
          
          <Tabs 
            defaultValue="student" 
            className="mb-6"
            onValueChange={(value) => setSelectedRole(value as 'student' | 'company')}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student" className="flex items-center justify-center">
                <GraduationCap className="mr-2 h-4 w-4" /> Student
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center justify-center">
                <Building2 className="mr-2 h-4 w-4" /> Company
              </TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <p className="text-gray-600 text-sm mb-4 text-center">
                Access your student account to apply for internships and track your applications
              </p>
            </TabsContent>
            <TabsContent value="company">
              <p className="text-gray-600 text-sm mb-4 text-center">
                Access your company account to post internship opportunities and manage applications
              </p>
            </TabsContent>
          </Tabs>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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
                        placeholder="Enter your password" 
                        type="password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-sattejli-blue hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log in'}
              </Button>
            </form>
          </Form>
          
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
