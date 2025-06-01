import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-sm backdrop-blur-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-emerald-900">Marriage Stories</span>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a href="#features" className="text-emerald-800 hover:text-emerald-700 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#waitlist" className="text-emerald-900 hover:text-emerald-700 transition-colors">
                  Join Waitlist
                </a>
              </li>
              <li>
                <a href="#about" className="text-emerald-900 hover:text-emerald-700 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </nav>
          
          <button 
            className="md:hidden text-teal-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-teal-50 absolute top-full left-0 w-full p-4 shadow-md">
          <ul className="flex flex-col space-y-4">
            <li>
              <a 
                href="#features" 
                className="block text-teal-900 hover:text-teal-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
            </li>
            <li>
              <a 
                href="#waitlist" 
                className="block text-teal-900 hover:text-teal-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Waitlist
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className="block text-teal-900 hover:text-teal-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;