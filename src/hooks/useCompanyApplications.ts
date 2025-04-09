
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCompanyApplications = (companyId: string | undefined) => {
  return useQuery({
    queryKey: ["applications-stats", companyId],
    queryFn: async () => {
      if (!companyId) return [];
      
      try {
        const { data, error } = await supabase
          .from("applications")
          .select("*, internship:internship_id(*)")
          .eq("internship.company_id", companyId);
          
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error("Error fetching applications:", error);
        return [];
      }
    },
    enabled: !!companyId,
    retry: 1,
  });
};
