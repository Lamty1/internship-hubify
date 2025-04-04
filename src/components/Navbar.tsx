
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthManager } from '@/lib/auth-utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, handleLogout, user } = useAuthManager();

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-sattejli-blue">Sattejli</span>
          <span className="text-sm text-sattejli-teal">.tn</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-sattejli-blue transition-colors">Home</Link>
          <Link to="/internships" className="text-gray-700 hover:text-sattejli-blue transition-colors">Internships</Link>
          <Link to="/companies" className="text-gray-700 hover:text-sattejli-blue transition-colors">Companies</Link>
          <Link to="/about" className="text-gray-700 hover:text-sattejli-blue transition-colors">About</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-sattejli-blue text-sattejli-blue hover:bg-sattejli-blue/5">
                  <User className="mr-2 h-4 w-4" />
                  {user?.email ? user.email.split('@')[0] : 'Account'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/student-profile" className="w-full cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/student-dashboard" className="w-full cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-sattejli-blue text-sattejli-blue hover:bg-sattejli-blue/5">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-sattejli-blue hover:bg-blue-600">Register</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-white border-t animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-sattejli-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/internships" 
              className="text-gray-700 hover:text-sattejli-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Internships
            </Link>
            <Link 
              to="/companies" 
              className="text-gray-700 hover:text-sattejli-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Companies
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-sattejli-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-2 flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <Link to="/student-profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start border-sattejli-blue text-sattejli-blue">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-red-500 text-red-500"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-sattejli-blue text-sattejli-blue">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-sattejli-blue hover:bg-blue-600">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
