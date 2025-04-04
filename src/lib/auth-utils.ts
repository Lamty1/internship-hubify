
import { useSupabaseAuth } from './supabase-auth-provider';
import { getUserByEmail, createUser } from './api';
import { useToast } from '@/hooks/use-toast';

export const useAuthManager = () => {
  const { user, isAuthenticated, isLoading, signIn, signOut, syncUserWithDatabase, getUserRole } = useSupabaseAuth();
  const { toast } = useToast();

  const handleLogin = async (redirectPath?: string) => {
    try {
      // Store the redirect path in session storage before login
      if (redirectPath) {
        sessionStorage.setItem('redirectAfterLogin', redirectPath);
      }
      
      // Open the Supabase auth modal or redirect to login page
      // For now, we'll just redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "There was a problem logging in. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    signOut();
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    handleLogin,
    handleLogout,
    syncUserWithDatabase,
    getUserRole
  };
};
