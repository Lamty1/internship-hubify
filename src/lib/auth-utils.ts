
import { useAuth0 } from '@auth0/auth0-react';
import { getUserByEmail, createUser } from './api';

export const useAuthManager = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
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
          const role = user['https://sattejli.com/roles'] || 'student';
          
          // Create new user in database with Auth0 data
          await createUser(
            user.email,
            'auth0_' + user.sub, // Use auth0 ID as password placeholder
            role
          );
        }
        
        return dbUser;
      } catch (error) {
        console.error('Error syncing user with database:', error);
        return null;
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
    getAccessTokenSilently
  };
};
