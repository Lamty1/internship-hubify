
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CompanyInfo } from '@/types/company';

interface SettingsTabProps {
  companyInfo: CompanyInfo;
}

const SettingsTab = ({ companyInfo }: SettingsTabProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
        </div>
        
        <div className="p-6">
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    className="input-field w-full"
                    defaultValue={companyInfo.name}
                  />
                </div>
                
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <input
                    id="industry"
                    type="text"
                    className="input-field w-full"
                    defaultValue={companyInfo.industry}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input-field w-full"
                    defaultValue={companyInfo.email}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="input-field w-full"
                    defaultValue={companyInfo.phone}
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    id="website"
                    type="url"
                    className="input-field w-full"
                    defaultValue={companyInfo.website}
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    className="input-field w-full"
                    defaultValue={companyInfo.location}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="input-field w-full"
                    defaultValue={companyInfo.description}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-sattejli-blue hover:bg-blue-600">Save Changes</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="password" className="space-y-6">
              <div className="max-w-md">
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    className="input-field w-full"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className="input-field w-full"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="input-field w-full"
                  />
                </div>
                
                <Button className="bg-sattejli-blue hover:bg-blue-600">Update Password</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailNotifications"
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailNotifications" className="font-medium text-gray-700">Email Notifications</label>
                    <p className="text-gray-500">Receive email notifications about new applications and messages</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="applicationUpdates"
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="applicationUpdates" className="font-medium text-gray-700">Application Updates</label>
                    <p className="text-gray-500">Receive notifications about application status changes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketingEmails"
                      type="checkbox"
                      className="rounded border-gray-300 text-sattejli-blue focus:ring-sattejli-blue"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketingEmails" className="font-medium text-gray-700">Marketing Emails</label>
                    <p className="text-gray-500">Receive updates about new features and promotions</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-sattejli-blue hover:bg-blue-600">Save Preferences</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
