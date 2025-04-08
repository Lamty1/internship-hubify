
import { useEffect, useState } from 'react';
import { BriefcaseIcon, FileText as FileIcon, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DashboardTabProps {
  handlePostInternship: () => void;
  companyId?: string;
  internships?: any[];
}

const DashboardTab = ({ handlePostInternship, companyId, internships = [] }: DashboardTabProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [stats, setStats] = useState({
    activeInternships: 0,
    totalApplications: 0,
    newApplications: 0
  });

  // Fetch applications data for statistics
  const { data: applications, isLoading: isLoadingApplications } = useQuery({
    queryKey: ['applications-stats', companyId],
    queryFn: async () => {
      if (!companyId) return [];
      
      try {
        const { data, error } = await supabase
          .from('applications')
          .select('*, internship:internship_id(*)')
          .eq('internship.company_id', companyId);
          
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

  // Mutation for deleting an internship
  const deleteInternshipMutation = useMutation({
    mutationFn: async (internshipId: string) => {
      if (!companyId) throw new Error("Company ID is required");
      
      const { error } = await supabase
        .from('internships')
        .delete()
        .eq('id', internshipId)
        .eq('company_id', companyId);
        
      if (error) throw error;
      return internshipId;
    },
    onSuccess: (internshipId) => {
      queryClient.invalidateQueries({ queryKey: ['company', companyId] });
      toast({
        title: "Internship deleted",
        description: "The internship has been successfully deleted",
      });
    },
    onError: (error) => {
      console.error("Error deleting internship:", error);
      toast({
        title: "Error",
        description: "Failed to delete internship. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleDeleteInternship = (internshipId: string) => {
    if (confirm("Are you sure you want to delete this internship?")) {
      deleteInternshipMutation.mutate(internshipId);
    }
  };

  // Parse and format internships data for display
  const formattedInternships = (internships || []).map((internship: any) => ({
    id: internship.id,
    title: internship.title,
    applications: 0, // We'll calculate this from applications data
    status: internship.status || 'active',
    posted: internship.posted ? new Date(internship.posted).toLocaleDateString() : 'Unknown',
    deadline: internship.application_deadline ? new Date(internship.application_deadline).toLocaleDateString() : 'Unknown',
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={handlePostInternship}>
          <Plus className="mr-2 h-4 w-4" /> Post New Internship
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Internships</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeInternships}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalApplications}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FileIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.newApplications}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Bell className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Internships Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Your Internships</h2>
        </div>
        <div className="overflow-x-auto">
          {isLoadingApplications ? (
            <div className="p-6 text-center">Loading internship data...</div>
          ) : formattedInternships.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No internships posted yet. Click "Post New Internship" to get started.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {formattedInternships.map((internship: any) => (
                  <tr key={internship.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{internship.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{internship.applications}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(internship.status)}`}>
                        {internship.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{internship.posted}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{internship.deadline}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/edit-internship/${internship.id}`} className="text-blue-600 hover:text-blue-700 mr-3">
                        Edit
                      </Link>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteInternship(internship.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
