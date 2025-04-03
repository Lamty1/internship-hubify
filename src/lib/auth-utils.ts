
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
    
    // Try different locations where Auth0 might store roles data
    const possibleRoleSources = [
      user[`${namespace}/roles`],
      user.roles,
      user[`${import.meta.env.VITE_AUTH0_DOMAIN}/roles`],
      user['https://your-domain.com/roles'],
      user.app_metadata?.roles
    ];
    
    // Log all potential role sources for debugging
    console.log("Checking possible role sources:", JSON.stringify(possibleRoleSources, null, 2));
    
    for (const source of possibleRoleSources) {
      if (Array.isArray(source) && source.length > 0) {
        console.log("Found roles in:", source);
        if (source.includes('company')) {
          return 'company';
        }
        if (source.includes('student')) {
          return 'student';
        }
        return source[0]; // Default to first role
      }
    }
    
    // If role information is missing from Auth0, check for email patterns
    // This is just a fallback if Auth0 roles aren't configured
    if (user?.email) {
      if (user.email.includes('company') || user.email.includes('business') || user.email.includes('corp')) {
        return 'company';
      }
    }
    
    console.log("No roles found, defaulting to student");
    return 'student'; // Default role
  };

  const syncUserWithDatabase = async () => {
    if (user?.email && isAuthenticated) {
      try {
        console.log("Syncing user with local database:", user.email);
        const dbUser = await getUserByEmail(user.email);
        
        if (!dbUser) {
          // Extract role from Auth0 user data
          const role = extractRoleFromAuth0User(user);
          
          console.log("Creating new user in local database with role:", role);
          
          // Create user in your local database with auth0 prefix for the ID
          await createUser(
            user.email,
            'auth0_' + user.sub,
            role
          );
          
          toast({
            title: "Account synchronized",
            description: "Your account has been created in your local database.",
          });
        } else {
          console.log("User already exists in local database:", dbUser);
        }
        
        return dbUser;
      } catch (error) {
        console.error('Error syncing user with database:', error);
        toast({
          title: "Synchronization error",
          description: "There was a problem syncing your account with the local database. Please try again.",
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
        // First attempt to get role from local database
        const dbUser = await getUserByEmail(user.email);
        if (dbUser) {
          return dbUser.role;
        } else {
          // If not in database yet, extract from Auth0
          return extractRoleFromAuth0User(user);
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
