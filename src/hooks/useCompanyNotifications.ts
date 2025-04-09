
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCompanyNotifications = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      try {
        // First get the user record to find their ID in our database
        const { data: userRecord, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("auth_id", userId)
          .single();
          
        if (userError) {
          console.error("Error fetching user record for notifications:", userError);
          return [];
        }
        
        if (!userRecord?.id) return [];
        
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", userRecord.id)
          .order("created_at", { ascending: false });
          
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
      }
    },
    enabled: !!userId,
  });
};
