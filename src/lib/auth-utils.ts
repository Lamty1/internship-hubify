import { useAuth0 } from '@auth0/auth0-react';
import { getUserByEmail, createUser } from './api';
import { useToast } from '@/hooks/use-toast';

export const useAuthManager = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const { toast } = useToast();
  const namespace = import.meta.env.VITE_AUTH0_NAMESPACE || 'https://your-domain.com';

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

  const extractRoleFromAuth0User = (user: any): string => {
    console.log("Extracting role from user data:", user);
    
    const possibleRoleSources = [
      user[`${namespace}/roles`],
      user.roles,
      user[`${import.meta.env.VITE_AUTH0_DOMAIN}/roles`],
      user['https://your-domain.com/roles'],
      user.app_metadata?.roles
    ];
    
    for (const source of possibleRoleSources) {
      if (Array.isArray(source) && source.length > 0) {
        console.log("Found roles in:", source);
        if (source.includes('company')) {
          return 'company';
        }
        return source[0];
      }
    }
    
    console.log("No roles found, defaulting to student");
    return 'student';
  };

  const syncUserWithDatabase = async () => {
    if (user?.email && isAuthenticated) {
      try {
        const dbUser = await getUserByEmail(user.email);
        
        if (!dbUser) {
          const role = extractRoleFromAuth0User(user);
          
          console.log("Creating new user with role:", role);
          
          await createUser(
            user.email,
            'auth0_' + user.sub,
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
