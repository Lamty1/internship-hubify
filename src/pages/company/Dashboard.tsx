
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
      
      const { data, error } = await supabase
        .from('companies')
        .select(`
          *,
          internships (*)
        `)
        .eq('user_id', userData.id)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!userData?.id,
  });

  // Fetch applications for this company's internships
  const { data: applications, isLoading: isLoadingApplications } = useQuery({
    queryKey: ['applications', companyData?.id],
    queryFn: async () => {
      if (!companyData?.id) return [];
      
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
    },
    enabled: !!companyData?.id,
  });

  // Fetch notifications for this user
  const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
    queryKey: ['notifications', userData?.id],
    queryFn: async () => {
      if (!userData?.id) return [];
      
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userData.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!userData?.id,
  });

  const handleEditProfile = () => {
    navigate('/company-profile');
  };
  
  const handlePostInternship = () => {
    navigate('/post-internship');
  };

  if (isLoadingUser || isLoadingCompany) {
    return <div className="flex min-h-screen items-center justify-center">Loading company data...</div>;
  }

  if (companyError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Error loading company data</h1>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  const companyInfo = companyData || {
    name: 'Company Name',
    logo: 'https://via.placeholder.com/100',
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
