
import { FileText as FileIcon, CheckCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationsTab = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
          <Button variant="outline">Mark All as Read</Button>
        </div>
        
        <div className="divide-y divide-gray-100">
          <div className="p-6 hover:bg-gray-50 flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-4">
              <FileIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">New application received</p>
              <p className="text-sm text-gray-600">Fatima Mansour applied for UI/UX Design Intern position</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
          
          <div className="p-6 hover:bg-gray-50 flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-4">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Internship posting approved</p>
              <p className="text-sm text-gray-600">Your Frontend Developer Intern posting has been approved and is now live</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
          
          <div className="p-6 hover:bg-gray-50 flex items-start">
            <div className="bg-yellow-100 p-2 rounded-full mr-4">
              <Bell className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Reminder: Internship deadline approaching</p>
              <p className="text-sm text-gray-600">The application deadline for UI/UX Design Intern is in 5 days</p>
              <p className="text-xs text-gray-500 mt-1">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
