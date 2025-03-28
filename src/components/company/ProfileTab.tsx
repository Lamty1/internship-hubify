
import { Building, Mail, Phone, User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompanyInfo } from '@/types/company';

interface ProfileTabProps {
  companyInfo: CompanyInfo;
  handleEditProfile: () => void;
}

const ProfileTab = ({ companyInfo, handleEditProfile }: ProfileTabProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <img src={companyInfo.logo} alt="Company Logo" className="w-20 h-20 rounded-full mr-6" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{companyInfo.name}</h2>
              <p className="text-gray-600">{companyInfo.industry} • {companyInfo.location}</p>
            </div>
            <Button className="ml-auto bg-sattejli-blue hover:bg-blue-600" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Building className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Industry</p>
                    <p className="text-sm text-gray-900">{companyInfo.industry}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-900">{companyInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-sm text-gray-900">{companyInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Website</p>
                    <p className="text-sm text-gray-900">{companyInfo.website}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Company</h3>
              <p className="text-gray-700">{companyInfo.description}</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Company Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Modern office in central Tunis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Flexible working hours</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Professional development opportunities</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Potential for full-time employment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
