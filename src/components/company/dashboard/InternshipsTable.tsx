
import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface InternshipTableProps {
  internships: any[];
  companyId?: string;
  isLoading: boolean;
}

const InternshipsTable = ({ internships, companyId, isLoading }: InternshipTableProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
    onSuccess: () => {
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

  if (isLoading) {
    return <div className="p-6 text-center">Loading internship data...</div>;
  }

  if (internships.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No internships posted yet. Click "Post New Internship" to get started.
      </div>
    );
  }

  return (
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
        {internships.map((internship: any) => (
          <tr key={internship.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{internship.title}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{internship.applications || 0}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(internship.status)}`}>
                {internship.status || 'active'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {internship.posted ? new Date(internship.posted).toLocaleDateString() : 'Unknown'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {internship.application_deadline ? new Date(internship.application_deadline).toLocaleDateString() : 'Unknown'}
            </td>
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
  );
};

export default InternshipsTable;
