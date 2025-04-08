
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Building2 } from 'lucide-react';

interface RoleSelectorTabsProps {
  selectedRole: 'student' | 'company';
  onRoleChange: (role: 'student' | 'company') => void;
}

const RoleSelectorTabs = ({ selectedRole, onRoleChange }: RoleSelectorTabsProps) => {
  return (
    <Tabs 
      defaultValue={selectedRole} 
      className="mb-6"
      onValueChange={(value) => onRoleChange(value as 'student' | 'company')}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="student" className="flex items-center justify-center">
          <GraduationCap className="mr-2 h-4 w-4" /> Student
        </TabsTrigger>
        <TabsTrigger value="company" className="flex items-center justify-center">
          <Building2 className="mr-2 h-4 w-4" /> Company
        </TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <p className="text-gray-600 text-sm mb-4 text-center">
          Access your student account to apply for internships and track your applications
        </p>
      </TabsContent>
      <TabsContent value="company">
        <p className="text-gray-600 text-sm mb-4 text-center">
          Access your company account to post internship opportunities and manage applications
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default RoleSelectorTabs;
