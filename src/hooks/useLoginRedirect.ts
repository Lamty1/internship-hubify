
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/lib/supabase-auth-provider';
import { useToast } from '@/hooks/use-toast';

export const useLoginRedirect = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, getUserRole } = useSupabaseAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        if (isAuthenticated && !authLoading) {
          console.log("User is authenticated, checking role...");
          
          // Get user role and redirect accordingly
          const userRole = await getUserRole();
          console.log("User authenticated with role:", userRole);
          
          if (userRole === 'company') {
            navigate('/company-dashboard');
          } else if (userRole === 'student') {
            navigate('/student-dashboard');
          } else {
            // Default dashboard if role is not recognized
            console.warn("User role not recognized:", userRole);
            navigate('/student-dashboard');
            toast({
              title: "Account Setup",
              description: "Please complete your profile setup.",
            });
          }
        } else if (!authLoading) {
          // If auth check is complete and user is not authenticated, 
          // we don't need to do anything as they should stay on the login page
          console.log("User is not authenticated");
        }
      } catch (error) {
        console.error("Error during auth redirect:", error);
        toast({
          title: "Navigation issue",
          description: "There was a problem determining your user role. Please log in again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthAndRedirect();
  }, [isAuthenticated, authLoading, navigate, getUserRole, toast]);

  return { isLoading: isLoading || authLoading };
};
