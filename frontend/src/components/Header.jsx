import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className={`text-2xl font-bold ${isScrolled || !isHomePage ? 'text-blue-900' : 'text-white'}`}>
            TravelEase
          </h1>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/movies" 
            className={`${isScrolled || !isHomePage ? 'text-gray-700 hover:text-blue-900' : 'text-white hover:text-gray-200'} transition-colors`}
          >
            Movies
          </Link>
          <Link 
            to="/flights" 
            className={`${isScrolled || !isHomePage ? 'text-gray-700 hover:text-blue-900' : 'text-white hover:text-gray-200'} transition-colors`}
          >
            Flights
          </Link>
          <Link 
            to="/trains" 
            className={`${isScrolled || !isHomePage ? 'text-gray-700 hover:text-blue-900' : 'text-white hover:text-gray-200'} transition-colors`}
          >
            Trains
          </Link>
          <Link 
            to="/buses" 
            className={`${isScrolled || !isHomePage ? 'text-gray-700 hover:text-blue-900' : 'text-white hover:text-gray-200'} transition-colors`}
          >
            Buses
          </Link>
          <Link 
            to="/events" 
            className={`${isScrolled || !isHomePage ? 'text-gray-700 hover:text-blue-900' : 'text-white hover:text-gray-200'} transition-colors`}
          >
            Events
          </Link>

          {currentUser ? (
            <div className="relative group">
              <button 
                className={`flex items-center space-x-1 ${
                  isScrolled || !isHomePage ? 'text-blue-900' : 'text-white'
                }`}
              >
                <User size={20} />
                <span className="hidden lg:inline">{currentUser.name}</span>
              </button>
              <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="px-4 py-2 space-y-2">
          <Link 
            to="/movies" 
            className="block py-2 text-gray-700 hover:text-blue-900" 
            onClick={() => setIsOpen(false)}
          >
            Movies
          </Link>
          <Link 
            to="/flights" 
            className="block py-2 text-gray-700 hover:text-blue-900" 
            onClick={() => setIsOpen(false)}
          >
            Flights
          </Link>
          <Link 
            to="/trains" 
            className="block py-2 text-gray-700 hover:text-blue-900" 
            onClick={() => setIsOpen(false)}
          >
            Trains
          </Link>
          <Link 
            to="/buses" 
            className="block py-2 text-gray-700 hover:text-blue-900" 
            onClick={() => setIsOpen(false)}
          >
            Buses
          </Link>
          <Link 
            to="/events" 
            className="block py-2 text-gray-700 hover:text-blue-900" 
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          
          {currentUser ? (
            <>
              <Link 
                to="/profile" 
                className="block py-2 text-gray-700 hover:text-blue-900" 
                onClick={() => setIsOpen(false)}
              >
                My Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left py-2 text-gray-700 hover:text-blue-900"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="block py-2 text-gray-700 hover:text-blue-900" 
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;