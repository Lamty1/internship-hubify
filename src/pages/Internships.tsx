
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock,
  Filter, 
  SlidersHorizontal,
  X, 
  ChevronDown
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for internships
const MOCK_INTERNSHIPS = [
  {
    id: 1,
    title: 'Frontend Development Intern',
    company: 'TechCorp Tunisia',
    location: 'Tunis, Tunisia',
    type: 'Full-time',
    duration: '3 months',
    tags: ['React', 'JavaScript', 'HTML/CSS'],
    logo: 'TC',
    postedDate: '2 days ago',
  },
  {
    id: 2,
    title: 'UI/UX Design Intern',
    company: 'Creative Solutions',
    location: 'Sousse, Tunisia',
    type: 'Part-time',
    duration: '6 months',
    tags: ['Figma', 'UI Design', 'User Research'],
    logo: 'CS',
    postedDate: '1 week ago',
  },
  {
    id: 3,
    title: 'Data Science Intern',
    company: 'DataTech',
    location: 'Remote',
    type: 'Full-time',
    duration: '4 months',
    tags: ['Python', 'Machine Learning', 'SQL'],
    logo: 'DT',
    postedDate: '3 days ago',
  },
  {
    id: 4,
    title: 'Backend Developer Intern',
    company: 'InnovateTN',
    location: 'Sfax, Tunisia',
    type: 'Full-time',
    duration: '6 months',
    tags: ['Node.js', 'Express', 'MongoDB'],
    logo: 'IT',
    postedDate: 'Today',
  },
  {
    id: 5,
    title: 'Marketing Intern',
    company: 'Global Marketing Agency',
    location: 'Tunis, Tunisia',
    type: 'Part-time',
    duration: '3 months',
    tags: ['Social Media', 'Content Creation', 'SEO'],
    logo: 'GM',
    postedDate: '1 week ago',
  },
  {
    id: 6,
    title: 'Mobile App Development Intern',
    company: 'AppWorks',
    location: 'Remote',
    type: 'Full-time',
    duration: '5 months',
    tags: ['React Native', 'Flutter', 'iOS/Android'],
    logo: 'AW',
    postedDate: '5 days ago',
  },
];

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    duration: '',
    fields: [] as string[],
  });

  const handleFieldToggle = (field: string) => {
    setFilters(prev => {
      const fields = prev.fields.includes(field)
        ? prev.fields.filter(f => f !== field)
        : [...prev.fields, field];
      return { ...prev, fields };
    });
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      duration: '',
      fields: [],
    });
  };

  // Filter internships based on search, location, and other filters
  const filteredInternships = MOCK_INTERNSHIPS.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !location || internship.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesType = !filters.type || internship.type === filters.type;
    
    const matchesDuration = !filters.duration || internship.duration.includes(filters.duration);
    
    const matchesField = filters.fields.length === 0 || 
      filters.fields.some(field => internship.tags.includes(field));
    
    return matchesSearch && matchesLocation && matchesType && matchesDuration && matchesField;
  });

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-sattejli-blue to-sattejli-indigo py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-6">Find Your Perfect Internship</h1>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="input-field pl-10 w-full"
                    placeholder="Job title, company, or keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="relative md:w-1/3">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="input-field pl-10 w-full"
                    placeholder="City or 'Remote'"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="bg-sattejli-blue hover:bg-blue-600 md:w-auto"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </Button>
              </div>
              
              {showFilters && (
                <div className="mt-4 p-4 border-t border-gray-200 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium flex items-center">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Advanced Filters
                    </h3>
                    <Button 
                      variant="ghost" 
                      className="h-8 text-gray-500 hover:text-gray-700"
                      onClick={resetFilters}
                    >
                      Reset
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Internship Type
                      </label>
                      <select
                        className="input-field w-full"
                        value={filters.type}
                        onChange={(e) => setFilters({...filters, type: e.target.value})}
                      >
                        <option value="">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <select
                        className="input-field w-full"
                        value={filters.duration}
                        onChange={(e) => setFilters({...filters, duration: e.target.value})}
                      >
                        <option value="">Any Duration</option>
                        <option value="1 month">1 month</option>
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                        <option value="1 year">1 year</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Design', 'Development', 'Marketing', 'Data'].map(field => (
                          <Button
                            key={field}
                            variant={filters.fields.includes(field) ? "default" : "outline"}
                            size="sm"
                            className={filters.fields.includes(field) 
                              ? "bg-sattejli-blue text-white" 
                              : "border-gray-300 text-gray-700"}
                            onClick={() => handleFieldToggle(field)}
                          >
                            {field}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {filteredInternships.length} Internships Found
            </h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Sort by:</span>
              <button className="text-sm text-gray-800 font-medium flex items-center">
                Most Recent
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <Link to={`/internships/${internship.id}`} key={internship.id}>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow card-hover">
                    <div className="flex">
                      <div className="bg-gray-100 w-12 h-12 rounded flex items-center justify-center mr-4">
                        <span className="font-bold text-gray-700">{internship.logo}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{internship.title}</h3>
                            <p className="text-gray-600 mb-2">{internship.company}</p>
                          </div>
                          <div className="flex items-center mb-2 md:mb-0">
                            <span className="text-sm font-medium px-3 py-1 bg-blue-50 text-sattejli-blue rounded-full">
                              {internship.type}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 my-3">
                          {internship.tags.map((tag, index) => (
                            <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-3 text-sm">
                          <div className="flex space-x-4">
                            <span className="flex items-center text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {internship.location}
                            </span>
                            <span className="flex items-center text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {internship.duration}
                            </span>
                          </div>
                          <span className="text-gray-400 mt-2 sm:mt-0">Posted {internship.postedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <X className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <Button 
                  variant="outline" 
                  className="border-sattejli-blue text-sattejli-blue"
                  onClick={() => {
                    setSearchTerm('');
                    setLocation('');
                    resetFilters();
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Internships;
