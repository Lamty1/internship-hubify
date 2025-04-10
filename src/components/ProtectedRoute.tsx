
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSupabaseAuth } from '@/lib/supabase-auth-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useSupabaseAuth();
  const { syncUserWithDatabase, getUserRole } = useSupabaseAuth();
  const { toast } = useToast();
  const location = useLocation();
  const [isSyncing, setIsSyncing] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && user) {
        console.log("Authenticated user:", user);
        setIsSyncing(true);
        
        try {
          // Sync user with database
          await syncUserWithDatabase();
          
          // Get user role
          const userRole = await getUserRole();
          console.log("User role from database:", userRole);
          setRole(userRole);
          
          setIsSyncing(false);
          setIsCheckingRole(false);
          
          // Notify if role doesn't match required role
          if (requiredRole && userRole !== requiredRole) {
            toast({
              title: "Access restricted",
              description: `You need ${requiredRole} role to access this page.`,
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error("Error syncing user:", error);
          setIsSyncing(false);
          setIsCheckingRole(false);
          
          toast({
            title: "Error",
            description: "There was a problem with your account. Please try logging in again.",
            variant: "destructive"
          });
        }
      } else {
        setIsCheckingRole(false);
      }
    };

    syncUser();
  }, [isAuthenticated, user, syncUserWithDatabase, getUserRole, requiredRole, toast]);

  if (isLoading || isSyncing || (isAuthenticated && isCheckingRole)) {
    // Show loading state with skeletons for better UX
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-96" />
        <Skeleton className="h-8 w-48" />
        <p className="text-sm text-muted-foreground">Loading your profile...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to proper dashboard based on role if on root path
  if (location.pathname === '/') {
    if (role === 'company') {
      return <Navigate to="/company-dashboard" replace />;
    } else if (role === 'student') {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  // If role is required, check if user has the required role (but only enforce if we've finished checking the role)
  if (requiredRole && !isCheckingRole && role !== requiredRole) {
    let redirectPath = '/';
    
    // Redirect to appropriate dashboard based on actual role
    if (role === 'company') {
      redirectPath = '/company-dashboard';
    } else if (role === 'student') {
      redirectPath = '/student-dashboard';
    }
    
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
