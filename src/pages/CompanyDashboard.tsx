import { useState } from 'react';
import { 
  Users, 
  BriefcaseIcon, 
  Bell, 
  Settings, 
  LogOut, 
  Plus, 
  FileText as FileIcon, 
  CheckCircle, 
  User, 
  Building, 
  Mail, 
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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

  const internships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      applications: 12,
      status: 'Active',
      posted: '2023-05-15',
      deadline: '2023-06-30',
    },
    {
      id: 2,
      title: 'UI/UX Design Intern',
      applications: 8,
      status: 'Active',
      posted: '2023-05-20',
      deadline: '2023-06-30',
    },
    {
      id: 3,
      title: 'Backend Developer Intern',
      applications: 5,
      status: 'Draft',
      posted: '2023-05-22',
      deadline: '2023-07-15',
    },
  ];

  const applications = [
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
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
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
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Company Portal</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'dashboard' ? 'bg-sattejli-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <BriefcaseIcon className="mr-3 h-5 w-5" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'applications' ? 'bg-sattejli-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('applications')}
              >
                <Users className="mr-3 h-5 w-5" />
                Applications
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'profile' ? 'bg-sattejli-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <Building className="mr-3 h-5 w-5" />
                Company Profile
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'notifications' ? 'bg-sattejli-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="mr-3 h-5 w-5" />
                Notifications
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'settings' ? 'bg-sattejli-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </button>
            </li>
            <li className="pt-6">
              <button
                className="w-full text-left px-4 py-2 rounded-md flex items-center text-red-600 hover:bg-red-50"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <Button className="bg-sattejli-blue hover:bg-blue-600" onClick={handlePostInternship}>
                <Plus className="mr-2 h-4 w-4" /> Post New Internship
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Internships</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">2</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BriefcaseIcon className="h-6 w-6 text-sattejli-blue" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">25</p>
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
                    <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
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
                    {internships.map((internship) => (
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
                          <Link to={`/edit-internship/${internship.id}`} className="text-sattejli-blue hover:text-blue-700 mr-3">
                            Edit
                          </Link>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
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
        )}

        {/* Company Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <img src={companyInfo.logo} alt="Company Logo" className="w-20 h-20 rounded-full mr-6" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{companyInfo.name}</h2>
                    <p className="text-gray-600">{companyInfo.industry} • {companyInfo.location}</p>
                  </div>
                  <Button className="ml-auto bg-sattejli-blue hover:bg-blue-600" onClick={handleEditProfile}>
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Building className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Industry</p>
                          <p className="text-sm text-gray-900">{companyInfo.industry}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Email</p>
                          <p className="text-sm text-gray-900">{companyInfo.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Phone</p>
                          <p className="text-sm text-gray-900">{companyInfo.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Website</p>
                          <p className="text-sm text-gray-900">{companyInfo.website}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About Company</h3>
                    <p className="text-gray-700">{companyInfo.description}</p>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Company Benefits</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Modern office in central Tunis</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Flexible working hours</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Professional development opportunities</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">Potential for full-time employment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
                <Button variant="outline">Mark All as Read</Button>
              </div>
              
              <div className="divide-y divide-gray-100">
                <div className="p-6 hover:bg-gray-50 flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <FileIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New application received</p>
                    <p className="text-sm text-gray-600">Fatima Mansour applied for UI/UX Design Intern position</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="p-6 hover:bg-gray-50 flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Internship posting approved</p>
                    <p className="text-sm text-gray-600">Your Frontend Developer Intern posting has been approved and is now live</p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
                
                <div className="p-6 hover:bg-gray-50 flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-4">
                    <Bell className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Reminder: Internship deadline approaching</p>
                    <p className="text-sm text-gray-600">The application deadline for UI/UX Design Intern is in 5 days</p>
                    <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
              </div>
              
              <div className="p-6">
                <Tabs defaultValue="account">
                  <TabsList className="mb-6">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="account" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          id="companyName"
                          type="text"
                          className="input-field w-full"
                          defaultValue={companyInfo.name}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                          Industry
                        </label>
                        <input
                          id="industry"
                          type="text"
                          className="input-field w-full"
                          defaultValue={companyInfo.industry}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="input-field w-full"
                          defaultValue={companyInfo.email}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          className="input-field w-full"
                          defaultValue={companyInfo.phone}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <input
                          id="website"
                          type="url"
                          className="input-field w-full"
                          defaultValue={companyInfo.website}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          id="location"
                          type="text"
                          className="input-field w-full"
                          defaultValue={companyInfo.location}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Description
                        </label>
                        <textarea
                          id="description"
                          rows={4}
                          className="input-field w-full"
                          defaultValue={companyInfo.description}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-sattejli-blue hover:bg-blue-600">Save Changes</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="password" className="space-y-6">
                    <div className="max-w-md">
                      <div className="mb-4">
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          id="currentPassword"
                          type="password"
                          className="input-field w-full"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          className="input-field w-full"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          className="input-field w-full"
                        />
                      </div>
                      
                      <Button className="bg-sattejli-blue hover:bg-blue-600">Update Password</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="emailNotifications"
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="emailNotifications" className="font-medium text-gray-700">Email Notifications</label>
                          <p className="text-gray-500">Receive email notifications about new applications and messages</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="applicationUpdates"
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="applicationUpdates" className="font-medium text-gray-700">Application Updates</label>
                          <p className="text-gray-500">Receive notifications about application status changes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="marketingEmails"
                            type="checkbox"
                            className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="marketingEmails" className="font-medium text-gray-700">Marketing Emails</label>
                          <p className="text-gray-500">Receive updates about new features and promotions</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-sattejli-blue hover:bg-blue-600">Save Preferences</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
