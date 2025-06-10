import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import WaitlistForm from './components/WaitlistForm';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Update page title
    document.title = 'BaitulSakinah - Join the Waitlist';
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const href = (e.currentTarget as HTMLAnchorElement)?.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-[#FFFCF7] text-teal-900 font-sans">
      <Header />
      <Hero />
      <Features />
      <SocialProof />
      <WaitlistForm />
      <Footer />
    </div>
  );
}

export default App;