
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Calendar,
  Building2, 
  Users,
  Bookmark,
  Share2,
  MessageSquare,
  FileText,
  Upload,
  Check,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

// Mock data for a specific internship
const MOCK_INTERNSHIP = {
  id: 1,
  title: 'Frontend Development Intern',
  company: 'TechCorp Tunisia',
  companyLogo: 'TC',
  location: 'Tunis, Tunisia',
  type: 'Full-time',
  duration: '3 months',
  postedDate: '2 days ago',
  applicationDeadline: 'August 30, 2023',
  salary: '500-700 TND per month',
  positions: 2,
  education: 'Bachelor\'s in Computer Science or related field',
  about: 'Join our dynamic team at TechCorp Tunisia and help us build modern web applications using the latest technologies. This is a great opportunity to gain hands-on experience in a professional environment.',
  requirements: [
    'Basic knowledge of HTML, CSS, and JavaScript',
    'Familiarity with React or similar frontend frameworks',
    'Strong problem-solving skills',
    'Good communication skills',
    'Ability to work in a team environment',
  ],
  responsibilities: [
    'Develop and maintain responsive web applications',
    'Collaborate with UI/UX designers to implement designs',
    'Troubleshoot and debug issues',
    'Work with senior developers to learn best practices',
    'Participate in code reviews',
  ],
  benefits: [
    'Competitive stipend',
    'Flexible working hours',
    'Mentorship from experienced developers',
    'Possibility of full-time employment after internship',
    'Modern office environment',
  ],
  tags: ['React', 'JavaScript', 'HTML/CSS', 'Frontend', 'Web Development'],
  companyInfo: {
    name: 'TechCorp Tunisia',
    logo: 'TC',
    description: 'TechCorp Tunisia is a leading software development company specializing in web and mobile application development. We work with clients across various industries to deliver innovative digital solutions.',
    website: 'https://techcorp.tn',
    employees: '50-100',
    founded: 2015,
    location: 'Tunis, Tunisia',
  }
};

const InternshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isSaved, setIsSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, you would fetch the internship data based on the id
  const internship = MOCK_INTERNSHIP;

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Saved successfully",
      description: isSaved 
        ? "Internship removed from your saved list" 
        : "Internship added to your saved list",
    });
  };

  const handleShare = () => {
    // In a real app, you would implement sharing functionality
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Internship link copied to clipboard",
    });
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Application submitted",
        description: "Your application has been successfully submitted",
      });
      
      setIsDialogOpen(false);
      navigate('/student-dashboard');
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const isLoggedIn = false; // In a real app, check if user is logged in

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link to="/internships" className="inline-flex items-center text-gray-500 hover:text-sattejli-blue mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Internships
          </Link>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{internship.title}</h1>
                  <p className="text-lg text-gray-700 mb-4">
                    <Link to={`/companies/${internship.companyInfo.name}`} className="hover:text-sattejli-blue">
                      {internship.company}
                    </Link>
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {internship.location}
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {internship.duration}
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      Posted {internship.postedDate}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {internship.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-white text-sattejli-blue border border-sattejli-blue/30 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 md:mt-0 flex flex-col sm:flex-row md:flex-col gap-3">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-sattejli-blue hover:bg-blue-600">
                        Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Apply for {internship.title}</DialogTitle>
                      </DialogHeader>
                      {isLoggedIn ? (
                        <form onSubmit={handleApply} className="mt-4">
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Resume/CV
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                              <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600 mb-1">
                                Drag & drop your CV here or
                              </p>
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                className="mt-1"
                              >
                                Browse Files
                              </Button>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept=".pdf,.doc,.docx" 
                              />
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Cover Letter (Optional)
                            </label>
                            <textarea
                              rows={4}
                              className="input-field w-full"
                              placeholder="Explain why you're a good fit for this position..."
                              value={coverLetter}
                              onChange={(e) => setCoverLetter(e.target.value)}
                            />
                          </div>
                          
                          <div className="flex justify-end gap-3">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              type="submit" 
                              className="bg-sattejli-blue hover:bg-blue-600"
                              disabled={isUploading}
                            >
                              {isUploading ? 'Submitting...' : 'Submit Application'}
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="py-6 text-center">
                          <AlertCircle className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Login Required</h3>
                          <p className="text-gray-600 mb-6">
                            You need to be logged in to apply for this internship
                          </p>
                          <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <Link to="/login">
                              <Button className="w-full sm:w-auto bg-sattejli-blue hover:bg-blue-600">
                                Log In
                              </Button>
                            </Link>
                            <Link to="/register">
                              <Button variant="outline" className="w-full sm:w-auto">
                                Create Account
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <div className="flex flex-row sm:flex-col gap-3">
                    <Button variant="outline" onClick={handleSave}>
                      {isSaved ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Bookmark className="mr-2 h-4 w-4" />
                          Save
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Internship Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-8">
              <div className="lg:col-span-2">
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About the Internship</h2>
                  <p className="text-gray-700 mb-6">{internship.about}</p>
                  
                  <h3 className="font-bold text-gray-900 mb-3">Requirements</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    {internship.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                  
                  <h3 className="font-bold text-gray-900 mb-3">Responsibilities</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    {internship.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                  
                  <h3 className="font-bold text-gray-900 mb-3">Benefits</h3>
                  <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
                    {internship.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About the Company</h2>
                  <div className="flex items-start mb-4">
                    <div className="bg-gray-100 w-14 h-14 rounded-md flex items-center justify-center mr-4">
                      <span className="font-bold text-gray-700 text-xl">{internship.companyInfo.logo}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{internship.companyInfo.name}</h3>
                      <a 
                        href={internship.companyInfo.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sattejli-blue hover:text-blue-700 text-sm"
                      >
                        {internship.companyInfo.website}
                      </a>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{internship.companyInfo.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Employees</p>
                        <p className="text-sm text-gray-700">{internship.companyInfo.employees}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Founded</p>
                        <p className="text-sm text-gray-700">{internship.companyInfo.founded}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm text-gray-700">{internship.companyInfo.location}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Internship Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Application Deadline</p>
                      <p className="text-gray-700 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {internship.applicationDeadline}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Type</p>
                      <p className="text-gray-700 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {internship.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Duration</p>
                      <p className="text-gray-700 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {internship.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Stipend</p>
                      <p className="text-gray-700 flex items-center">
                        <span className="font-bold mr-2">₹</span>
                        {internship.salary}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Available Positions</p>
                      <p className="text-gray-700 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        {internship.positions}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Education</p>
                      <p className="text-gray-700 flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                        {internship.education}
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-sattejli-blue hover:bg-blue-600 mb-4" onClick={() => setIsDialogOpen(true)}>
                  Apply Now
                </Button>
                
                <div className="flex flex-col space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={handleSave}
                  >
                    <Bookmark className="mr-2 h-5 w-5" />
                    {isSaved ? 'Saved' : 'Save for Later'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleShare}
                  >
                    <Share2 className="mr-2 h-5 w-5" />
                    Share Internship
                  </Button>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Contact Support
                    </Button>
                  </Link>
                  <Link to="/resume-tips">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-5 w-5" />
                      Resume Tips
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar Internships */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Internships</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[2, 3, 4].map((id) => (
                <Link to={`/internships/${id}`} key={id}>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-gray-100 w-12 h-12 rounded flex items-center justify-center">
                        <span className="font-bold text-gray-700">C{id}</span>
                      </div>
                      <span className="text-sm font-medium text-sattejli-emerald px-3 py-1 bg-green-50 rounded-full">
                        {id % 2 === 0 ? 'Full-time' : 'Part-time'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {id === 2 ? 'UI/UX Design Intern' : id === 3 ? 'Data Science Intern' : 'Marketing Intern'}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {id === 2 ? 'Creative Solutions' : id === 3 ? 'DataTech' : 'Global Marketing Agency'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {id === 2 
                        ? ['Figma', 'UI Design'].map((tag, i) => (
                            <span key={i} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{tag}</span>
                          ))
                        : id === 3
                        ? ['Python', 'Data Analysis'].map((tag, i) => (
                            <span key={i} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{tag}</span>
                          ))
                        : ['Content', 'Social Media'].map((tag, i) => (
                            <span key={i} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{tag}</span>
                          ))
                      }
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>
                        {id === 2 ? 'Sousse, Tunisia' : id === 3 ? 'Remote' : 'Tunis, Tunisia'}
                      </span>
                      <span>
                        {id === 2 ? '1 week ago' : id === 3 ? '3 days ago' : 'Yesterday'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default InternshipDetail;
