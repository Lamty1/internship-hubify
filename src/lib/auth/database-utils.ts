
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

// Sync user with database - Updated to work with Supabase tables directly
export const syncUserWithDatabase = async (user: User | null) => {
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
export const getUserRole = async (user: User | null): Promise<string | null> => {
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
