import React, { useState, useEffect } from 'react';
import { ArrowLeft, Briefcase, MapPin, Calendar, Clock, DollarSign, FileText, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createInternship, getCompanyByUserId } from '@/lib/api';
import { InternshipFormData } from '@/types/company';
import { useQuery } from '@tanstack/react-query';

const DEMO_USER_ID = '1';

const PostInternship = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  
  const { data: companyData } = useQuery({
    queryKey: ['company', DEMO_USER_ID],
    queryFn: () => getCompanyByUserId(DEMO_USER_ID),
  });

  useEffect(() => {
    if (companyData) {
      setCompanyId(companyData.id);
    }
  }, [companyData]);
  
  const [formData, setFormData] = useState<InternshipFormData>({
    title: '',
    location: '',
    type: '',
    startDate: '',
    endDate: '',
    salary: '',
    description: '',
    responsibilities: [''],
    requirements: [''],
    skills: [''],
    applicationDeadline: '',
    positions: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleListChange = (field: 'responsibilities' | 'requirements' | 'skills', index: number, value: string) => {
    const updatedList = [...formData[field]];
    updatedList[index] = value;
    setFormData({ ...formData, [field]: updatedList });
  };

  const addListItem = (field: 'responsibilities' | 'requirements' | 'skills') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeListItem = (field: 'responsibilities' | 'requirements' | 'skills', index: number) => {
    const updatedList = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedList });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyId) {
      toast({
        title: "Error",
        description: "Company ID not found. Please try again later.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createInternship(formData, companyId);
      
      toast({
        title: "Internship posted",
        description: "Your internship has been successfully posted.",
      });
      
      navigate('/company-dashboard');
    } catch (error) {
      console.error("Error posting internship:", error);
      toast({
        title: "Error",
        description: "There was an error posting your internship. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link to="/company-dashboard" className="inline-flex items-center text-gray-500 hover:text-sattejli-blue mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Post New Internship</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                  <h2 className="text-lg font-semibold flex items-center text-gray-800">
                    <Briefcase className="mr-2 h-5 w-5" /> Basic Information
                  </h2>
                  
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Internship Title *
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      className="input-field w-full"
                      placeholder="e.g., Software Engineering Intern"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <div className="flex items-center">
                      <span className="absolute ml-3 text-gray-500 pointer-events-none">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        required
                        className="input-field w-full pl-10"
                        placeholder="City, Country or Remote"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Internship Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      className="input-field w-full"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date *
                      </label>
                      <div className="flex items-center">
                        <span className="absolute ml-3 text-gray-500 pointer-events-none">
                          <Calendar className="h-5 w-5" />
                        </span>
                        <input
                          id="startDate"
                          name="startDate"
                          type="date"
                          required
                          className="input-field w-full pl-10"
                          value={formData.startDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                        End Date *
                      </label>
                      <div className="flex items-center">
                        <span className="absolute ml-3 text-gray-500 pointer-events-none">
                          <Calendar className="h-5 w-5" />
                        </span>
                        <input
                          id="endDate"
                          name="endDate"
                          type="date"
                          required
                          className="input-field w-full pl-10"
                          value={formData.endDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                        Salary/Stipend
                      </label>
                      <div className="flex items-center">
                        <span className="absolute ml-3 text-gray-500 pointer-events-none">
                          <DollarSign className="h-5 w-5" />
                        </span>
                        <input
                          id="salary"
                          name="salary"
                          type="text"
                          className="input-field w-full pl-10"
                          placeholder="e.g., 500 TND/month"
                          value={formData.salary}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="positions" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Positions *
                      </label>
                      <div className="flex items-center">
                        <span className="absolute ml-3 text-gray-500 pointer-events-none">
                          <Users className="h-5 w-5" />
                        </span>
                        <input
                          id="positions"
                          name="positions"
                          type="number"
                          min="1"
                          required
                          className="input-field w-full pl-10"
                          value={formData.positions}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                      Application Deadline *
                    </label>
                    <div className="flex items-center">
                      <span className="absolute ml-3 text-gray-500 pointer-events-none">
                        <Clock className="h-5 w-5" />
                      </span>
                      <input
                        id="applicationDeadline"
                        name="applicationDeadline"
                        type="date"
                        required
                        className="input-field w-full pl-10"
                        value={formData.applicationDeadline}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-6">
                  <h2 className="text-lg font-semibold flex items-center text-gray-800">
                    <FileText className="mr-2 h-5 w-5" /> Description & Requirements
                  </h2>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Internship Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      className="input-field w-full"
                      placeholder="Describe the internship, your company, and what the intern will be doing..."
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Responsibilities *
                    </label>
                    {formData.responsibilities.map((responsibility, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="text"
                          placeholder="e.g., Develop web applications"
                          className="input-field w-full"
                          value={responsibility}
                          onChange={(e) => handleListChange('responsibilities', index, e.target.value)}
                          required={index === 0}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => removeListItem('responsibilities', index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-sattejli-blue hover:text-blue-700 text-sm font-medium"
                      onClick={() => addListItem('responsibilities')}
                    >
                      + Add another responsibility
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requirements *
                    </label>
                    {formData.requirements.map((requirement, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="text"
                          placeholder="e.g., Currently pursuing a degree in Computer Science"
                          className="input-field w-full"
                          value={requirement}
                          onChange={(e) => handleListChange('requirements', index, e.target.value)}
                          required={index === 0}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => removeListItem('requirements', index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-sattejli-blue hover:text-blue-700 text-sm font-medium"
                      onClick={() => addListItem('requirements')}
                    >
                      + Add another requirement
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills Required/Preferred
                    </label>
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="text"
                          placeholder="e.g., JavaScript, React, Communication"
                          className="input-field w-full"
                          value={skill}
                          onChange={(e) => handleListChange('skills', index, e.target.value)}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => removeListItem('skills', index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-sattejli-blue hover:text-blue-700 text-sm font-medium"
                      onClick={() => addListItem('skills')}
                    >
                      + Add another skill
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Link to="/company-dashboard">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  className="bg-sattejli-blue hover:bg-blue-600"
                  disabled={isSubmitting || !companyId}
                >
                  {isSubmitting ? 'Posting...' : 'Post Internship'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PostInternship;
