
import { useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { syncUserWithDatabase } from './database-utils';

export function useAuthSession() {
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
              syncUserWithDatabase(currentSession.user);
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
        syncUserWithDatabase(currentSession.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
  };
}
