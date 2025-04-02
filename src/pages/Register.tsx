
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
import { createUser } from '@/lib/api';

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
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleSignUp = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Create user with selected role
      await createUser(values.email, values.password, selectedRole);
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created. Welcome to Sattejli!",
      });
      
      // Navigate to appropriate onboarding based on user role
      if (selectedRole === 'company') {
        navigate('/company-onboarding');
      } else {
        navigate('/student-onboarding');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
