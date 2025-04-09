
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useCompanyData = (userId: string | undefined) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["company", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No user found");
      
      try {
        // First get the user record to find their linked company
        const { data: userRecord, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("auth_id", userId)
          .single();
          
        if (userError) {
          console.error("Error fetching user record:", userError);
          throw userError;
        }
        
        if (!userRecord?.id) {
          console.error("No user record found for auth ID:", userId);
          throw new Error("User record not found");
        }
        
        // Then get company data
        const { data, error } = await supabase
          .from("companies")
          .select(`
            *,
            internships (*)
          `)
          .eq("user_id", userRecord.id)
          .maybeSingle();
          
        if (error) throw error;
        
        // Create a default company profile if none exists
        if (!data) {
          const { data: newCompany, error: createError } = await supabase
            .from("companies")
            .insert([
              { 
                user_id: userRecord.id, 
                name: "My Company", 
                description: "Add your company description here"
              }
            ])
            .select()
            .single();
            
          if (createError) throw createError;
          return { ...newCompany, internships: [] };
        }
        
        return data;
      } catch (error) {
        console.error("Error fetching company data:", error);
        toast({
          title: "Error loading company data",
          description: "Please try refreshing the page or contact support.",
          variant: "destructive"
        });
        throw error;
      }
    },
    enabled: !!userId,
    retry: 1,
  });
};
