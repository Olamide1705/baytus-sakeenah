import React from 'react';
import { BookOpen, Users, Heart, MessageCircle, Compass } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-teal-900/5 hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="text-teal-800 mb-4 transform group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-teal-950 mb-3">{title}</h3>
        <p className="text-teal-800/80">{description}</p>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <BookOpen size={32} />,
      title: "Islamic Guidance",
      description: "Learn from authentic sources and scholarly wisdom about building a strong Muslim marriage."
    },
    {
      icon: <Users size={32} />,
      title: "Community Support",
      description: "Connect with experienced couples who've maintained successful Islamic marriages."
    },
    {
      icon: <Heart size={32} />,
      title: "Marriage Success Stories",
      description: "Read inspiring stories from couples who've built their relationship on Islamic principles."
    },
    {
      icon: <MessageCircle size={32} />,
      title: "Moderated Discussions",
      description: "Participate in respectful, gender-appropriate discussions about marriage challenges."
    },
    {
      icon: <Compass size={32} />,
      title: "Islamic Counseling",
      description: "Access to qualified Muslim counselors who combine professional expertise with Islamic wisdom."
    }
  ];

  return (
    <section id="features" className="py-20 hero-pattern">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Our Features</h2>
          <p className="text-lg text-teal-800/80">
            Building stronger marriages through Islamic wisdom and community support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;