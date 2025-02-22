import React from "react";

export const Testimonial = () => {
  return (
    <section className="bg-white w-full py-28 px-4 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row gap-[40px_80px] items-center">
          <div className="flex-1 relative min-h-[640px] overflow-hidden">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/7c8bec7f05b70a10ee71ee79813ed5dc50d4a322df4224d3fe14612c0c4266eb?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/7c8bec7f05b70a10ee71ee79813ed5dc50d4a322df4224d3fe14612c0c4266eb?placeholderIfAbsent=true&width=2000 2000w"
              className="absolute h-full w-full object-cover"
              alt="Testimonial background"
            />
            <div className="relative h-full flex items-center justify-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/2c32cf666f8fcd7ef909b7161a8b44cf8029d362b4d8f605270db380a22244cb?placeholderIfAbsent=true"
                className="w-[100px] object-contain"
                alt="Testimonial icon"
              />
            </div>
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
                src="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/f7e8bc504329a6bc82554553ee1c44638d92214fdca96068ed3880bd5d0aa1cb?placeholderIfAbsent=true"
                className="h-[61px] object-contain"
                alt="Company logo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
