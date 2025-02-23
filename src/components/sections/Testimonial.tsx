
import React, { useState } from "react";
import { Play } from "lucide-react";

export const Testimonial = () => {
  const [isEnterpriseVideoPlaying, setIsEnterpriseVideoPlaying] = useState(false);

  const handleEnterprisePlayClick = () => {
    setIsEnterpriseVideoPlaying(true);
  };

  return (
    <section className="bg-white w-full py-28 px-4 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-[40px_80px] items-center animate-fade-in">
          <div className="flex-1 relative min-h-[640px] overflow-hidden rounded-2xl shadow-lg">
            {isEnterpriseVideoPlaying ? (
              <video
                className="absolute h-full w-full object-cover"
                autoPlay
                controls
                playsInline
              >
                <source 
                  src="https://res.cloudinary.com/dmurwxefk/video/upload/v1740257059/hackathon_video_i41zng.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <img
                  loading="lazy"
                  src="/lovable-uploads/30823178-8899-45a8-926c-27e36528d3dc.png"
                  className="absolute h-full w-full object-cover"
                  alt="Enterprise video thumbnail"
                />
                <button
                  onClick={handleEnterprisePlayClick}
                  className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
                >
                  <Play className="w-8 h-8 text-white" />
                </button>
              </>
            )}
          </div>

          <div className="flex-1 space-y-6 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900">
              Empowering Enterprises with Advanced Solutions
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Discover how our cutting-edge technology solutions are transforming businesses worldwide. Our enterprise-grade platform combines powerful analytics, AI-driven insights, and seamless integration capabilities to help organizations achieve their digital transformation goals.
            </p>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Advanced Analytics and Reporting
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Seamless Integration Capabilities
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Enterprise-Grade Security
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
