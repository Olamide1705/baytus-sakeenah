import rings from "../assets/rings_LE_upscale_balanced_x4.jpg";
import { Star, UserRoundPlus } from "lucide-react";

const VolunteerHeader = () => {
  return (
      <div className="flex flex-col min-h-screen pb-20">
        <div className="relative min-h-screen pt-20 pb-20 flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={rings} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="w-full px-4 md:px-10 relative z-20">
            <div className="gap-12 items-center">
              <div className="text-center md:text-left">
                <div className="inline-block mb-6 animate-float">
                  <span className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-emerald-900 font-medium shadow-xl shadow-emerald-900/10 flex items-center gap-2">
                    <Star size={18} />
                    Join Us
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

                <p className="hidden md:block text-lg md:text-xl text-emerald-900/80 mb-8 leading-loose">
                  Join our community where experienced Muslim couples share
                  wisdom to
                  <br /> help build marriages that reflect the beauty of Islamic
                  teachings.
                </p>

                <p className="md:hidden text-center text-lg md:text-xl text-emerald-900/80 mb-8 leading-relaxed">
                  Join our community where experienced Muslim couples share
                  wisdom to help build marriages that reflect the beauty of
                  Islamic teachings.
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
        </div>
      </div>
  );
};

export default VolunteerHeader;
