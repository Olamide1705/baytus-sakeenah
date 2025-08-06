import React from 'react'
import rings from '../assets/rings_LE_upscale_balanced_x4.jpg';
import { Fuel as Mosque, Star, Heart } from 'lucide-react';
import Volunteer from '../components/Volunteer';

const VolunteerHeader = () => {
  return (
    <div className='scroll-smooth'>
   <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="relative min-h-screen pt-20 pb-20 flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute z-10"></div>
        <img 
          src={rings} 
          alt="" 
          className="w-full h-full object-cover bg-opacity-20"
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block mb-6 animate-float">
              <span className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-emerald-900 font-medium shadow-xl shadow-emerald-900/10 flex items-center gap-2">
                <Mosque size={18} />
                Coming Soon
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-normal">
              <span className="block mb-2 pb-2 gradient-text">
                Building Blessed Marriages
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-emerald-800/90 mt-4">
                Guided by Quran and Sunnah
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-emerald-900/80 mb-8 leading-relaxed">
              Join our community where experienced Muslim couples share wisdom to help build marriages that reflect the beauty of Islamic teachings.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <a 
                href="#volunteer" 
                className="button-primary inline-flex items-center justify-center gap-2"
              >
                <Star size={18} />
                Join us
              </a>
              
            </div>
</div>
</div>
</div>
</div>
    </div>
    <Volunteer/>
</div>

    
  )
}

export default VolunteerHeader