
import React from 'react';
import { BriefcaseIcon, FileText, Bell } from 'lucide-react';
import StatCard from './StatCard';

interface StatsSectionProps {
  activeInternships: number;
  totalApplications: number;
  newApplications: number;
}

const StatsSection = ({ activeInternships, totalApplications, newApplications }: StatsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Active Internships"
        value={activeInternships}
        icon={BriefcaseIcon}
        iconColor="text-blue-600"
        bgColor="bg-blue-100"
      />
      
      <StatCard
        title="Total Applications"
        value={totalApplications}
        icon={FileText}
        iconColor="text-green-600"
        bgColor="bg-green-100"
      />
      
      <StatCard
        title="New Applications"
        value={newApplications}
        icon={Bell}
        iconColor="text-yellow-600"
        bgColor="bg-yellow-100"
      />
    </div>
  );
};

export default StatsSection;
