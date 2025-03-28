
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Clock, 
  ChevronDown,
  Bookmark,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

// Mock data for internships
const MOCK_INTERNSHIPS = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechCorp Tunisia',
    logo: 'TC',
    location: 'Tunis, Tunisia',
    type: 'Full-time',
    duration: '3 months',
    postedDate: '2023-08-15',
    saved: false
  },
  {
    id: 2,
    title: 'UI/UX Design Intern',
    company: 'Creative Solutions',
    logo: 'CS',
    location: 'Remote',
    type: 'Part-time',
    duration: '6 months',
    postedDate: '2023-08-12',
    saved: false
  },
  {
    id: 3,
    title: 'Marketing Intern',
    company: 'Global Marketing Agency',
    logo: 'GM',
    location: 'Sousse, Tunisia',
    type: 'Full-time',
    duration: '4 months',
    postedDate: '2023-08-10',
    saved: false
  },
  {
    id: 4,
    title: 'Backend Developer Intern',
    company: 'InnovateTN',
    logo: 'IT',
    location: 'Sfax, Tunisia',
    type: 'Full-time',
    duration: '3 months',
    postedDate: '2023-08-08',
    saved: false
  },
  {
    id: 5,
    title: 'Data Science Intern',
    company: 'DataTech',
    logo: 'DT',
    location: 'Tunis, Tunisia',
    type: 'Full-time',
    duration: '6 months',
    postedDate: '2023-08-05',
    saved: false
  },
  {
    id: 6,
    title: 'Mobile App Development Intern',
    company: 'AppWorks',
    logo: 'AW',
    location: 'Remote',
    type: 'Full-time',
    duration: '3 months',
    postedDate: '2023-08-02',
    saved: false
  },
];

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('newest');
  const [internships, setInternships] = useState(MOCK_INTERNSHIPS);
  const { toast } = useToast();
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const handleSaveInternship = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    setInternships(prevInternships => 
      prevInternships.map(internship => 
        internship.id === id 
          ? { ...internship, saved: !internship.saved } 
          : internship
      )
    );
    
    const internship = internships.find(i => i.id === id);
    if (internship) {
      toast({
        title: internship.saved ? "Removed from saved" : "Added to saved",
        description: internship.saved 
          ? "Internship has been removed from your saved list" 
          : "Internship has been added to your saved list",
      });
    }
  };
  
  const handleSort = (option: string) => {
    setSortOption(option);
    
    let sorted = [...internships];
    
    switch (option) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
        break;
      case 'company-az':
        sorted.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'company-za':
        sorted.sort((a, b) => b.company.localeCompare(a.company));
        break;
      default:
        break;
    }
    
    setInternships(sorted);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Internships</h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  <button 
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <Filter className="h-5 w-5" />
                  </button>
                </div>
                
                <div className={`${filterOpen ? 'block' : 'hidden lg:block'}`}>
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-700 mb-2">Location</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">Tunis</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">Sousse</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">Sfax</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">Remote</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-700 mb-2">Duration</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">1-3 months</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">3-6 months</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">6+ months</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-700 mb-2">Type</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">Full-time</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">Part-time</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Category</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">Technology</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">Marketing</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">Design</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">Finance</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue" />
                        <span className="ml-2 text-gray-600">Business</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full bg-sattejli-blue hover:bg-blue-600">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="relative sm:w-2/3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by keyword, title, or company"
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sattejli-blue focus:border-transparent"
                    />
                  </div>
                  <div className="relative sm:w-1/3">
                    <label className="text-sm font-medium text-gray-700 block mb-1">Sort by</label>
                    <div className="relative">
                      <select 
                        className="w-full border border-gray-300 rounded-md pl-3 pr-10 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-sattejli-blue focus:border-transparent"
                        value={sortOption}
                        onChange={(e) => handleSort(e.target.value)}
                      >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="company-az">Company (A-Z)</option>
                        <option value="company-za">Company (Z-A)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {internships.map((internship) => (
                  <div key={internship.id} className="bg-white rounded-lg shadow-md p-6 hover:border-sattejli-blue hover:border transition-all">
                    <Link to={`/internships/${internship.id}`}>
                      <div className="flex items-start">
                        <div className="bg-gray-100 rounded w-12 h-12 flex items-center justify-center mr-4">
                          <span className="font-bold text-gray-700">{internship.logo}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 mb-1">{internship.title}</h3>
                              <p className="text-gray-600 mb-2">{internship.company}</p>
                            </div>
                            <button 
                              onClick={(e) => handleSaveInternship(e, internship.id)} 
                              className="p-2 focus:outline-none"
                            >
                              <Bookmark 
                                className="h-5 w-5 text-gray-400 hover:text-sattejli-blue" 
                                fill={internship.saved ? "#4F46E5" : "none"}
                                stroke={internship.saved ? "#4F46E5" : "currentColor"}
                              />
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-y-2">
                            <div className="flex items-center text-gray-500 text-sm mr-4">
                              <MapPin className="h-4 w-4 mr-1" />
                              {internship.location}
                            </div>
                            <div className="flex items-center text-gray-500 text-sm mr-4">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {internship.type}
                            </div>
                            <div className="flex items-center text-gray-500 text-sm mr-4">
                              <Clock className="h-4 w-4 mr-1" />
                              {internship.duration}
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              Posted: {formatDate(internship.postedDate)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center">
                  <button className="px-3 py-1 border border-gray-300 rounded-l-md text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 border-t border-b border-gray-300 bg-sattejli-blue text-white">
                    1
                  </button>
                  <button className="px-3 py-1 border-t border-b border-gray-300 text-gray-500 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border-t border-b border-gray-300 text-gray-500 hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-r-md text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Internships;
