
import React, { useState } from 'react';
import { ArrowLeft, Upload, Building, MapPin, Globe, Mail, Phone, Briefcase, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CompanyProfile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    foundedYear: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    description: '',
    socialMedia: {
      linkedin: '',
      facebook: '',
      twitter: '',
    },
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [platform]: value,
      },
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setLogoPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Profile updated",
      description: "Company profile has been successfully updated.",
    });
    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      window.location.href = '/company-dashboard';
    }, 2000);
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
              <h1 className="text-2xl font-bold text-gray-900">Edit Company Profile</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                  <h2 className="text-lg font-semibold flex items-center text-gray-800">
                    <Building className="mr-2 h-5 w-5" /> Company Information
                  </h2>
                  
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center border border-gray-300">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Company Logo" className="w-full h-full object-contain" />
                        ) : (
                          <Building className="h-16 w-16 text-gray-400" />
                        )}
                      </div>
                      <label htmlFor="logo-upload" className="absolute bottom-0 right-0 bg-sattejli-blue text-white p-2 rounded-full cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <input 
                          id="logo-upload" 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleLogoUpload}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      className="input-field w-full"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                      Industry *
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      required
                      className="input-field w-full"
                      value={formData.industry}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Size
                      </label>
                      <select
                        id="companySize"
                        name="companySize"
                        className="input-field w-full"
                        value={formData.companySize}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501+">501+ employees</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700 mb-1">
                        Founded Year
                      </label>
                      <input
                        id="foundedYear"
                        name="foundedYear"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        className="input-field w-full"
                        value={formData.foundedYear}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      Website *
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      required
                      className="input-field w-full"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Social Media (Optional)
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300">
                          LinkedIn
                        </span>
                        <input
                          type="url"
                          className="input-field w-full rounded-l-none"
                          placeholder="https://linkedin.com/company/..."
                          value={formData.socialMedia.linkedin}
                          onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300">
                          Facebook
                        </span>
                        <input
                          type="url"
                          className="input-field w-full rounded-l-none"
                          placeholder="https://facebook.com/..."
                          value={formData.socialMedia.facebook}
                          onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300">
                          Twitter
                        </span>
                        <input
                          type="url"
                          className="input-field w-full rounded-l-none"
                          placeholder="https://twitter.com/..."
                          value={formData.socialMedia.twitter}
                          onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-6">
                  <h2 className="text-lg font-semibold flex items-center text-gray-800">
                    <MapPin className="mr-2 h-5 w-5" /> Contact Information
                  </h2>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email *
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
                      Address *
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      className="input-field w-full"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        className="input-field w-full"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        required
                        className="input-field w-full"
                        value={formData.country}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a country</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={6}
                      required
                      className="input-field w-full"
                      placeholder="Tell students about your company, culture, and what you do..."
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Link to="/company-dashboard">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="bg-sattejli-blue hover:bg-blue-600">
                  Save Changes
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

export default CompanyProfile;
