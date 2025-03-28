
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Phone, MapPin, Globe, BookOpen, Calendar, FileText, Briefcase, Star, Award, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock student data
const mockStudentData = {
  id: 1,
  firstName: 'Ahmed',
  lastName: 'Ben Ali',
  email: 'ahmed.benali@gmail.com',
  phone: '+216 55 123 456',
  address: 'Tunis, Tunisia',
  website: 'ahmedbenali.dev',
  profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
  university: 'INSAT - National Institute of Applied Science and Technology',
  degree: 'Master',
  fieldOfStudy: 'Computer Science',
  graduationDate: '2024-06-30',
  bio: 'Passionate software developer with a strong interest in web technologies and artificial intelligence. I am looking for an internship opportunity to apply my skills and gain professional experience in a dynamic environment.',
  resumeUrl: '/ahmed_benali_resume.pdf',
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'Machine Learning', 'Git', 'Docker'],
  experiences: [
    {
      title: 'Web Development Intern',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2023-07-01',
      endDate: '2023-08-31',
      description: 'Developed features for a web application using React and Node.js.'
    }
  ],
  education: [
    {
      institution: 'INSAT - National Institute of Applied Science and Technology',
      degree: 'Master\'s in Computer Science',
      fieldOfStudy: 'Software Engineering',
      startDate: '2022-09-01',
      endDate: '2024-06-30',
      gpa: '3.8/4.0'
    },
    {
      institution: 'INSAT - National Institute of Applied Science and Technology',
      degree: 'Bachelor\'s in Computer Science',
      fieldOfStudy: 'Software Engineering',
      startDate: '2019-09-01',
      endDate: '2022-06-30',
      gpa: '3.7/4.0'
    }
  ],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'French', level: 'Fluent' },
    { name: 'English', level: 'Proficient' }
  ],
  certifications: [
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2023-03'
    },
    {
      name: 'Machine Learning Specialization',
      issuer: 'Stanford Online',
      date: '2022-11'
    }
  ]
};

const ApplicantProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState(mockStudentData);
  const [loading, setLoading] = useState(true);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setStudent(mockStudentData);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleDownloadCV = () => {
    toast({
      title: "Downloading CV",
      description: "The CV is being downloaded to your device.",
    });
    // In a real application, this would initiate a download of the actual CV file
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${student.firstName} ${student.lastName}.`,
    });
    setShowContactForm(false);
    setEmailSubject('');
    setEmailBody('');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="spinner">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link to="/company-dashboard" className="inline-flex items-center text-gray-500 hover:text-sattejli-blue mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
          </Link>
          
          {/* Basic Profile Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-100">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
              <div className="flex flex-col md:flex-row items-center">
                <img 
                  src={student.profilePicture} 
                  alt={`${student.firstName} ${student.lastName}`} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">{student.firstName} {student.lastName}</h1>
                  <p className="text-gray-600">{student.fieldOfStudy} Student</p>
                  <p className="text-gray-600">{student.university}</p>
                </div>
                <div className="ml-auto mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
                  <Button 
                    onClick={handleDownloadCV} 
                    className="bg-sattejli-blue hover:bg-blue-600 flex items-center"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                  <Button 
                    onClick={() => setShowContactForm(!showContactForm)} 
                    variant="outline" 
                    className="flex items-center"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>
            
            {showContactForm && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Message to {student.firstName}</h3>
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="input-field w-full"
                      placeholder="e.g., Interview Invitation for Frontend Developer Position"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows={5}
                      className="input-field w-full"
                      placeholder="Type your message here..."
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowContactForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-sattejli-blue hover:bg-blue-600 flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-900">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-sm text-gray-900">{student.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Location</p>
                      <p className="text-sm text-gray-900">{student.address}</p>
                    </div>
                  </div>
                  {student.website && (
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Website</p>
                        <a 
                          href={`https://${student.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-sattejli-blue hover:underline"
                        >
                          {student.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <BookOpen className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">University</p>
                      <p className="text-sm text-gray-900">{student.university}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Degree</p>
                      <p className="text-sm text-gray-900">{student.degree} in {student.fieldOfStudy}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Expected Graduation</p>
                      <p className="text-sm text-gray-900">
                        {new Date(student.graduationDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skills Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Languages Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Languages</h2>
              <div className="space-y-3">
                {student.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{language.name}</span>
                    <span className="text-sm text-gray-500">{language.level}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Certifications Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>
              <div className="space-y-4">
                {student.certifications.map((cert, index) => (
                  <div key={index} className="border-l-2 border-blue-400 pl-3">
                    <p className="font-medium text-gray-900">{cert.name}</p>
                    <p className="text-sm text-gray-500">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Experience Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Experience</h2>
            {student.experiences.length > 0 ? (
              <div className="space-y-6">
                {student.experiences.map((exp, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-700">
                        <Briefcase className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company} • {exp.location}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                        {new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                      <p className="mt-2 text-gray-700">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No professional experience yet.</p>
            )}
          </div>
          
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700">{student.bio}</p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link to="/company-dashboard">
              <Button variant="outline">Back to Applications</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ApplicantProfile;
