
export interface CompanyInfo {
  id?: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  description: string;
}

export interface InternshipData {
  id: number | string;
  title: string;
  applications: number;
  status: string;
  posted: string;
  deadline: string;
}

export interface ApplicationData {
  id: number | string;
  name: string;
  position: string;
  status: string;
  date: string;
}

export interface InternshipFormData {
  title: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  applicationDeadline: string;
  positions: number;
}
