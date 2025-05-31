import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-teal-900 text-teal-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-bold mb-2">Marriage Stories</div>
            <div className="text-teal-200">Coming Soon, In sha Allah</div>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-teal-100 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="#" 
              className="text-teal-100 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="#" 
              className="text-teal-100 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-teal-800/50 text-center text-teal-300 text-sm">
          <p>© {currentYear} Marriage Stories. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;