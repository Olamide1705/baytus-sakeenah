import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import WaitlistForm from './components/WaitlistForm';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import VolunteerHeader from './components/VolunteerHeader';

function App() {
  useEffect(() => {
    // Update page title
    document.title = 'BaitulSakinah - Join the Waitlist';
    
    // Smooth scroll for anchor links
    const anchors =
    document.querySelectorAll('a[href^="#"]');
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = (e.currentTarget as HTMLAnchorElement)?.getAttribute('href');
        if (!target) return;
        
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      };
    
      anchors.forEach(anchor =>
        anchor.addEventListener('click', handleClick));
      
    return () => {
      anchors.forEach(anchor =>
       anchor.removeEventListener('click', handleClick));
      };
  }, []);
  
      
      const host = window.location.hostname;
      const isJoinSubdomain =
      host.startsWith("join.");
      if(isJoinSubdomain) {
        return <VolunteerHeader/>
      }
      
  return (
    <div className="">
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