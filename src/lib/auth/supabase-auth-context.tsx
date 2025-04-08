
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupabaseAuthContextType } from './types';
import { useAuthSession } from './use-auth-session';
import { signInWithEmailAndPassword, signUpWithEmailAndPassword, signOut } from './auth-utils';
import { syncUserWithDatabase as syncUserWithDb, getUserRole as fetchUserRole } from './database-utils';

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

export const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user, session, isLoading, isAuthenticated } = useAuthSession();

  // Sign in wrapper
  const signIn = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(email, password);
  };
  
  // Sign up wrapper
  const signUp = async (email: string, password: string, role: 'student' | 'company'): Promise<void> => {
    await signUpWithEmailAndPassword(email, password, role);
  };
  
  // Sign out wrapper with navigation
  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      navigate('/login');
    }
  };

  // Database sync wrapper
  const syncUserWithDatabase = async () => {
    return await syncUserWithDb(user);
  };

  // Get user role wrapper
  const getUserRole = async (): Promise<string | null> => {
    return await fetchUserRole(user);
  };

  return (
    <SupabaseAuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated,
        signIn,
        signUp,
        signOut: handleSignOut,
        getUserRole,
        syncUserWithDatabase
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};
