
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsSection from './dashboard/StatsSection';
import InternshipsTable from './dashboard/InternshipsTable';
import { useCompanyApplications } from '@/hooks/useCompanyApplications';

interface DashboardTabProps {
  handlePostInternship: () => void;
  companyId?: string;
  internships?: any[];
}

const DashboardTab = ({ handlePostInternship, companyId, internships = [] }: DashboardTabProps) => {
  const [stats, setStats] = useState({
    activeInternships: 0,
    totalApplications: 0,
    newApplications: 0
  });

  // Fetch applications data for statistics
  const { data: applications, isLoading: isLoadingApplications } = useCompanyApplications(companyId);

  // Parse and format internships data for display
  const formattedInternships = (internships || []).map((internship: any) => ({
    ...internship,
    applications: 0, // We'll calculate this from applications data
  }));

  useEffect(() => {
    if (internships && applications) {
      // Create a map of internship IDs to application counts
      const appCountMap = applications.reduce((acc: Record<string, number>, app: any) => {
        const internshipId = app.internship_id;
        if (internshipId) {
          acc[internshipId] = (acc[internshipId] || 0) + 1;
        }
        return acc;
      }, {});
      
      // Update formatted internships with application counts
      formattedInternships.forEach(internship => {
        internship.applications = appCountMap[internship.id] || 0;
      });
      
      // Calculate statistics
      const active = internships.filter((i: any) => i.status === 'active').length;
      const total = applications.length;
      const newApps = applications.filter((a: any) => !a.status || a.status === 'pending').length;
      
      setStats({
        activeInternships: active,
        totalApplications: total,
        newApplications: newApps
      });
    }
  }, [internships, applications]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={handlePostInternship}>
          <Plus className="mr-2 h-4 w-4" /> Post New Internship
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsSection
        activeInternships={stats.activeInternships}
        totalApplications={stats.totalApplications}
        newApplications={stats.newApplications}
      />

      {/* Internships Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Your Internships</h2>
        </div>
        <div className="overflow-x-auto">
          <InternshipsTable
            internships={formattedInternships}
            companyId={companyId}
            isLoading={isLoadingApplications}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
