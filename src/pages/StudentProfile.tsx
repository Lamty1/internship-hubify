import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, User, BookOpen, Calendar, Mail, Phone, MapPin, Globe, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const StudentProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    university: '',
    degree: '',
    fieldOfStudy: '',
    graduationDate: '',
    bio: '',
    skills: [''],
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('studentProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setFormData(parsedProfile);
        
        if (parsedProfile.profilePicture) {
          setProfilePicture(parsedProfile.profilePicture);
        }
        
        if (parsedProfile.resumeFile) {
          setResumeFile({ name: 'Resume.pdf', size: 1024 } as File);
        }
      } catch (error) {
        console.error("Error loading saved profile", error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setProfilePicture(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profileDataToSave = {
      ...formData,
      profilePicture,
      resumeFile: resumeFile ? true : false,
    };
    
    localStorage.setItem('studentProfile', JSON.stringify(profileDataToSave));
    
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'university', 'degree', 'fieldOfStudy', 'graduationDate', 
      'skills', 'resumeFile'
    ];
    
    const filledFields = requiredFields.filter(field => {
      if (field === 'skills') {
        return formData.skills && formData.skills.length > 0 && formData.skills[0] !== '';
      }
      if (field === 'resumeFile') {
        return resumeFile !== null;
      }
      return formData[field as keyof typeof formData] && formData[field as keyof typeof formData] !== '';
    });
    
    const percentage = Math.round((filledFields.length / requiredFields.length) * 100);
    
    toast({
      title: "Profile updated",
      description: `Your profile has been successfully updated. Profile completion: ${percentage}%`,
    });
    
    setTimeout(() => {
      navigate('/student-dashboard');
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link to="/student-dashboard" className="inline-flex items-center text-gray-500 hover:text-sattejli-blue mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                  <h2 className="text-lg font-semibold flex items-center text-gray-800">
                    <User className="mr-2 h-5 w-5" /> Personal Information
                  </h2>
                  
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {profilePicture ? (
                          <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User className="h-16 w-16 text-gray-400" />
                        )}
                      </div>
                      <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-sattejli-blue text-white p-2 rounded-full cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <input 
                          id="profile-upload" 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleProfilePictureUpload}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="input-field w-full"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="input-field w-full"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="input-field w-full"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="input-field w-full"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className="input-field w-full"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      Website/Portfolio
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      className="input-field w-full"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="flex-1 space-y-6">
                  <h2 className="text-lg font-semibold flex items-center text-gray-800">
                    <BookOpen className="mr-2 h-5 w-5" /> Education & Skills
                  </h2>
                  
                  <div>
                    <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                      University/Institution *
                    </label>
                    <input
                      id="university"
                      name="university"
                      type="text"
                      required
                      className="input-field w-full"
                      value={formData.university}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                      Degree *
                    </label>
                    <select
                      id="degree"
                      name="degree"
                      required
                      className="input-field w-full"
                      value={formData.degree}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a degree</option>
                      <option value="Bachelor">Bachelor's degree</option>
                      <option value="Master">Master's degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
                      Field of Study *
                    </label>
                    <input
                      id="fieldOfStudy"
                      name="fieldOfStudy"
                      type="text"
                      required
                      className="input-field w-full"
                      value={formData.fieldOfStudy}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="graduationDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Graduation Date *
                    </label>
                    <input
                      id="graduationDate"
                      name="graduationDate"
                      type="date"
                      required
                      className="input-field w-full"
                      value={formData.graduationDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills *
                    </label>
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="text"
                          placeholder="e.g., JavaScript, Design, Communication"
                          className="input-field w-full"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e.target.value)}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => removeSkill(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-sattejli-blue hover:text-blue-700 text-sm font-medium"
                      onClick={addSkill}
                    >
                      + Add another skill
                    </button>
                  </div>
                  
                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                      Resume/CV (PDF) *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                      {resumeFile ? (
                        <div className="text-green-600 font-medium">
                          {resumeFile.name} ({Math.round(resumeFile.size / 1024)} KB) uploaded
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          <Upload className="mx-auto h-6 w-6 mb-2" />
                          <p>Drag and drop a file or <span className="text-sattejli-blue">browse</span></p>
                          <p className="text-xs mt-1">Max file size: 5MB</p>
                        </div>
                      )}
                      <input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf"
                        required
                        className="hidden"
                        onChange={handleResumeUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={() => document.getElementById('resume')?.click()}
                      >
                        Select File
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio/About Me
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  className="input-field w-full"
                  placeholder="Tell companies about yourself, your experience, and what you're looking for..."
                  value={formData.bio}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Link to="/student-dashboard">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="bg-sattejli-blue hover:bg-blue-600">
                  Save Profile
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

export default StudentProfile;
