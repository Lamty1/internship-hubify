
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CompanySidebar from '@/components/company/Sidebar';
import DashboardTab from '@/components/company/DashboardTab';
import ApplicationsTab from '@/components/company/ApplicationsTab';
import ProfileTab from '@/components/company/ProfileTab';
import NotificationsTab from '@/components/company/NotificationsTab';
import SettingsTab from '@/components/company/SettingsTab';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get current user
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      return user;
    },
  });

  // Fetch company data
  const { data: companyData, isLoading: isLoadingCompany, error: companyError } = useQuery({
    queryKey: ['company', userData?.id],
    queryFn: async () => {
      if (!userData?.id) return null;
      
      try {
        // First get the user record to find their linked company
        const { data: userRecord, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('auth_id', userData.id)
          .single();
          
        if (userError) {
          console.error('Error fetching user record:', userError);
          throw userError;
        }
        
        if (!userRecord?.id) {
          console.error('No user record found for auth ID:', userData.id);
          throw new Error('User record not found');
        }
        
        // Then get company data
        const { data, error } = await supabase
          .from('companies')
          .select(`
            *,
            internships (*)
          `)
          .eq('user_id', userRecord.id)
          .maybeSingle();
          
        if (error) throw error;
        
        // Create a default company profile if none exists
        if (!data) {
          const { data: newCompany, error: createError } = await supabase
            .from('companies')
            .insert([
              { 
                user_id: userRecord.id, 
                name: 'My Company', 
                description: 'Add your company description here'
              }
            ])
            .select('*')
            .single();
            
          if (createError) throw createError;
          return { ...newCompany, internships: [] };
        }
        
        return data;
      } catch (error) {
        console.error('Error fetching company data:', error);
        toast({
          title: "Error loading company data",
          description: "Please try refreshing the page or contact support.",
          variant: "destructive"
        });
        throw error;
      }
    },
    enabled: !!userData?.id,
    retry: 1,
  });

  // Fetch applications for this company's internships
  const { data: applications, isLoading: isLoadingApplications } = useQuery({
    queryKey: ['applications', companyData?.id],
    queryFn: async () => {
      if (!companyData?.id) return [];
      
      try {
        const { data, error } = await supabase
          .from('applications')
          .select(`
            *,
            student:student_id (
              first_name,
              last_name,
              university,
              profile_image
            ),
            internship:internship_id (
              title
            )
          `)
          .eq('internship.company_id', companyData.id);
          
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching applications:', error);
        return [];
      }
    },
    enabled: !!companyData?.id,
  });

  // Fetch notifications for this user
  const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
    queryKey: ['notifications', userData?.id],
    queryFn: async () => {
      if (!userData?.id) return [];
      
      try {
        // First get the user record to find their ID in our database
        const { data: userRecord, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('auth_id', userData.id)
          .single();
          
        if (userError) {
          console.error('Error fetching user record for notifications:', userError);
          return [];
        }
        
        if (!userRecord?.id) return [];
        
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', userRecord.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
      }
    },
    enabled: !!userData?.id,
  });

  const handleEditProfile = () => {
    navigate('/company-profile');
  };
  
  const handlePostInternship = () => {
    navigate('/post-internship');
  };

  // Add sample data for testing if needed
  useEffect(() => {
    if (companyData && companyData.internships && companyData.internships.length === 0) {
      const createSampleInternship = async () => {
        try {
          // Only create sample data if there are no internships
          const { error } = await supabase
            .from('internships')
            .insert([
              {
                company_id: companyData.id,
                title: 'Sample Software Engineering Internship',
                location: 'Remote',
                type: 'Full-time',
                start_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                end_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
                application_deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                salary: '1000-1500 USD/month',
                description: 'This is a sample internship for testing purposes.',
                responsibilities: ['Code development', 'Testing', 'Documentation'],
                requirements: ['JavaScript knowledge', 'React experience'],
                skills: ['JavaScript', 'React', 'Node.js'],
                positions: 2,
                status: 'active'
              }
            ]);
            
          if (error) {
            console.error('Error creating sample internship:', error);
          }
        } catch (err) {
          console.error('Error in createSampleInternship:', err);
        }
      };
      
      createSampleInternship();
    }
  }, [companyData]);

  if (isLoadingUser) {
    return <div className="flex min-h-screen items-center justify-center">Loading user data...</div>;
  }

  if (isLoadingCompany && !companyError) {
    return <div className="flex min-h-screen items-center justify-center">Loading company data...</div>;
  }

  // Display an error message with an option to retry
  if (companyError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Error loading company data</h1>
        <p className="text-gray-600 mt-2 mb-4">Please try again later</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const companyInfo = companyData || {
    name: 'Company Name',
    logo: '/placeholder.svg',
    industry: 'Industry',
    location: 'Location',
    website: 'website.com',
    email: 'email@example.com',
    phone: '+123456789',
    description: 'Company description',
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <CompanySidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <DashboardTab 
            handlePostInternship={handlePostInternship}
            companyId={companyData?.id}
            internships={companyData?.internships || []}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsTab 
            applications={applications || []}
            isLoading={isLoadingApplications}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab 
            companyInfo={companyInfo} 
            handleEditProfile={handleEditProfile} 
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsTab 
            userId={userData?.id || ''}
            notifications={notifications}
            isLoading={isLoadingNotifications}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsTab 
            companyInfo={companyInfo} 
          />
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
