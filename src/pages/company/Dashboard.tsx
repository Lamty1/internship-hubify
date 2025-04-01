
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
  
  // Mock applications data
  const mockApplications = [
    {
      id: '1',
      student: {
        firstName: 'John',
        lastName: 'Doe'
      },
      internship: {
        title: 'Frontend Developer'
      },
      status: 'pending',
      submittedAt: new Date().toISOString(),
      coverLetter: 'I am very interested in this position...',
      resumeUrl: '#'
    },
    {
      id: '2',
      student: {
        firstName: 'Jane',
        lastName: 'Smith'
      },
      internship: {
        title: 'Backend Developer'
      },
      status: 'reviewed',
      submittedAt: new Date().toISOString(),
      coverLetter: 'I have 2 years of experience in...',
      resumeUrl: '#'
    }
  ];
  
  const handleEditProfile = () => {
    navigate('/company-profile');
  };
  
  const handlePostInternship = () => {
    navigate('/post-internship');
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
          <ApplicationsTab applications={mockApplications} />
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
