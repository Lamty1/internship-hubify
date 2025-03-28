
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, GraduationCap, Building2, Brain, ArrowUpRight } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-sattejli-blue/10 text-sattejli-blue mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, name, role, company }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <p className="italic text-gray-600 mb-4">"{quote}"</p>
    <div>
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-gray-500">{role}, {company}</p>
    </div>
  </div>
);

const Index = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-sattejli-blue to-sattejli-indigo text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Internship in Tunisia</h1>
            <p className="text-xl mb-8">
              Connect with top companies and kickstart your career with Sattejli - Tunisia's leading internship platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-sattejli-blue hover:bg-blue-50">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/internships">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Browse Internships
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md -mt-20">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-4">Find Your Next Opportunity</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search for internships, companies, or keywords"
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sattejli-blue focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <select className="input-field">
                  <option value="">Location</option>
                  <option value="tunis">Tunis</option>
                  <option value="sousse">Sousse</option>
                  <option value="sfax">Sfax</option>
                  <option value="remote">Remote</option>
                </select>
                <select className="input-field">
                  <option value="">Category</option>
                  <option value="technology">Technology</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="design">Design</option>
                </select>
                <select className="input-field">
                  <option value="">Duration</option>
                  <option value="1-3">1-3 months</option>
                  <option value="3-6">3-6 months</option>
                  <option value="6+">6+ months</option>
                </select>
                <Link to="/internships">
                  <Button className="w-full bg-sattejli-blue hover:bg-blue-600">
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Matching Feature Highlight */}
      <section className="py-12 bg-gradient-to-br from-sattejli-indigo/5 to-sattejli-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md border border-sattejli-blue/10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <div className="bg-sattejli-blue/10 p-3 rounded-lg inline-block mb-4">
                    <Brain className="h-8 w-8 text-sattejli-blue" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">New: AI-Powered Internship Matching</h2>
                  <p className="text-gray-600 mb-6">
                    Upload your CV and let our advanced AI technology analyze your skills and experience to find the perfect internship matches for you. Get personalized recommendations with match scores based on your profile.
                  </p>
                  <Link to="/register">
                    <Button className="bg-sattejli-blue hover:bg-blue-600">
                      Try AI Matching <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">How it works:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-sattejli-blue/20 text-sattejli-blue font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                      <span>Upload your CV or complete your profile</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-sattejli-blue/20 text-sattejli-blue font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                      <span>Our AI analyzes your skills and experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-sattejli-blue/20 text-sattejli-blue font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                      <span>Get personalized internship recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-sattejli-blue/20 text-sattejli-blue font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                      <span>Apply with one click to your best matches</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Sattejli?</h2>
              <p className="text-gray-600 text-lg">
                We connect talented students with the best companies in Tunisia
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<GraduationCap className="h-6 w-6" />}
                title="For Students"
                description="Discover, apply, and track internship applications all in one place. Build your professional profile and get noticed by top companies."
              />
              <FeatureCard 
                icon={<Building2 className="h-6 w-6" />}
                title="For Companies"
                description="Post internship opportunities and find the best talent. Streamline your recruitment process and connect with qualified candidates."
              />
              <FeatureCard 
                icon={<Brain className="h-6 w-6" />}
                title="Smart Matching"
                description="Our AI-powered matching algorithm helps connect the right students with the right opportunities based on skills and preferences."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-gray-600 text-lg">
                Hear from students and companies who found success with Sattejli
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TestimonialCard 
                quote="Thanks to Sattejli, I found an amazing internship that aligned perfectly with my career goals. The platform was easy to use and I received a response within days."
                name="Sarra Ben Salah"
                role="Computer Science Student"
                company="INSAT"
              />
              <TestimonialCard 
                quote="As a growing tech company, finding the right interns was challenging until we discovered Sattejli. We've hired multiple talented students who have become valuable team members."
                name="Mehdi Trabelsi"
                role="HR Manager"
                company="TechWave Tunisia"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-sattejli-blue text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-lg mb-8">
              Join thousands of students and companies already using Sattejli to connect and create opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-sattejli-blue hover:bg-blue-50">
                  Create an Account
                </Button>
              </Link>
              <Link to="/internships">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Explore Internships
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
