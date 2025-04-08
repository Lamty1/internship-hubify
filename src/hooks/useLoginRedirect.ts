
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/lib/supabase-auth-provider';

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
          
          if (userRole === 'company') {
            navigate('/company-dashboard');
          } else {
            navigate('/student-dashboard');
          }
        } catch (error) {
          console.error("Error during auth redirect:", error);
        }
      }
      setIsLoading(false);
    };
    
    checkAuthAndRedirect();
  }, [isAuthenticated, authLoading, navigate, getUserRole]);

  return { isLoading: isLoading || authLoading };
};
