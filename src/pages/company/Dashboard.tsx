
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CompanySidebar from '@/components/company/Sidebar';
import DashboardTab from '@/components/company/DashboardTab';
import ApplicationsTab from '@/components/company/ApplicationsTab';
import ProfileTab from '@/components/company/ProfileTab';
import NotificationsTab from '@/components/company/NotificationsTab';
import SettingsTab from '@/components/company/SettingsTab';
import { getCompanyByUserId, getApplicationsByCompany } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

// For demo purposes, we'll use a fixed user ID
// In a real application, this would come from authentication
const DEMO_USER_ID = '1';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch company data
  const { data: companyData, isLoading: isLoadingCompany, error: companyError } = useQuery({
    queryKey: ['company', DEMO_USER_ID],
    queryFn: () => getCompanyByUserId(DEMO_USER_ID),
  });

  // Fetch applications
  const { data: applications, isLoading: isLoadingApplications } = useQuery({
    queryKey: ['applications', companyData?.id],
    queryFn: () => companyData?.id ? getApplicationsByCompany(companyData.id) : Promise.resolve([]),
    enabled: !!companyData?.id,
  });

  const handleEditProfile = () => {
    navigate('/company-profile');
  };
  
  const handlePostInternship = () => {
    navigate('/post-internship');
  };

  if (isLoadingCompany) {
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
          <NotificationsTab userId={DEMO_USER_ID} />
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
