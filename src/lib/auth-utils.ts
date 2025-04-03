
import { useAuth0 } from '@auth0/auth0-react';
import { getUserByEmail, createUser } from './api';
import { useToast } from '@/hooks/use-toast';

export const useAuthManager = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const { toast } = useToast();

  const handleLogin = async (redirectPath?: string) => {
    try {
      await loginWithRedirect({
        appState: redirectPath ? { returnTo: redirectPath } : undefined
      });
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
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  // Sync Auth0 user with our database
  const syncUserWithDatabase = async () => {
    if (user?.email && isAuthenticated) {
      try {
        // Check if user exists in our database
        const dbUser = await getUserByEmail(user.email);
        
        if (!dbUser) {
          // Determine user role based on Auth0 metadata or default to student
          // Try multiple ways to extract roles from Auth0 user data
          let role = 'student'; // Default role
          
          // Check for roles in different locations where Auth0 might store them
          if (user['https://your-domain.com/roles'] && Array.isArray(user['https://your-domain.com/roles'])) {
            // Custom namespace approach
            const roles = user['https://your-domain.com/roles'];
            if (roles.includes('company')) {
              role = 'company';
            }
          } else if (user.roles && Array.isArray(user.roles)) {
            // Direct roles property
            if (user.roles.includes('company')) {
              role = 'company';
            }
          } else if (user[`${import.meta.env.VITE_AUTH0_DOMAIN}/roles`] && 
                    Array.isArray(user[`${import.meta.env.VITE_AUTH0_DOMAIN}/roles`])) {
            // Domain-specific namespace
            const roles = user[`${import.meta.env.VITE_AUTH0_DOMAIN}/roles`];
            if (roles.includes('company')) {
              role = 'company';
            }
          }
          
          console.log("Creating new user with role:", role);
          
          // Create new user in database with Auth0 data
          await createUser(
            user.email,
            'auth0_' + user.sub, // Use auth0 ID as password placeholder
            role
          );
          
          toast({
            title: "Account synchronized",
            description: "Your account has been created in our system.",
          });
        }
        
        return dbUser;
      } catch (error) {
        console.error('Error syncing user with database:', error);
        toast({
          title: "Synchronization error",
          description: "There was a problem syncing your account. Please try again.",
          variant: "destructive"
        });
        return null;
      }
    }
    return null;
  };

  // Get user role from database
  const getUserRole = async (): Promise<string | null> => {
    if (user?.email && isAuthenticated) {
      try {
        const dbUser = await getUserByEmail(user.email);
        if (dbUser) {
          return dbUser.role;
        }
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    }
    return null;
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    handleLogin,
    handleLogout,
    syncUserWithDatabase,
    getUserRole,
    getAccessTokenSilently
  };
};
