
import { ApplicationData } from '@/types/company';

interface ApplicationsTabProps {
  viewApplicantProfile: (id: number) => void;
  handleContactApplicant: (name: string) => void;
}

const ApplicationsTab = ({ 
  viewApplicantProfile, 
  handleContactApplicant 
}: ApplicationsTabProps) => {
  // Mock data for demonstration
  const applications: ApplicationData[] = [
    {
      id: 1,
      name: 'Ahmed Ben Ali',
      position: 'Frontend Developer Intern',
      status: 'Reviewed',
      date: '2023-05-18',
    },
    {
      id: 2,
      name: 'Fatima Mansour',
      position: 'UI/UX Design Intern',
      status: 'New',
      date: '2023-05-21',
    },
    {
      id: 3,
      name: 'Youssef Khelil',
      position: 'Frontend Developer Intern',
      status: 'Interview',
      date: '2023-05-16',
    },
    {
      id: 4,
      name: 'Nour Sassi',
      position: 'Backend Developer Intern',
      status: 'Rejected',
      date: '2023-05-19',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Reviewed':
        return 'bg-purple-100 text-purple-800';
      case 'Interview':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
          <div className="flex space-x-2">
            <select className="border border-gray-300 rounded-md text-sm p-2">
              <option>All Positions</option>
              <option>Frontend Developer Intern</option>
              <option>UI/UX Design Intern</option>
              <option>Backend Developer Intern</option>
            </select>
            <select className="border border-gray-300 rounded-md text-sm p-2">
              <option>All Statuses</option>
              <option>New</option>
              <option>Reviewed</option>
              <option>Interview</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div 
                      className="text-sm font-medium text-gray-900 cursor-pointer hover:text-sattejli-blue"
                      onClick={() => viewApplicantProfile(application.id)}
                    >
                      {application.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-sattejli-blue hover:text-blue-700 mr-3"
                      onClick={() => viewApplicantProfile(application.id)}
                    >
                      View
                    </button>
                    <button 
                      className="text-green-600 hover:text-green-900 mr-3"
                      onClick={() => handleContactApplicant(application.name)}
                    >
                      Contact
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTab;
