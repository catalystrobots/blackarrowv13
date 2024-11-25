import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="h-16 flex items-center">
              <img 
                src="/logo.png" 
                alt="Black Arrow Forge" 
                className="h-full w-auto filter brightness-0 invert transition-transform hover:scale-105" 
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/"
              className={`text-gray-300 hover:text-white transition-colors relative group ${
                isActive('/') ? 'text-white' : ''
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform ${
                isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
            <Link 
              to="/services"
              className={`text-gray-300 hover:text-white transition-colors relative group ${
                isActive('/services') ? 'text-white' : ''
              }`}
            >
              Services
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform ${
                isActive('/services') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
            <Link 
              to="/blog"
              className={`text-gray-300 hover:text-white transition-colors relative group ${
                isActive('/blog') ? 'text-white' : ''
              }`}
            >
              Blog
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform ${
                isActive('/blog') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/quote')}
                className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105"
              >
                Request CNC Quote
              </button>
              <button 
                onClick={() => navigate('/instant-quote')}
                className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105"
              >
                Get Instant 3D Print Quote
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-black/95 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/blog"
              className="block w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <button 
              onClick={() => {
                navigate('/quote');
                setIsMenuOpen(false);
              }}
              className="w-full mt-2 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Request CNC Quote
            </button>
            <button 
              onClick={() => {
                navigate('/instant-quote');
                setIsMenuOpen(false);
              }}
              className="w-full mt-2 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Get Instant 3D Print Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}