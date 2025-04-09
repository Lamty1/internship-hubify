
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "@/lib/supabase-auth-provider";
import DashboardLayout from "@/components/company/DashboardLayout";
import DashboardTab from "@/components/company/DashboardTab";
import ApplicationsTab from "@/components/company/ApplicationsTab";
import ProfileTab from "@/components/company/ProfileTab";
import NotificationsTab from "@/components/company/NotificationsTab";
import SettingsTab from "@/components/company/SettingsTab";
import SampleDataGenerator from "@/components/company/SampleDataGenerator";
import { useCompanyData } from "@/hooks/useCompanyData";
import { useCompanyApplications } from "@/hooks/useCompanyApplications";
import { useCompanyNotifications } from "@/hooks/useCompanyNotifications";

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();

  // Fetch company data
  const { 
    data: companyData, 
    isLoading: isLoadingCompany, 
    error: companyError 
  } = useCompanyData(user?.id);

  // Fetch applications for this company's internships
  const { 
    data: applications, 
    isLoading: isLoadingApplications 
  } = useCompanyApplications(companyData?.id);

  // Fetch notifications for this user
  const { 
    data: notifications, 
    isLoading: isLoadingNotifications 
  } = useCompanyNotifications(user?.id);

  const handleEditProfile = () => {
    navigate("/company-profile");
  };
  
  const handlePostInternship = () => {
    navigate("/post-internship");
  };

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
    name: "Company Name",
    logo: "/placeholder.svg",
    industry: "Industry",
    location: "Location",
    website: "website.com",
    email: "email@example.com",
    phone: "+123456789",
    description: "Company description",
  };

  const shouldGenerateSampleData = 
    companyData && 
    companyData.internships && 
    companyData.internships.length === 0;

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {shouldGenerateSampleData && activeTab === "dashboard" && (
        <SampleDataGenerator 
          companyId={companyData?.id}
          userId={user?.id}
          shouldGenerateInternship={shouldGenerateSampleData}
        />
      )}

      {activeTab === "dashboard" && (
        <DashboardTab 
          handlePostInternship={handlePostInternship}
          companyId={companyData?.id}
          internships={companyData?.internships || []}
        />
      )}

      {activeTab === "applications" && (
        <ApplicationsTab 
          applications={applications || []}
          isLoading={isLoadingApplications}
        />
      )}

      {activeTab === "profile" && (
        <ProfileTab 
          companyInfo={companyInfo} 
          handleEditProfile={handleEditProfile} 
        />
      )}

      {activeTab === "notifications" && (
        <NotificationsTab 
          userId={user?.id || ""}
          notifications={notifications || []}
          isLoading={isLoadingNotifications}
        />
      )}

      {activeTab === "settings" && (
        <SettingsTab 
          companyInfo={companyInfo} 
        />
      )}
    </DashboardLayout>
  );
};

export default CompanyDashboard;
