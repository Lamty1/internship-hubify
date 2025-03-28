import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  Bell, 
  MessageSquare, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Eye,
  UserCheck,
  XCircle,
  Calendar,
  Clock,
  Building2,
  BarChart3,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

// Mock data for internships
const MOCK_INTERNSHIPS = [
  {
    id: 1,
    title: 'Frontend Development Intern',
    department: 'Engineering',
    applications: 12,
    status: 'Active',
    postedDate: '2023-08-10',
    deadline: '2023-09-10',
  },
  {
    id: 2,
    title: 'Marketing Intern',
    department: 'Marketing',
    applications: 8,
    status: 'Active',
    postedDate: '2023-08-05',
    deadline: '2023-09-05',
  },
  {
    id: 3,
    title: 'Data Analyst Intern',
    department: 'Data Science',
    applications: 5,
    status: 'Draft',
    postedDate: '2023-08-01',
    deadline: '2023-09-01',
  },
  {
    id: 4,
    title: 'UI/UX Design Intern',
    department: 'Design',
    applications: 15,
    status: 'Closed',
    postedDate: '2023-07-15',
    deadline: '2023-08-15',
  },
];

// Mock applicants data
const MOCK_APPLICANTS = [
  {
    id: 1,
    name: 'Ahmed Ben Ali',
    position: 'Frontend Development Intern',
    education: 'Computer Science, University of Tunisia',
    status: 'New',
    appliedDate: '2023-08-15',
    avatar: 'AB',
  },
  {
    id: 2,
    name: 'Leila Mansour',
    position: 'Frontend Development Intern',
    education: 'Software Engineering, INSAT',
    status: 'Reviewed',
    appliedDate: '2023-08-14',
    avatar: 'LM',
  },
  {
    id: 3,
    name: 'Mohamed Karim',
    position: 'Marketing Intern',
    education: 'Business Administration, MedTech',
    status: 'Interview',
    appliedDate: '2023-08-10',
    avatar: 'MK',
  },
  {
    id: 4,
    name: 'Yasmine Trabelsi',
    position: 'Marketing Intern',
    education: 'Digital Marketing, IHEC',
    status: 'Rejected',
    appliedDate: '2023-08-08',
    avatar: 'YT',
  },
  {
    id: 5,
    name: 'Rami Lahbib',
    position: 'UI/UX Design Intern',
    education: 'Graphic Design, Fine Arts Institute',
    status: 'Offered',
    appliedDate: '2023-08-01',
    avatar: 'RL',
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = 'bg-gray-100 text-gray-700';
  
  switch (status) {
    case 'Active':
      bgColor = 'bg-green-100 text-green-700';
      break;
    case 'Draft':
      bgColor = 'bg-blue-100 text-blue-700';
      break;
    case 'Closed':
      bgColor = 'bg-gray-100 text-gray-700';
      break;
    case 'New':
      bgColor = 'bg-blue-100 text-blue-700';
      break;
    case 'Reviewed':
      bgColor = 'bg-purple-100 text-purple-700';
      break;
    case 'Interview':
      bgColor = 'bg-yellow-100 text-yellow-700';
      break;
    case 'Offered':
      bgColor = 'bg-green-100 text-green-700';
      break;
    case 'Rejected':
      bgColor = 'bg-red-100 text-red-700';
      break;
  }
  
  return (
    <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${bgColor}`}>
      {status}
    </span>
  );
};

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-sattejli-teal rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                    TC
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">TechCorp Tunisia</h2>
                    <p className="text-sm text-gray-600">Software Development</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm ${
                      activeTab === 'overview' 
                        ? 'bg-sattejli-blue/10 text-sattejli-blue font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <BarChart3 className="mr-3 h-4 w-4" />
                    Dashboard
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm ${
                      activeTab === 'internships' 
                        ? 'bg-sattejli-blue/10 text-sattejli-blue font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('internships')}
                  >
                    <Briefcase className="mr-3 h-4 w-4" />
                    Internships
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm ${
                      activeTab === 'applicants' 
                        ? 'bg-sattejli-blue/10 text-sattejli-blue font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('applicants')}
                  >
                    <Users className="mr-3 h-4 w-4" />
                    Applicants
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm ${
                      activeTab === 'notifications' 
                        ? 'bg-sattejli-blue/10 text-sattejli-blue font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <Bell className="mr-3 h-4 w-4" />
                    Notifications
                    <span className="ml-auto bg-sattejli-blue text-white text-xs rounded-full px-2 py-0.5">
                      5
                    </span>
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm ${
                      activeTab === 'messages' 
                        ? 'bg-sattejli-blue/10 text-sattejli-blue font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('messages')}
                  >
                    <MessageSquare className="mr-3 h-4 w-4" />
                    Messages
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm ${
                      activeTab === 'profile' 
                        ? 'bg-sattejli-blue/10 text-sattejli-blue font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <Building2 className="mr-3 h-4 w-4" />
                    Company Profile
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm ${
                      activeTab === 'settings' 
                        ? 'bg-sattejli-blue/10 text-sattejli-blue font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </button>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <button 
                    className="w-full text-left px-4 py-2 rounded-md flex items-center text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      toast({
                        title: "Logged out",
                        description: "You have been successfully logged out",
                      });
                    }}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Log Out
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-sattejli-teal to-sattejli-emerald rounded-lg shadow-md p-6 text-white">
                <h3 className="font-bold mb-2">Post a New Internship</h3>
                <p className="text-sm text-white/90 mb-4">
                  Create a new internship listing to find talented students for your team.
                </p>
                <Link to="/post-internship">
                  <Button variant="secondary" size="sm" className="w-full bg-white text-sattejli-teal hover:bg-blue-50">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Listing
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-900">Company Dashboard</h2>
                      <span className="text-sm text-gray-500">
                        Last updated: {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Active Internships</p>
                        <p className="text-2xl font-bold text-sattejli-blue">2</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Applicants</p>
                        <p className="text-2xl font-bold text-green-600">35</p>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Interviews</p>
                        <p className="text-2xl font-bold text-yellow-600">5</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Offers Sent</p>
                        <p className="text-2xl font-bold text-purple-600">2</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-900 mb-3">Recent Applicants</h3>
                      <div className="space-y-3">
                        {MOCK_APPLICANTS.slice(0, 3).map((app) => (
                          <Link to={`/applicants/${app.id}`} key={app.id}>
                            <div className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                              <div className="flex items-center">
                                <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                                  <span className="font-bold text-gray-700">{app.avatar}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium text-gray-900">{app.name}</h4>
                                    <StatusBadge status={app.status} />
                                  </div>
                                  <p className="text-sm text-gray-600">{app.position}</p>
                                  <div className="flex justify-between mt-1">
                                    <span className="text-xs text-gray-500">{app.education}</span>
                                    <span className="text-xs text-gray-500">Applied on {formatDate(app.appliedDate)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 text-center">
                        <button 
                          className="text-sattejli-blue text-sm font-medium hover:text-blue-700"
                          onClick={() => setActiveTab('applicants')}
                        >
                          View all applicants
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-900">Your Active Internships</h3>
                      <Link to="/post-internship" className="text-sattejli-blue text-sm font-medium hover:text-blue-700 flex items-center">
                        <Plus className="mr-1 h-4 w-4" />
                        Post New
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      {MOCK_INTERNSHIPS.filter(i => i.status === 'Active').map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{item.department}</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                  <Users className="mr-1 h-3 w-3" />
                                  {item.applications} applicants
                                </span>
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  Deadline: {formatDate(item.deadline)}
                                </span>
                              </div>
                            </div>
                            <StatusBadge status={item.status} />
                          </div>
                          <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-3">
                            <span className="text-xs text-gray-500">Posted on {formatDate(item.postedDate)}</span>
                            <div className="flex space-x-2">
                              <Link to={`/internships/${item.id}`}>
                                <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-500">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link to={`/edit-internship/${item.id}`}>
                                <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-500">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                  toast({
                                    title: "Internship closed",
                                    description: "The internship has been closed",
                                  });
                                }}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'internships' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Manage Internships</h2>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Search internships" 
                          className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sattejli-blue focus:border-transparent"
                        />
                      </div>
                      <Link to="/post-internship">
                        <Button className="bg-sattejli-blue hover:bg-blue-600">
                          <Plus className="mr-2 h-4 w-4" />
                          Post New
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="all">
                    <TabsList className="mb-6">
                      <TabsTrigger value="all">All (4)</TabsTrigger>
                      <TabsTrigger value="active">Active (2)</TabsTrigger>
                      <TabsTrigger value="draft">Draft (1)</TabsTrigger>
                      <TabsTrigger value="closed">Closed (1)</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-4">
                      {MOCK_INTERNSHIPS.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{item.department}</p>
                              <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                  <Users className="mr-1 h-3 w-3" />
                                  {item.applications} applicants
                                </span>
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  Deadline: {formatDate(item.deadline)}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <StatusBadge status={item.status} />
                              <span className="text-xs text-gray-500 mt-2">Posted on {formatDate(item.postedDate)}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end items-center border-t border-gray-100 pt-3">
                            <div className="flex space-x-2">
                              <Link to={`/applicants?internship=${item.id}`}>
                                <Button size="sm" variant="outline" className="h-8">
                                  <Users className="mr-1 h-4 w-4" />
                                  View Applicants
                                </Button>
                              </Link>
                              <Link to={`/internships/${item.id}`}>
                                <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-500">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link to={`/edit-internship/${item.id}`}>
                                <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-500">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                  toast({
                                    title: item.status === 'Closed' ? "Internship deleted" : "Internship closed",
                                    description: item.status === 'Closed' 
                                      ? "The internship has been deleted" 
                                      : "The internship has been closed",
                                  });
                                }}
                              >
                                {item.status === 'Closed' ? <Trash2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="active" className="space-y-4">
                      {MOCK_INTERNSHIPS.filter(i => i.status === 'Active').map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{item.department}</p>
                              <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                  <Users className="mr-1 h-3 w-3" />
                                  {item.applications} applicants
                                </span>
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  Deadline: {formatDate(item.deadline)}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <StatusBadge status={item.status} />
                              <span className="text-xs text-gray-500 mt-2">Posted on {formatDate(item.postedDate)}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end items-center border-t border-gray-100 pt-3">
                            <div className="flex space-x-2">
                              <Link to={`/applicants?internship=${item.id}`}>
                                <Button size="sm" variant="outline" className="h-8">
                                  <Users className="mr-1 h-4 w-4" />
                                  View Applicants
                                </Button>
                              </Link>
                              <Link to={`/internships/${item.id}`}>
                                <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-500">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link to={`/edit-internship/${item.id}`}>
                                <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-500">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                  toast({
                                    title: "Internship closed",
                                    description: "The internship has been closed",
                                  });
                                }}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="draft" className="space-y-4">
                      {MOCK_INTERNSHIPS.filter(i => i.status === 'Draft').map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{item.department}</p>
                              <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                  <Users className="mr-1 h-3 w-3" />
                                  {item.applications} applicants
                                </span>
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  Deadline: {formatDate(item.deadline)}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <StatusBadge status={item.status} />
                              <span className="text-xs text-gray-500 mt-2">Posted on {formatDate(item.postedDate)}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end items-center border-t border-gray-100 pt-3">
                            <div className="flex space-x-2">
                              <Link to={`/edit-internship/${item.id}`}>
                                <Button size="sm" variant="outline" className="h-8">
                                  <Edit className="mr-1 h-4 w-4" />
                                  Edit Draft
                                </Button>
                              </Link>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-gray-500 hover:text-green-500"
                                onClick={() => {
                                  toast({
                                    title: "Internship published",
                                    description: "The internship has been published",
                                  });
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                  toast({
                                    title: "Draft deleted",
                                    description: "The draft has been deleted",
                                  });
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="closed" className="space-y-4">
                      {MOCK_INTERNSHIPS.filter(i => i.status === 'Closed').map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{item.department}</p>
                              <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                  <Users className="mr-1 h-3 w-3" />
                                  {item.applications} applicants
                                </span>
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  Deadline: {formatDate(item.deadline)}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <StatusBadge status={item.status} />
                              <span className="text-xs text-gray-500 mt-2">Posted on {formatDate(item.postedDate)}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end items-center border-t border-gray-100 pt-3">
                            <div className="flex space-x-2">
                              <Link to={`/applicants?internship=${item.id}`}>
                                <Button size="sm" variant="outline" className="h-8">
                                  <Users className="mr-1 h-4 w-4" />
                                  View Applicants
                                </Button>
                              </Link>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-gray-500 hover:text-green-500"
                                onClick={() => {
                                  toast({
                                    title: "Internship reopened",
                                    description: "The internship has been reopened",
                                  });
                                }}
                              >
                                <Clock className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-gray-500"
                                onClick={() => {
                                  toast({
                                    title: "Internship duplicated",
                                    description: "A new draft has been created",
                                  });
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                  toast({
                                    title: "Internship deleted",
                                    description: "The internship has been deleted",
                                  });
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              {activeTab === 'applicants' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">All Applicants</h2>
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search applicants" 
                        className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sattejli-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <Tabs defaultValue="all">
                    <TabsList className="mb-6">
                      <TabsTrigger value="all">All (5)</TabsTrigger>
                      <TabsTrigger value="new">New (1)</TabsTrigger>
                      <TabsTrigger value="reviewed">Reviewed (1)</TabsTrigger>
                      <TabsTrigger value="interview">Interview (1)</TabsTrigger>
                      <TabsTrigger value="offered">Offered (1)</TabsTrigger>
                      <TabsTrigger value="rejected">Rejected (1)</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-4">
                      {MOCK_APPLICANTS.map((app) => (
                        <div key={app.id} className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex items-center">
                            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                              <span className="font-bold text-gray-700">{app.avatar}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-1">{app.name}</h4>
                                  <p className="text-sm text-gray-600">{app.position}</p>
                                </div>
                                <StatusBadge status={app.status} />
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                <span className="text-xs text-gray-500">
                                  {app.education}
                                </span>
                                <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                  Applied on {formatDate(app.appliedDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end items-center border-t border-gray-100 pt-3">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8"
                                onClick={() => {
                                  toast({
                                    title: "Resume downloaded",
                                    description: "The resume has been downloaded",
                                  });
                                }}
                              >
                                <FileText className="mr-1 h-4 w-4" />
                                View Resume
                              </Button>
                              {app.status === 'New' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8"
                                  onClick={() => {
                                    toast({
                                      title: "Status updated",
                                      description: "Applicant marked as reviewed",
                                    });
                                  }}
                                >
                                  <UserCheck className="mr-1 h-4 w-4" />
                                  Mark as Reviewed
                                </Button>
                              )}
                              {app.status === 'Reviewed' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8"
                                  onClick={() => {
                                    toast({
                                      title: "Interview scheduled",
                                      description: "Invitation sent to the applicant",
                                    });
                                  }}
                                >
                                  <Calendar className="mr-1 h-4 w-4" />
                                  Schedule Interview
                                </Button>
                              )}
                              {app.status === 'Interview' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 text-green-600 border-green-600 hover:bg-green-50"
                                  onClick={() => {
                                    toast({
                                      title: "Offer sent",
                                      description: "Offer has been sent to the applicant",
                                    });
                                  }}
                                >
                                  <CheckCircle2 className="mr-1 h-4 w-4" />
                                  Send Offer
                                </Button>
                              )}
                              {(app.status === 'New' || app.status === 'Reviewed' || app.status === 'Interview') && (
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-8 px-2 text-gray-500 hover:text-red-500"
                                  onClick={() => {
                                    toast({
                                      title: "Applicant rejected",
                                      description: "The applicant has been rejected",
                                    });
                                  }}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="new" className="space-y-4">
                      {MOCK_APPLICANTS.filter(app => app.status === 'New').map((app) => (
                        <div key={app.id} className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex items-center">
                            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                              <span className="font-bold text-gray-700">{app.avatar}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-1">{app.name}</h4>
                                  <p className="text-sm text-gray-600">{app.position}</p>
                                </div>
                                <StatusBadge status={app.status} />
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                <span className="text-xs text-gray-500">
                                  {app.education}
                                </span>
                                <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                  Applied on {formatDate(app.appliedDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end items-center border-t border-gray-100 pt-3">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8"
                                onClick={() => {
                                  toast({
                                    title: "Resume downloaded",
                                    description: "The resume has been downloaded",
                                  });
                                }}
                              >
                                <FileText className="mr-1 h-4 w-4" />
                                View Resume
                              </Button>
                              {app.status === 'New' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8"
                                  onClick={() => {
                                    toast({
                                      title: "Status updated",
                                      description: "Applicant marked as reviewed",
                                    });
                                  }}
                                >
                                  <UserCheck className="mr-1 h-4 w-4" />
                                  Mark as Reviewed
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                  toast({
                                    title: "Applicant rejected",
                                    description: "The applicant has been rejected",
                                  });
                                }}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="reviewed" className="space-y-4">
                      {MOCK_APPLICANTS.filter(app => app.status === 'Reviewed').map((app) => (
                        <div key={app.id} className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex items-center">
                            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                              <span className="font-bold text-gray-700">{app.avatar}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-1">{app.name}</h4>
                                  <p className="text-sm text-gray-600">{app.position}</p>
                                </div>
                                <StatusBadge status={app.status} />
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                <span className="text-xs text-gray-500">
                                  {app.education}
                                </span>
                                <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                  Applied on {formatDate(app.appliedDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end items-center border-t border-gray-100 pt-3">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8"
                                onClick={() => {
                                  toast({
                                    title: "Resume downloaded",
                                    description: "The resume has been downloaded",
                                  });
                                }}
                              >
                                <FileText className="mr-1 h-4 w-4" />
                                View Resume
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8"
                                onClick={() => {
                                  toast({
                                    title: "Interview scheduled",
                                    description: "Invitation sent to the applicant",
                                  });
                                }}
                              >
                                <Calendar className="mr-1 h-4 w-4" />
                                Schedule Interview
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                  toast({
                                    title: "Applicant rejected",
                                    description: "The applicant has been rejected",
                                  });
                                }}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="interview" className="space-y-4">
                      {MOCK_APPLICANTS.filter(app => app.status === 'Interview').map((app) => (
                        <div key={app.id} className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex items-center">
                            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                              <span className="font-bold text-gray-700">{app.avatar}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-1">{app.name}</h4>
                                  <p className="text-sm text-gray-600">{app.position}</p>
                                </div>
                                <StatusBadge status={app.status} />
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                <span className="text-xs text-gray-500">
                                  {app.education}
                                </span>
                                <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                  Applied on {formatDate(app.appliedDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end items-center border-t border-gray-100 pt-3">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8"
                                onClick={() => {
                                  toast({
                                    title: "Resume downloaded",
                                    description: "The resume has been downloaded",
                                  });
                                }}
                              >
                                <FileText className="mr-1 h-4 w-4" />
                                View Resume
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 text-green-600 border-green-600 hover:bg-green-50"
                                onClick={() => {
                                  toast({
                                    title: "Offer sent",
                                    description: "Offer has been sent to the applicant",
                                  });
                                }}
                              >
                                <CheckCircle2 className="mr-1 h-4 w-4" />
                                Send Offer
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                  toast({
                                    title: "Applicant rejected",
                                    description: "The applicant has been rejected",
                                  });
                                }}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="offered" className="space-y-4">
                      {MOCK_APPLICANTS.filter(app => app.status === 'Offered').map((app) => (
                        <div key={app.id} className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex items-center">
                            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                              <span className="font-bold text-gray-700">{app.avatar}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-1">{app.name}</h4>
                                  <p className="text-sm text-gray-600">{app.position}</p>
                                </div>
                                <StatusBadge status={app.status} />
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                <span className="text-xs text-gray-500">
                                  {app.education}
                                </span>
                                <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                  Applied on {formatDate(app.appliedDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end items-center border-t border-gray-100 pt-3">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8"
                                onClick={() => {
                                  toast({
                                    title: "Resume downloaded",
                                    description: "The resume has been downloaded",
                                  });
                                }}
                              >
                                <FileText className="mr-1 h-4 w-4" />
                                View Resume
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8"
                                onClick={() => {
                                  toast({
                                    title: "Message sent",
                                    description: "Message has been sent to the applicant",
                                  });
                                }}
                              >
                                <MessageSquare className="mr-1 h-4 w-4" />
                                Send Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="rejected" className="space-y-4">
                      {MOCK_APPLICANTS.filter(app => app.status === 'Rejected').map((app) => (
                        <div key={app.id} className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex items-center">
                            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                              <span className="font-bold text-gray-700">{app.avatar}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-1">{app.name}</h4>
                                  <p className="text-sm text-gray-600">{app.position}</p>
                                </div>
                                <StatusBadge status={app.status} />
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                <span className="text-xs text-gray-500">
                                  {app.education}
                                </span>
                                <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                  Applied on {formatDate(app.appliedDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end items-center border-t border-gray-100 pt-3">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8"
                                onClick={() => {
                                  toast({
                                    title: "Resume downloaded",
                                    description: "The resume has been downloaded",
                                  });
                                }}
                              >
                                <FileText className="mr-1 h-4 w-4" />
                                View Resume
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              {/* Other tabs would be implemented similarly */}
              {(activeTab === 'notifications' || activeTab === 'messages' || activeTab === 'profile' || activeTab === 'settings') && (
                <div className="bg-white rounded-lg shadow-md p-6 text-center py-12">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {activeTab === 'notifications' ? 'Notifications' : 
                     activeTab === 'messages' ? 'Messages' :
                     activeTab === 'profile' ? 'Company Profile' : 'Settings'}
                  </h2>
                  <p className="text-gray-600 mb-6">This feature will be coming soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CompanyDashboard;
