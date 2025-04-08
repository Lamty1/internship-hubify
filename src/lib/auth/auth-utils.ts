
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Sign in with email and password
export const signInWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
  try {
    console.log('Attempting login for:', email);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Login error details:', error);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
    
    console.log('Login successful for:', email);
    toast({
      title: "Login successful",
      description: "Welcome back!"
    });
    
    return;
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
};

// Sign up with email and password
export const signUpWithEmailAndPassword = async (
  email: string, 
  password: string, 
  role: 'student' | 'company'
): Promise<void> => {
  try {
    console.log('Attempting signup for:', email, 'with role:', role);
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role,
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    
    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
    
    console.log('Signup successful data:', data);
    
    // Important: The user might need to confirm their email before being fully authenticated
    if (data?.user && !data.session) {
      toast({
        title: "Email confirmation",
        description: "Please check your email to confirm your registration.",
      });
    } else if (data?.session) {
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
    }
    
    return;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};
