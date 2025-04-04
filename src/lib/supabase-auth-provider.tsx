
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface SupabaseAuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'student' | 'company') => Promise<void>;
  signOut: () => Promise<void>;
  getUserRole: () => Promise<string | null>;
  syncUserWithDatabase: () => Promise<any>;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

export const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state change:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Handle session changes
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (currentSession?.user) {
            // Sync user with database when signed in
            setTimeout(() => {
              syncUserWithDatabase();
            }, 0);
          }
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
      
      if (currentSession?.user) {
        syncUserWithDatabase();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      
      // We don't need to navigate here as the onAuthStateChange handler will detect the session
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  // Sign up with email and password
  const signUp = async (email: string, password: string, role: 'student' | 'company') => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
          },
        },
      });
      
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      
      // We store the role in user metadata
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  };
  
  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Sync user with database
  const syncUserWithDatabase = async () => {
    if (user?.email) {
      try {
        console.log("Syncing user with local database:", user.email);
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single();
        
        if (fetchError && fetchError.code !== 'PGSQL_ERROR_NO_ROWS') {
          console.error('Error fetching user:', fetchError);
          return null;
        }
        
        if (!existingUser) {
          // Extract role from user metadata
          const role = user.user_metadata?.role || 'student';
          
          console.log("Creating new user in local database with role:", role);
          
          // Create user in your local database
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([
              {
                email: user.email,
                auth_id: user.id,
                role: role
              }
            ])
            .select()
            .single();
          
          if (insertError) {
            console.error('Error creating user:', insertError);
            toast({
              title: "Synchronization error",
              description: "There was a problem syncing your account with the database.",
              variant: "destructive"
            });
            return null;
          }
          
          toast({
            title: "Account synchronized",
            description: "Your account has been created in the database.",
          });
          
          return newUser;
        } else {
          console.log("User already exists in database:", existingUser);
          return existingUser;
        }
      } catch (error) {
        console.error('Error syncing user with database:', error);
        toast({
          title: "Synchronization error",
          description: "There was a problem syncing your account with the database.",
          variant: "destructive"
        });
        return null;
      }
    }
    return null;
  };

  // Get user role
  const getUserRole = async (): Promise<string | null> => {
    if (user?.email) {
      try {
        // First attempt to get role from local database
        const { data: dbUser, error } = await supabase
          .from('users')
          .select('role')
          .eq('email', user.email)
          .single();
          
        if (error) {
          console.error('Error getting user role:', error);
          // If not in database yet, extract from user metadata
          return user.user_metadata?.role || 'student';
        }
        
        if (dbUser) {
          return dbUser.role;
        }
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    }
    return null;
  };

  return (
    <SupabaseAuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
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
