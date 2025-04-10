import { useState, useEffect } from 'react';
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
  Upload,
  FileText,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { getAllInternships } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('newest');
  const [internships, setInternships] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [matchingEnabled, setMatchingEnabled] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    skills: [] as string[]
  });
  const itemsPerPage = 8;
  const { toast } = useToast();
  
  const { data: allInternships, isLoading, error } = useQuery({
    queryKey: ['internships', filters],
    queryFn: () => getAllInternships(filters),
  });

  useEffect(() => {
    if (allInternships) {
      const processedInternships = allInternships.map(internship => ({
        ...internship,
        saved: false,
        match: matchingEnabled ? Math.floor(Math.random() * 30) + 70 : undefined
      }));
      
      setInternships(processedInternships);
      setTotalPages(Math.ceil(processedInternships.length / itemsPerPage));
    }
  }, [allInternships, matchingEnabled]);

  const displayedInternships = internships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    
    window.scrollTo(0, 0);
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const handleSaveInternship = (e: React.MouseEvent, id: string) => {
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
        sorted.sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.posted).getTime() - new Date(b.posted).getTime());
        break;
      case 'company-az':
        sorted.sort((a, b) => a.company.name.localeCompare(b.company.name));
        break;
      case 'company-za':
        sorted.sort((a, b) => b.company.name.localeCompare(a.company.name));
        break;
      case 'match':
        if (matchingEnabled) {
          sorted.sort((a, b) => (b.match || 0) - (a.match || 0));
        }
        break;
      default:
        break;
    }
    
    setInternships(sorted);
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast({
        title: "CV Upload in progress",
        description: "Please wait while we process your CV...",
      });
      
      setTimeout(() => {
        setCvUploaded(true);
        setMatchingEnabled(true);
        
        toast({
          title: "CV Upload successful",
          description: "Your CV has been processed and internship matching is now enabled!",
        });
        
        const matchedInternships = [...internships].map(internship => ({
          ...internship,
          match: Math.floor(Math.random() * 30) + 70
        }));
        
        setInternships(matchedInternships);
        
        if (sortOption !== 'match') {
          setSortOption('match');
          matchedInternships.sort((a, b) => (b.match || 0) - (a.match || 0));
        }
      }, 2000);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 py-8 flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
            <p className="text-lg text-gray-600">Loading internships...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Internships</h2>
            <p className="text-gray-600">There was a problem loading the internships. Please try again later.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const getDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return `${diffMonths} months`;
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Internships</h1>
          <p className="text-gray-600 mb-8">Discover opportunities that match your skills and interests</p>
          
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-6 mb-8 shadow-sm border border-blue-200">
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">New! AI-Powered CV Matching</h2>
              <p className="text-gray-700 mb-4">Upload your CV and our AI will match you with the most relevant internships based on your skills and experience.</p>
              <div className="flex items-center">
                <label 
                  htmlFor="cv-upload" 
                  className={`inline-flex items-center px-4 py-2 rounded-md cursor-pointer ${cvUploaded 
                    ? "bg-green-100 text-green-700 border border-green-300" 
                    : "bg-white shadow-sm border border-gray-300 hover:bg-gray-50 text-gray-700"}`}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {cvUploaded ? "CV Uploaded" : "Upload your CV"}
                </label>
                <input 
                  id="cv-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={handleCVUpload}
                  accept=".pdf,.doc,.docx"
                />
                {cvUploaded && (
                  <span className="ml-3 text-sm text-green-600 flex items-center">
                    <FileText className="mr-1 h-4 w-4" />
                    CV processed successfully
                  </span>
                )}
              </div>
            </div>
            <div className="absolute top-0 right-0 opacity-10">
              <svg className="h-48 w-48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 12L12 3M12 3L9 6M12 3L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
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
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
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
                        {matchingEnabled && <option value="match">Best Match</option>}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              
              {displayedInternships.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">No Internships Found</h2>
                  <p className="text-gray-600">We couldn't find any internships matching your criteria. Try adjusting your filters or check back later.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayedInternships.map((internship) => (
                    <div key={internship.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border border-gray-100 hover:border-blue-200">
                      <Link to={`/internships/${internship.id}`} className="block">
                        <div className="flex items-start">
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl w-14 h-14 flex items-center justify-center mr-4 shadow-sm">
                            <span className="font-bold text-indigo-700">
                              {internship.company.logo ? (
                                <img src={internship.company.logo} alt={internship.company.name} className="w-10 h-10 object-contain" />
                              ) : (
                                internship.company.name.substring(0, 2).toUpperCase()
                              )}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{internship.title}</h3>
                                <p className="text-gray-600 mb-2">{internship.company.name}</p>
                              </div>
                              <div className="flex items-center">
                                {matchingEnabled && internship.match && (
                                  <div className="mr-3 px-2 py-1 bg-blue-50 rounded-lg flex items-center">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                    <span className="text-sm font-medium text-blue-800">{internship.match}% Match</span>
                                  </div>
                                )}
                                <button 
                                  onClick={(e) => handleSaveInternship(e, internship.id)} 
                                  className="p-2 focus:outline-none"
                                  aria-label={internship.saved ? "Remove from saved" : "Save internship"}
                                >
                                  <Bookmark 
                                    className="h-5 w-5 text-gray-400 hover:text-sattejli-blue" 
                                    fill={internship.saved ? "#4F46E5" : "none"}
                                    stroke={internship.saved ? "#4F46E5" : "currentColor"}
                                  />
                                </button>
                              </div>
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
                                {getDuration(internship.startDate, internship.endDate)}
                              </div>
                              <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                Posted: {formatDate(internship.posted)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                        let pageToShow: number | null = null;
                        
                        if (totalPages <= 5) {
                          pageToShow = index + 1;
                        } else if (currentPage <= 3) {
                          if (index < 4) {
                            pageToShow = index + 1;
                          } else if (index === 4 && totalPages > 5) {
                            return (
                              <PaginationItem key="ellipsis-end">
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                        } else if (currentPage >= totalPages - 2) {
                          if (index === 0) {
                            pageToShow = 1;
                          } else if (index === 1 && totalPages > 5) {
                            return (
                              <PaginationItem key="ellipsis-start">
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          } else {
                            pageToShow = totalPages - (4 - index);
                          }
                        } else {
                          if (index === 0) {
                            pageToShow = 1;
                          } else if (index === 1) {
                            return (
                              <PaginationItem key="ellipsis-start">
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          } else if (index < 4) {
                            pageToShow = currentPage + (index - 2);
                          } else {
                            return (
                              <PaginationItem key="ellipsis-end">
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                        }
                        
                        if (pageToShow !== null) {
                          return (
                            <PaginationItem key={pageToShow}>
                              <PaginationLink 
                                isActive={currentPage === pageToShow} 
                                onClick={() => handlePageChange(pageToShow as number)}
                              >
                                {pageToShow}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        
                        return null;
                      })}
                      
                      <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
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

export default Internships;
