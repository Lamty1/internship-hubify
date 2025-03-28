
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  GraduationCap as GradCap,
  Share2,
  Bookmark,
  ArrowLeft
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const InternshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  // Mock internship data
  const internship = {
    id: id,
    title: 'Software Engineering Internship',
    company: 'Tech Innovations Inc.',
    location: 'Tunis, Tunisia',
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    duration: '3 months',
    type: 'Full-time',
    salary: '500 TND/month',
    description: 'Join our team and work on cutting-edge projects...',
    responsibilities: [
      'Develop and maintain software applications',
      'Participate in code reviews',
      'Collaborate with cross-functional teams',
    ],
    requirements: [
      'Currently enrolled in a Bachelor\'s or Master\'s degree in Computer Science or related field',
      'Strong programming skills in JavaScript, Python, or Java',
      'Excellent problem-solving and communication skills',
    ],
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Added to saved",
      description: isSaved ? "Internship has been removed from your saved list." : "Internship has been added to your saved list.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this internship with others.",
    });
  };

  const handleApply = () => {
    window.location.href = "/student-dashboard";
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link to="/internships" className="inline-flex items-center text-gray-500 hover:text-sattejli-blue mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Internships
          </Link>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{internship.title}</h1>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <GradCap className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-700">{internship.company}</span>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={handleShare} className="flex items-center text-gray-600 hover:text-sattejli-blue">
                  <Share2 className="h-5 w-5 mr-2" /> Share
                </button>
                <button onClick={handleSave} className="flex items-center text-gray-600 hover:text-sattejli-blue">
                  <Bookmark 
                    className="h-5 w-5 mr-2" 
                    fill={isSaved ? "#4F46E5" : "none"}
                    stroke={isSaved ? "#4F46E5" : "currentColor"}
                  /> 
                  {isSaved ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(internship.startDate).toLocaleDateString()} - {new Date(internship.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="h-5 w-5 mr-2" />
                <span>{internship.type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{internship.duration}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>{internship.salary}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700">{internship.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-700">
                {internship.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Requirements</h2>
              <ul className="list-disc list-inside text-gray-700">
                {internship.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            <Button 
              className="mt-8 bg-sattejli-blue hover:bg-blue-600"
              onClick={handleApply}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default InternshipDetail;
