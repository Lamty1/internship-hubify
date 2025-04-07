
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

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
      async (event, currentSession) => {
        console.log('Auth state change:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Handle session changes
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (currentSession?.user) {
            // Use setTimeout to prevent recursion issues
            setTimeout(() => {
              syncUserWithDatabase();
            }, 0);
          }
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Got session:', currentSession?.user?.email);
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
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      console.log('Attempting login for:', email);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error details:', error);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      console.log('Login successful for:', email);
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      
      return;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  // Sign up with email and password
  const signUp = async (email: string, password: string, role: 'student' | 'company'): Promise<void> => {
    try {
      console.log('Attempting signup for:', email, 'with role:', role);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
          },
          emailRedirectTo: `${window.location.origin}/`,
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
      
      console.log('Signup successful data:', data);
      
      // Important: The user might need to confirm their email before being fully authenticated
      if (data?.user && !data.session) {
        toast({
          title: "Email confirmation",
          description: "Please check your email to confirm your registration.",
        });
      } else if (data?.session) {
        toast({
          title: "Registration successful",
          description: "Your account has been created.",
        });
      }
      
      return;
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

  // Sync user with database - Updated to work with Supabase tables directly
  const syncUserWithDatabase = async () => {
    if (user?.email) {
      try {
        console.log("Syncing user with database:", user.email);
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();
        
        if (fetchError) {
          console.error('Error fetching user:', fetchError);
          return null;
        }
        
        if (!existingUser) {
          // Extract role from user metadata
          const role = user.user_metadata?.role || 'student';
          
          console.log("Creating new user in database with role:", role);
          
          // Create user in your database
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
          
          // Now create the appropriate profile based on role
          if (role === 'student') {
            // Create empty student profile
            const { error: studentError } = await supabase
              .from('students')
              .insert([
                {
                  user_id: newUser.id,
                  first_name: '',
                  last_name: ''
                }
              ]);
              
            if (studentError) {
              console.error('Error creating student profile:', studentError);
              return null;
            }
          } else if (role === 'company') {
            // Create empty company profile
            const { error: companyError } = await supabase
              .from('companies')
              .insert([
                {
                  user_id: newUser.id,
                  name: ''
                }
              ]);
              
            if (companyError) {
              console.error('Error creating company profile:', companyError);
              return null;
            }
          }
          
          toast({
            title: "Account created",
            description: `Your ${role} account has been created successfully.`,
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

  // Get user role - Updated to work with Supabase tables directly
  const getUserRole = async (): Promise<string | null> => {
    if (user?.email) {
      try {
        console.log("Getting user role for email:", user.email);
        
        // Get role from users table
        const { data: dbUser, error } = await supabase
          .from('users')
          .select('role')
          .eq('email', user.email)
          .maybeSingle();
        
        if (error) {
          console.error('Error getting user role from database:', error);
        }
        
        if (dbUser?.role) {
          console.log("Got user role from database:", dbUser.role);
          return dbUser.role;
        }
        
        // If not found in database yet, extract from user metadata
        const metadataRole = user.user_metadata?.role;
        if (metadataRole) {
          console.log("Got user role from metadata:", metadataRole);
          return metadataRole;
        }
        
        // Default to student if no role is found
        return 'student';
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
