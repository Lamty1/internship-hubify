
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseAuth } from '@/lib/supabase-auth-provider';
import { supabase } from '@/integrations/supabase/client';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  selectedRole: 'student' | 'company';
}

const LoginForm = ({ selectedRole }: LoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, getUserRole } = useSupabaseAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleFormLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      console.log("Attempting to login with:", values.email);
      
      // Use the signIn function from the auth context
      await signIn(values.email, values.password);
      
      // Check if the user is authenticated after login
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (sessionData.session) {
        // Get user role to determine which dashboard to redirect to
        const userRole = await getUserRole();
        const dashboardPath = userRole === 'company' ? '/company-dashboard' : '/student-dashboard';
        
        console.log("Login successful, redirecting to:", dashboardPath);
        navigate(dashboardPath);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      // Error is already handled in signIn function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormLogin)} className="space-y-4">
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
  );
};

export default LoginForm;
