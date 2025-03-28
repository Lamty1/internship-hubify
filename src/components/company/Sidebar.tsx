
import { 
  Users, 
  BriefcaseIcon, 
  Bell, 
  Settings, 
  LogOut,
  Building
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CompanySidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Company Portal</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                activeTab === 'dashboard' ? 'bg-sattejli-blue text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              <BriefcaseIcon className="mr-3 h-5 w-5" />
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                activeTab === 'applications' ? 'bg-sattejli-blue text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('applications')}
            >
              <Users className="mr-3 h-5 w-5" />
              Applications
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                activeTab === 'profile' ? 'bg-sattejli-blue text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <Building className="mr-3 h-5 w-5" />
              Company Profile
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                activeTab === 'notifications' ? 'bg-sattejli-blue text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell className="mr-3 h-5 w-5" />
              Notifications
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                activeTab === 'settings' ? 'bg-sattejli-blue text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </button>
          </li>
          <li className="pt-6">
            <button
              className="w-full text-left px-4 py-2 rounded-md flex items-center text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CompanySidebar;
