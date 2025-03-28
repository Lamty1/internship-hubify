
import { ArrowRight, BriefcaseIcon, GraduationCap, Search, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-sky-100 py-20 md:py-32">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Find Your Perfect <span className="text-sattejli-blue">Internship</span> Opportunity
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Connect with top companies in Tunisia and launch your career with meaningful internship experiences.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-sattejli-blue hover:bg-blue-600">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/internships">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-sattejli-blue text-sattejli-blue hover:bg-blue-50">
                    Browse Internships
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                alt="Students collaborating" 
                className="rounded-lg shadow-xl float"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-sattejli-blue mb-2">500+</p>
                <p className="text-gray-600">Active Internships</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-sattejli-blue mb-2">200+</p>
                <p className="text-gray-600">Partner Companies</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-sattejli-blue mb-2">5,000+</p>
                <p className="text-gray-600">Registered Students</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-sattejli-blue mb-2">95%</p>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Sattejli Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We make it easy to find and apply for internships that match your skills and career goals.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-sattejli-blue" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Search Opportunities</h3>
                <p className="text-gray-600">
                  Browse through hundreds of internship opportunities across various fields and locations.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-8 w-8 text-sattejli-blue" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Create Your Profile</h3>
                <p className="text-gray-600">
                  Build your digital resume, highlight your skills, and showcase your projects and accomplishments.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BriefcaseIcon className="h-8 w-8 text-sattejli-blue" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Apply & Connect</h3>
                <p className="text-gray-600">
                  Apply directly through our platform and connect with companies looking for talented students like you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Internships */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Featured Internships</h2>
              <Link to="/internships" className="text-sattejli-blue hover:text-blue-700 flex items-center">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Link to="/internships/1" key={i} className="block">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-gray-100 w-12 h-12 rounded flex items-center justify-center">
                        <span className="font-bold text-gray-700">C{i}</span>
                      </div>
                      <span className="text-sm font-medium text-sattejli-emerald px-3 py-1 bg-green-50 rounded-full">
                        Full-time
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Software Development Intern</h3>
                    <p className="text-gray-500 mb-4">TechCorp Tunisia</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">JavaScript</span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">React</span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">Node.js</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Tunis, Tunisia</span>
                      <span>Posted 2 days ago</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from students and companies who have found success with Sattejli.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Ahmed Ben Ali</h4>
                    <p className="text-gray-600">Computer Science Student</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Thanks to Sattejli, I found an amazing internship at a tech startup that aligned perfectly with my career goals. The platform made it easy to showcase my skills and connect with companies."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Leila Mansour</h4>
                    <p className="text-gray-600">HR Manager, InnoTech</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a growing company, finding the right talent is crucial. Sattejli has helped us connect with motivated students who bring fresh perspectives to our team. The quality of applicants has been exceptional."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-sattejli-blue to-sattejli-indigo text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Career Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students and companies already using Sattejli to find their perfect match.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-sattejli-blue hover:bg-blue-50">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
