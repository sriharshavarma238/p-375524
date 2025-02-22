
import React, { useState } from "react";
import { Play } from "lucide-react";

export const Testimonial = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnterpriseVideoPlaying, setIsEnterpriseVideoPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleEnterprisePlayClick = () => {
    setIsEnterpriseVideoPlaying(true);
  };

  return (
    <section className="bg-white w-full py-28 px-4 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Client Testimonial Section */}
        <div className="flex flex-col md:flex-row gap-[40px_80px] items-center mb-32 animate-fade-in">
          <div className="flex-1 relative min-h-[640px] overflow-hidden rounded-2xl shadow-lg">
            {isPlaying ? (
              <video
                className="absolute h-full w-full object-cover"
                autoPlay
                controls
                playsInline
              >
                <source 
                  src="https://cdn.builder.io/o/assets%2Fpages%2F62f28e6fbf0784c64f93725d%2Fvideos%2F63ea31a9deed38e6aa0b0aad_video_1.mp4?apiKey=99f09873d7dd4ddcb35f7bed72e0718c&token=63ea31a9deed38e6aa0b0aad&alt=media" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/7c8bec7f05b70a10ee71ee79813ed5dc50d4a322df4224d3fe14612c0c4266eb?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/7c8bec7f05b70a10ee71ee79813ed5dc50d4a322df4224d3fe14612c0c4266eb?placeholderIfAbsent=true&width=2000 2000w"
                  className="absolute h-full w-full object-cover"
                  alt="Testimonial background"
                />
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
                >
                  <Play className="w-8 h-8 text-white" />
                </button>
              </>
            )}
          </div>

          <div className="flex-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/c1bdeb898abc169346ab6daf7af07100bab9963e6d4253b3cc769ab4473eff46?placeholderIfAbsent=true"
                  className="w-5 h-5"
                  alt="Star rating"
                />
              ))}
            </div>

            <blockquote className="text-2xl font-bold leading-[34px] mt-8">
              "Our partnership with Quantum AI transformed our approach to
              market expansion, enabling us to outpace our competitors
              effortlessly."
            </blockquote>

            <div className="flex items-center gap-5 mt-8">
              <div>
                <div className="font-semibold">John Doe</div>
                <div className="font-normal">CEO, Tech Innovations</div>
              </div>
              <div className="border-l border-black h-[61px]"></div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/f7e8bc504329a6bc82554553ee1c44638d92214fdca96068ed3880bd5d0aa1cb?placeholderIfabsent=true"
                className="h-[61px] object-contain"
                alt="Company logo"
              />
            </div>
          </div>
        </div>

        {/* Enterprise Video Section */}
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
                  src="/lovable-uploads/30823178-8899-45a8-926c-27e36528d3dc.png" 
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
