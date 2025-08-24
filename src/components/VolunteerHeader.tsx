import { Star, UserRoundPlus } from "lucide-react";
import rings from "../assets/rings.jpg";

const VolunteerHeader = () => {
  return (
    <section
      className="relative min-h-screen pt-20 mb-10 pb-10 flex items-center overflow-hidden bg-cover bg-right-bottom bg-white/50 lg:bg-transparent bg-blend-overlay"
      style={{ backgroundImage: `url(${rings})` }}
    >
      <div className="container mx-auto px-4 md:px-20 relative z-20">
        <div className="grid md:grid-cols-3 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left col-span-2 lg:col-span-1">
            <div className="inline-block mb-6 animate-float">
              <span className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-emerald-900 font-medium shadow-xl shadow-emerald-900/10 flex items-center gap-2">
                <Star size={18} />
                Join Us
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[55px] font-bold mb-6 leading-normal">
              <span className="block mb-2 pb-2 gradient-text">
                Building Blessed Marriages
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold text-emerald-800/90 mt-4">
                Guided by Quran and Sunnah
              </span>
            </h1>
            <p className="text-center md:text-left text-lg md:text-xl text-emerald-900/80 mb-8 leading-relaxed md:max-w-[70%]">
              We are building a community-driven platform to strengthen Muslim
              marriages, guided by faith and built on shared wisdom. Your
              contribution can make a profound difference in fostering
              tranquility (sakeenah), love (mawaddah), and mercy (rahmah) in
              homes across Nigeria and beyond.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <a
                href="#volunteer"
                className="button-primary inline-flex items-center justify-center gap-2"
              >
                <UserRoundPlus size={18} />
                Join Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerHeader;
