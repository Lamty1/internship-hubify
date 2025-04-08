
import { Session, User } from '@supabase/supabase-js';

export interface SupabaseAuthContextType {
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
