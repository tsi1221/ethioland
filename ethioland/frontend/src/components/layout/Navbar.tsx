import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, User, Heart, PlusCircle, LogOut } from 'lucide-react';
import authService from '../../services/auth.service';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-gray-900">EthioLand</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/properties"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Properties
            </Link>
            
            {isAuthenticated ? (
              <>
                {(user?.role === 'SELLER' || user?.role === 'AGENT' || user?.role === 'ADMIN') && (
                  <Link
                    to="/properties/create"
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <PlusCircle className="h-5 w-5" />
                    <span>List Property</span>
                  </Link>
                )}
                
                <Link
                  to="/favorites"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
                
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>{user?.firstName}</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/properties"
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              
              {isAuthenticated ? (
                <>
                  {(user?.role === 'SELLER' || user?.role === 'AGENT' || user?.role === 'ADMIN') && (
                    <Link
                      to="/properties/create"
                      className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      List Property
                    </Link>
                  )}
                  
                  <Link
                    to="/favorites"
                    className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Favorites
                  </Link>
                  
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-gray-50 px-3 py-2 rounded-md text-left transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 text-white px-3 py-2 rounded-md hover:bg-primary-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;