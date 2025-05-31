import React from 'react';

const SocialProof: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-950 mb-6">Why We're Building This</h2>
            
            <p className="text-emerald-800 text-lg mb-8 leading-relaxed">
              Nearly 50% of marriages end in divorce, often due to challenges that could have been navigated with better preparation and community support. We believe that sharing real stories from couples who've weathered storms can provide invaluable guidance to those just starting their journey.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-800">247+</div>
                <div className="text-emerald-700">People Waiting</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-800">73%</div>
                <div className="text-emerald-700">Young Couples</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-800">27%</div>
                <div className="text-emerald-700">Mentors</div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <a 
                href="#waitlist" 
                className="inline-flex items-center px-6 py-2 bg-emerald-800 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors"
              >
                Join the Waitlist
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;