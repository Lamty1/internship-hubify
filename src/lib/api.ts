
import { supabase } from "@/integrations/supabase/client";

export const updateApplicationStatus = async (applicationId: string, status: string) => {
  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', applicationId);

  if (error) throw error;
  return true;
};

export const createInternship = async (internshipData: any, companyId: string) => {
  const { data, error } = await supabase
    .from('internships')
    .insert({ ...internshipData, company_id: companyId })
    .select('id')
    .single();

  if (error) throw error;
  return data;
};

export const updateInternship = async (internshipId: string, internshipData: any) => {
  const { error } = await supabase
    .from('internships')
    .update(internshipData)
    .eq('id', internshipId);

  if (error) throw error;
  return true;
};
