
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/lib/supabase-auth-provider';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useLoginRedirect = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, getUserRole } = useSupabaseAuth();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      if (isAuthenticated && !authLoading) {
        try {
          // Get user role and redirect accordingly
          const userRole = await getUserRole();
          console.log("User authenticated with role:", userRole);
          
          // Verify user in database before redirecting
          const { data: session } = await supabase.auth.getSession();
          if (session && session.session) {
            console.log("Session found:", session.session.user.email);
          }
          
          if (userRole === 'company') {
            navigate('/company-dashboard');
          } else {
            navigate('/student-dashboard');
          }
        } catch (error) {
          console.error("Error during auth redirect:", error);
          toast({
            title: "Navigation issue",
            description: "There was a problem determining your user role. Redirecting to default dashboard.",
            variant: "default"
          });
          // Default to student dashboard on error
          navigate('/student-dashboard');
        }
      }
      setIsLoading(false);
    };
    
    checkAuthAndRedirect();
  }, [isAuthenticated, authLoading, navigate, getUserRole]);

  return { isLoading: isLoading || authLoading };
};
