
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
  const { syncUserWithDatabase } = useAuthManager();
  const location = useLocation();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && user) {
        setIsSyncing(true);
        await syncUserWithDatabase();
        setIsSyncing(false);
      }
    };

    syncUser();
  }, [isAuthenticated, user, syncUserWithDatabase]);

  if (isLoading || isSyncing) {
    // Show loading state while checking authentication or syncing with database
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required, check if user has the required role
  if (requiredRole && user?.['https://your-domain.com/roles'] !== requiredRole) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
