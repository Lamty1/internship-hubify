
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  GraduationCap as GradCap,
  Share2,
  Bookmark,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getInternship } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const InternshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  // Fetch internship data from the database
  const { data: internship, isLoading, error } = useQuery({
    queryKey: ['internship', id],
    queryFn: () => id ? getInternship(id) : Promise.reject('No internship ID provided'),
    enabled: !!id,
  });

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
    // In a real app, this would go to a form to apply
    navigate("/student-dashboard");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-500" />
            <p className="mt-2 text-gray-600">Loading internship details...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !internship) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Internship Not Found</h1>
              <p className="text-gray-600 mb-6">The internship you're looking for doesn't exist or has been removed.</p>
              <Link to="/internships">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Internships
                </Button>
              </Link>
            </div>
          </div>
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
          <Link to="/internships" className="inline-flex items-center text-gray-500 hover:text-sattejli-blue mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Internships
          </Link>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{internship.title}</h1>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <GradCap className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-700">{internship.company.name}</span>
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
                <span>{formatDate(internship.startDate)} - {formatDate(internship.endDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="h-5 w-5 mr-2" />
                <span>{internship.type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>Deadline: {formatDate(internship.applicationDeadline)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>{internship.salary || 'Not specified'}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700">{internship.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-700">
                {internship.responsibilities.map((responsibility: string, index: number) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Requirements</h2>
              <ul className="list-disc list-inside text-gray-700">
                {internship.requirements.map((requirement: string, index: number) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {internship.skills.map((skill: string, index: number) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <Button 
                className="w-full sm:w-auto bg-sattejli-blue hover:bg-blue-600"
                onClick={handleApply}
              >
                Apply Now
              </Button>
              <p className="text-sm text-gray-500">
                Positions Available: {internship.positions}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default InternshipDetail;
