
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

// Sync user with database - Updated to handle RLS policy errors gracefully
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
        try {
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
            if (insertError.code === '42501') {
              // This is an RLS policy error, log it but continue with the flow
              console.log('RLS policy prevented user creation in database. This is normal if the user was already created by a trigger.');
            } else {
              console.error('Error creating user:', insertError);
              toast({
                title: "Synchronization note",
                description: "User data is available but not fully synced with the database.",
                variant: "default"
              });
            }
            // Continue with the flow even if we couldn't create a user entry
            // The user might have been created by a database trigger
            return { email: user.email, role };
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
              
            if (studentError && studentError.code !== '42501') {
              console.error('Error creating student profile:', studentError);
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
              
            if (companyError && companyError.code !== '42501') {
              console.error('Error creating company profile:', companyError);
            }
          }
          
          toast({
            title: "Account synced",
            description: `Your ${role} account has been synced successfully.`,
          });
          
          return newUser;
        } catch (insertErr) {
          console.error('Exception during user creation:', insertErr);
          // Continue with the flow even if we couldn't create a user entry
          return { email: user.email, role };
        }
      } else {
        console.log("User already exists in database:", existingUser);
        return existingUser;
      }
    } catch (error) {
      console.error('Error syncing user with database:', error);
      toast({
        title: "Synchronization note",
        description: "There was a small issue syncing your account, but you can still use the app.",
        variant: "default"
      });
      // Return minimal user data to allow the app to continue
      return { 
        email: user.email, 
        role: user.user_metadata?.role || 'student' 
      };
    }
  }
  return null;
};

// Get user role - Updated to work with Supabase tables directly and handle errors gracefully
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
      
      if (error && error.code !== '42501') {
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
      // Return a default role to allow the app to continue
      const fallbackRole = user.user_metadata?.role || 'student';
      console.log("Using fallback role from metadata:", fallbackRole);
      return fallbackRole;
    }
  }
  return null;
};
