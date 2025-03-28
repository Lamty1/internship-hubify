
export interface CompanyInfo {
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
  id: number;
  title: string;
  applications: number;
  status: string;
  posted: string;
  deadline: string;
}

export interface ApplicationData {
  id: number;
  name: string;
  position: string;
  status: string;
  date: string;
}
