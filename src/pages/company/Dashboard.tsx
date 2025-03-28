
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CompanySidebar from '@/components/company/Sidebar';
import DashboardTab from '@/components/company/DashboardTab';
import ApplicationsTab from '@/components/company/ApplicationsTab';
import ProfileTab from '@/components/company/ProfileTab';
import NotificationsTab from '@/components/company/NotificationsTab';
import SettingsTab from '@/components/company/SettingsTab';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data for demonstration
  const companyInfo = {
    name: 'TechCorp Solutions',
    logo: 'https://via.placeholder.com/100',
    industry: 'Information Technology',
    location: 'Tunis, Tunisia',
    website: 'www.techcorp.tn',
    email: 'contact@techcorp.tn',
    phone: '+216 71 123 456',
    description: 'TechCorp Solutions is a leading IT company specializing in software development, cloud solutions, and digital transformation services.',
  };
  
  const handleEditProfile = () => {
    navigate('/company-profile');
  };
  
  const handlePostInternship = () => {
    navigate('/post-internship');
  };
  
  const viewApplicantProfile = (id: number) => {
    navigate(`/applicant-profile/${id}`);
  };
  
  const handleContactApplicant = (name: string) => {
    toast({
      title: "Contact initiated",
      description: `Opening email to contact ${name}...`,
    });
    // In a real app, this would open an email compose window or an in-app messaging system
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
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsTab 
            viewApplicantProfile={viewApplicantProfile}
            handleContactApplicant={handleContactApplicant}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab 
            companyInfo={companyInfo} 
            handleEditProfile={handleEditProfile} 
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsTab />
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
