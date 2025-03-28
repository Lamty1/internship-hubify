import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  FileText, 
  Bell, 
  MessageSquare, 
  Settings, 
  LogOut,
  Search,
  BookMarked,
  Clock,
  CheckCircle,
  XCircle,
  User,
  ArrowUpRight,
  Calendar,
  MapPin,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const MOCK_APPLICATIONS = [
  {
    id: 1,
    company: 'TechCorp Tunisia',
    position: 'Frontend Development Intern',
    logo: 'TC',
    status: 'Applied',
    date: '2023-08-10',
    location: 'Tunis, Tunisia',
  },
  {
    id: 2,
    company: 'Creative Solutions',
    position: 'UI/UX Design Intern',
    logo: 'CS',
    status: 'Interview',
    date: '2023-08-05',
    location: 'Sousse, Tunisia',
  },
  {
    id: 3,
    company: 'DataTech',
    position: 'Data Science Intern',
    logo: 'DT',
    status: 'Rejected',
    date: '2023-07-28',
    location: 'Remote',
  },
  {
    id: 4,
    company: 'Global Marketing Agency',
    position: 'Marketing Intern',
    logo: 'GM',
    status: 'Offered',
    date: '2023-07-20',
    location: 'Tunis, Tunisia',
  },
];

const MOCK_SAVED = [
  {
    id: 5,
    company: 'InnovateTN',
    position: 'Backend Developer Intern',
    logo: 'IT',
    date: '2023-08-12',
    location: 'Sfax, Tunisia',
  },
  {
    id: 6,
    company: 'AppWorks',
    position: 'Mobile App Development Intern',
    logo: 'AW',
    date: '2023-08-09',
    location: 'Remote',
  },
];

const MOCK_RECOMMENDED = [
  {
    id: 7,
    company: 'WebSolutions',
    position: 'Full Stack Developer Intern',
    logo: 'WS',
    date: '2023-08-15',
    location: 'Tunis, Tunisia',
    match: '95%',
  },
  {
    id: 8,
    company: 'DigitalAgency',
    position: 'Frontend React Developer',
    logo: 'DA',
    date: '2023-08-14',
    location: 'Remote',
    match: '90%',
  },
  {
    id: 9,
    company: 'TechInnovate',
    position: 'JavaScript Developer Intern',
    logo: 'TI',
    date: '2023-08-13',
    location: 'Monastir, Tunisia',
    match: '85%',
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = 'bg-gray-100 text-gray-700';
  let icon = <Clock className="mr-1 h-3 w-3" />;
  
  switch (status) {
    case 'Applied':
      bgColor = 'bg-blue-100 text-blue-700';
      icon = <Clock className="mr-1 h-3 w-3" />;
      break;
    case 'Interview':
      bgColor = 'bg-purple-100 text-purple-700';
      icon = <Calendar className="mr-1 h-3 w-3" />;
      break;
    case 'Offered':
      bgColor = 'bg-green-100 text-green-700';
      icon = <CheckCircle className="mr-1 h-3 w-3" />;
      break;
    case 'Rejected':
      bgColor = 'bg-red-100 text-red-700';
      icon = <XCircle className="mr-1 h-3 w-3" />;
      break;
  }
  
  return (
    <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${bgColor}`}>
      {icon}
      {status}
    </span>
  );
};

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileCompletion, setProfileCompletion] = useState(65);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedProfile = localStorage.getItem('studentProfile');
    if (storedProfile) {
      try {
        const profileData = JSON.parse(storedProfile);
        const requiredFields = [
          'firstName', 'lastName', 'email', 'phone', 
          'university', 'degree', 'fieldOfStudy', 'graduationDate', 
          'skills', 'resumeFile'
        ];
        
        const filledFields = requiredFields.filter(field => {
          if (field === 'skills') {
            return profileData[field] && profileData[field].length > 0 && profileData[field][0] !== '';
          }
          return profileData[field] && profileData[field] !== '';
        });
        
        const percentage = Math.round((filledFields.length / requiredFields.length) * 100);
        setProfileCompletion(percentage);
      } catch (error) {
        console.error("Error parsing profile data", error);
      }
    }
  }, []);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleMatchInternships = () => {
    toast({
      title: "Analyzing your CV",
      description: "Our AI is matching your skills with available internships.",
    });
    
    setTimeout(() => {
      setActiveTab('matched');
      toast({
        title: "Matching complete!",
        description: "We've found internships that match your profile.",
      });
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-64">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-sattejli-blue rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                    A
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Ahmed Ben Ali</h2>
                    <p className="text-sm text-gray-600">Computer Science Student</p>
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
                    <Briefcase className="mr-3 h-4 w-4" />
                    Overview
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm ${
                      activeTab === 'applications' 
                        ? 'bg-sattejli-blue/10 text-sattejli-blue font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('applications')}
                  >
                    <FileText className="mr-3 h-4 w-4" />
                    Applications
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm ${
                      activeTab === 'saved' 
                        ? 'bg-sattejli-blue/10 text-sattejli-blue font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('saved')}
                  >
                    <BookMarked className="mr-3 h-4 w-4" />
                    Saved
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center text-sm ${
                      activeTab === 'matched' 
                        ? 'bg-sattejli-blue/10 text-sattejli-blue font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('matched')}
                  >
                    <Brain className="mr-3 h-4 w-4" />
                    AI Matches
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
                      3
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
                    onClick={() => navigate('/student-profile')}
                  >
                    <User className="mr-3 h-4 w-4" />
                    Profile
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
              
              <div className="bg-gradient-to-br from-sattejli-blue to-sattejli-indigo rounded-lg shadow-md p-6 text-white">
                <h3 className="font-bold mb-2">Complete Your Profile</h3>
                <p className="text-sm text-white/90 mb-4">
                  A complete profile increases your chances of getting noticed by companies.
                </p>
                <div className="w-full bg-white/30 h-2 rounded-full mb-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: `${profileCompletion}%` }}></div>
                </div>
                <p className="text-xs text-white/80 mb-4">{profileCompletion}% Complete</p>
                <Link to="/student-profile">
                  <Button variant="secondary" size="sm" className="w-full bg-white text-sattejli-blue hover:bg-blue-50">
                    Complete Profile
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-900">Dashboard Overview</h2>
                      <span className="text-sm text-gray-500">
                        Last updated: {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Applications</p>
                        <p className="text-2xl font-bold text-sattejli-blue">4</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Interviews</p>
                        <p className="text-2xl font-bold text-green-600">1</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Offers</p>
                        <p className="text-2xl font-bold text-purple-600">1</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Saved</p>
                        <p className="text-2xl font-bold text-orange-600">2</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-900 mb-3">Recent Applications</h3>
                      <div className="space-y-3">
                        {MOCK_APPLICATIONS.slice(0, 2).map((app) => (
                          <Link to={`/internships/${app.id}`} key={app.id}>
                            <div className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                              <div className="flex items-center">
                                <div className="bg-gray-100 w-10 h-10 rounded flex items-center justify-center mr-3">
                                  <span className="font-bold text-gray-700">{app.logo}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium text-gray-900">{app.position}</h4>
                                    <StatusBadge status={app.status} />
                                  </div>
                                  <p className="text-sm text-gray-600">{app.company}</p>
                                  <div className="flex justify-between mt-1">
                                    <span className="text-xs text-gray-500 flex items-center">
                                      <MapPin className="mr-1 h-3 w-3" />
                                      {app.location}
                                    </span>
                                    <span className="text-xs text-gray-500">Applied on {formatDate(app.date)}</span>
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
                          onClick={() => setActiveTab('applications')}
                        >
                          View all applications
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-900">Recommended for You</h3>
                      <Link to="/internships" className="text-sattejli-blue text-sm font-medium hover:text-blue-700 flex items-center">
                        View all
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      {MOCK_RECOMMENDED.map((item) => (
                        <Link to={`/internships/${item.id}`} key={item.id}>
                          <div className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                            <div className="flex items-center">
                              <div className="bg-gray-100 w-10 h-10 rounded flex items-center justify-center mr-3">
                                <span className="font-bold text-gray-700">{item.logo}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h4 className="font-medium text-gray-900">{item.position}</h4>
                                  <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                    {item.match} Match
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{item.company}</p>
                                <div className="flex justify-between mt-1">
                                  <span className="text-xs text-gray-500">{item.location}</span>
                                  <span className="text-xs text-gray-500">Posted on {formatDate(item.date)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'applications' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">My Applications</h2>
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search applications" 
                        className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sattejli-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All (4)</TabsTrigger>
                      <TabsTrigger value="applied">Applied (1)</TabsTrigger>
                      <TabsTrigger value="interview">Interview (1)</TabsTrigger>
                      <TabsTrigger value="offered">Offered (1)</TabsTrigger>
                      <TabsTrigger value="rejected">Rejected (1)</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-4">
                      {MOCK_APPLICATIONS.map((app) => (
                        <Link to={`/internships/${app.id}`} key={app.id}>
                          <div className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                            <div className="flex items-center">
                              <div className="bg-gray-100 w-12 h-12 rounded flex items-center justify-center mr-4">
                                <span className="font-bold text-gray-700">{app.logo}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-1">{app.position}</h4>
                                    <p className="text-sm text-gray-600">{app.company}</p>
                                  </div>
                                  <StatusBadge status={app.status} />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {app.location}
                                  </span>
                                  <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                    Applied on {formatDate(app.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="applied" className="space-y-4">
                      {MOCK_APPLICATIONS.filter(app => app.status === 'Applied').map((app) => (
                        <Link to={`/internships/${app.id}`} key={app.id}>
                          <div className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                            <div className="flex items-center">
                              <div className="bg-gray-100 w-12 h-12 rounded flex items-center justify-center mr-4">
                                <span className="font-bold text-gray-700">{app.logo}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-1">{app.position}</h4>
                                    <p className="text-sm text-gray-600">{app.company}</p>
                                  </div>
                                  <StatusBadge status={app.status} />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {app.location}
                                  </span>
                                  <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                    Applied on {formatDate(app.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="interview" className="space-y-4">
                      {MOCK_APPLICATIONS.filter(app => app.status === 'Interview').map((app) => (
                        <Link to={`/internships/${app.id}`} key={app.id}>
                          <div className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                            <div className="flex items-center">
                              <div className="bg-gray-100 w-12 h-12 rounded flex items-center justify-center mr-4">
                                <span className="font-bold text-gray-700">{app.logo}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-1">{app.position}</h4>
                                    <p className="text-sm text-gray-600">{app.company}</p>
                                  </div>
                                  <StatusBadge status={app.status} />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {app.location}
                                  </span>
                                  <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                    Applied on {formatDate(app.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="offered" className="space-y-4">
                      {MOCK_APPLICATIONS.filter(app => app.status === 'Offered').map((app) => (
                        <Link to={`/internships/${app.id}`} key={app.id}>
                          <div className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                            <div className="flex items-center">
                              <div className="bg-gray-100 w-12 h-12 rounded flex items-center justify-center mr-4">
                                <span className="font-bold text-gray-700">{app.logo}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-1">{app.position}</h4>
                                    <p className="text-sm text-gray-600">{app.company}</p>
                                  </div>
                                  <StatusBadge status={app.status} />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {app.location}
                                  </span>
                                  <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                    Applied on {formatDate(app.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="rejected" className="space-y-4">
                      {MOCK_APPLICATIONS.filter(app => app.status === 'Rejected').map((app) => (
                        <Link to={`/internships/${app.id}`} key={app.id}>
                          <div className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                            <div className="flex items-center">
                              <div className="bg-gray-100 w-12 h-12 rounded flex items-center justify-center mr-4">
                                <span className="font-bold text-gray-700">{app.logo}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-1">{app.position}</h4>
                                    <p className="text-sm text-gray-600">{app.company}</p>
                                  </div>
                                  <StatusBadge status={app.status} />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {app.location}
                                  </span>
                                  <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                    Applied on {formatDate(app.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              {activeTab === 'saved' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Saved Internships</h2>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Search saved" 
                          className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sattejli-blue focus:border-transparent"
                        />
                      </div>
                      <Button 
                        onClick={handleMatchInternships}
                        className="flex items-center bg-sattejli-blue hover:bg-blue-600"
                      >
                        <Brain className="h-4 w-4 mr-2" /> Match with your CV
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {MOCK_SAVED.length > 0 ? (
                      MOCK_SAVED.map((item) => (
                        <Link to={`/internships/${item.id}`} key={item.id}>
                          <div className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                            <div className="flex items-center">
                              <div className="bg-gray-100 w-12 h-12 rounded flex items-center justify-center mr-4">
                                <span className="font-bold text-gray-700">{item.logo}</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 mb-1">{item.position}</h4>
                                <p className="text-sm text-gray-600">{item.company}</p>
                                <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {item.location}
                                  </span>
                                  <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                    Saved on {formatDate(item.date)}
                                  </span>
                                </div>
                              </div>
                              <button 
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toast({
                                    title: "Removed from saved",
                                    description: "Internship removed from your saved list",
                                  });
                                }}
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <BookMarked className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No saved internships</h3>
                        <p className="text-gray-600 mb-6">You haven't saved any internships yet</p>
                        <Link to="/internships">
                          <Button className="bg-sattejli-blue hover:bg-blue-600">
                            Browse Internships
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'matched' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">AI-Matched Internships</h2>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setActiveTab('saved')}
                        variant="outline"
                        className="flex items-center"
                      >
                        <BookMarked className="h-4 w-4 mr-2" /> Back to Saved
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Our AI has analyzed your CV and found the following matches based on your skills and experience.
                      The match score indicates how well your profile aligns with each internship.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {MOCK_SAVED.map((item, index) => (
                      <Link to={`/internships/${item.id}`} key={item.id}>
                        <div className="border border-gray-200 rounded-md p-4 hover:border-sattejli-blue/30 hover:shadow-sm transition-all card-hover">
                          <div className="flex items-center">
                            <div className="bg-gray-100 w-12 h-12 rounded flex items-center justify-center mr-4">
                              <span className="font-bold text-gray-700">{item.logo}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-gray-900 mb-1">{item.position}</h4>
                                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                  {index === 0 ? '95%' : '78%'} Match
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{item.company}</p>
                              <div className="mt-2">
                                <p className="text-xs text-gray-700 mb-1">Matching skills:</p>
                                <div className="flex flex-wrap gap-1">
                                  {index === 0 ? (
                                    <>
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">JavaScript</span>
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">React</span>
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">UI/UX</span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">HTML/CSS</span>
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">JavaScript</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                                <span className="text-xs text-gray-500 flex items-center">
                                  <MapPin className="mr-1 h-3 w-3" />
                                  {item.location}
                                </span>
                                <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                  Saved on {formatDate(item.date)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {(activeTab === 'notifications' || activeTab === 'messages' || activeTab === 'profile' || activeTab === 'settings') && (
                <div className="bg-white rounded-lg shadow-md p-6 text-center py-12">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {activeTab === 'notifications' ? 'Notifications' : 
                     activeTab === 'messages' ? 'Messages' :
                     activeTab === 'profile' ? 'Profile' : 'Settings'}
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

export default StudentDashboard;
