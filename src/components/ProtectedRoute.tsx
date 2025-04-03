
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useAuthManager } from '@/lib/auth-utils';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const { syncUserWithDatabase, getUserRole } = useAuthManager();
  const location = useLocation();
  const [isSyncing, setIsSyncing] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && user) {
        setIsSyncing(true);
        await syncUserWithDatabase();
        
        // Get user role
        const userRole = await getUserRole();
        setRole(userRole);
        
        setIsSyncing(false);
        setIsCheckingRole(false);
      } else {
        setIsCheckingRole(false);
      }
    };

    syncUser();
  }, [isAuthenticated, user, syncUserWithDatabase, getUserRole]);

  if (isLoading || isSyncing || (isAuthenticated && isCheckingRole)) {
    // Show loading state while checking authentication or syncing with database
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to proper dashboard based on role
  if (location.pathname === '/') {
    if (role === 'company') {
      return <Navigate to="/company-dashboard" replace />;
    } else if (role === 'student') {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  // If role is required, check if user has the required role
  if (requiredRole && role !== requiredRole) {
    // Redirect to unauthorized page or appropriate dashboard
    if (role === 'company') {
      return <Navigate to="/company-dashboard" replace />;
    } else {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
