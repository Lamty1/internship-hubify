
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-sattejli-blue">Sattejli</span>
              <span className="text-sm text-sattejli-teal">.tn</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Connecting talented students with the best internship opportunities across Tunisia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-sattejli-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sattejli-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sattejli-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sattejli-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-800 mb-4">For Students</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/internships" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  Browse Internships
                </Link>
              </li>
              <li>
                <Link to="/create-profile" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/resume-tips" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link to="/career-advice" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  Career Advice
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-800 mb-4">For Companies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-internship" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  Post Internship
                </Link>
              </li>
              <li>
                <Link to="/company-profile" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  Company Profile
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-sattejli-blue transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Sattejli.tn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
