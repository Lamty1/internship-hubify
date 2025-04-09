
import { supabase } from "@/integrations/supabase/client";
import { InternshipFormData } from "@/types/company";

export const updateApplicationStatus = async (applicationId: string, status: string) => {
  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', applicationId);

  if (error) throw error;
  return true;
};

export const getCompanyByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const createInternship = async (internshipData: InternshipFormData, companyId: string) => {
  const { data, error } = await supabase
    .from('internships')
    .insert({ 
      title: internshipData.title,
      location: internshipData.location,
      type: internshipData.type,
      start_date: internshipData.startDate,
      end_date: internshipData.endDate,
      salary: internshipData.salary,
      description: internshipData.description,
      responsibilities: internshipData.responsibilities,
      requirements: internshipData.requirements,
      skills: internshipData.skills,
      application_deadline: internshipData.applicationDeadline,
      positions: internshipData.positions,
      company_id: companyId
    })
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

export const getAllInternships = async (filters: any = {}) => {
  // Start with a base query
  let query = supabase
    .from('internships')
    .select(`
      *,
      company:companies(name, logo)
    `)
    .eq('status', 'active');

  // Apply filters if provided
  if (filters.location) {
    query = query.eq('location', filters.location);
  }

  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  if (filters.skills && filters.skills.length > 0) {
    // Check if any of the skills match
    query = query.contains('skills', filters.skills);
  }

  const { data, error } = await query;

  if (error) throw error;
  
  // Transform the data to include a posted date if it's missing
  const internshipsWithDates = data?.map(internship => ({
    ...internship,
    posted: internship.posted || internship.created_at || new Date().toISOString()
  })) || [];

  return internshipsWithDates;
};
