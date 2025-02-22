import React from "react";
import { ActionButton } from "@/components/ui/ActionButton";

export const Hero = () => {
  return (
    <section className="relative min-h-[900px] w-full flex items-center justify-center overflow-hidden">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/e18e13be738cbf10cd48d58b583f5a53f4c7a781a550c2587c827bcff17f5cf0?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/e18e13be738cbf10cd48d58b583f5a53f4c7a781a550c2587c827bcff17f5cf0?placeholderIfAbsent=true&width=2000 2000w"
        className="absolute h-full w-full object-cover inset-0"
        alt="Hero background"
      />

      <div className="relative z-10 max-w-[768px] mx-auto px-4 text-center">
        <h1 className="text-[#FFEA00] text-[56px] font-bold leading-[67px] md:leading-[67px] max-md:text-[40px] max-md:leading-[54px]">
          Scaling Enterprises at the Speed of Thought
        </h1>

        <p className="text-[#00F6FF] text-lg font-normal leading-[27px] mt-6">
          Unlock the potential of Quantum AI-driven insights to propel your
          business into new markets. Stay ahead of the competition with
          data-backed strategies designed for rapid expansion.
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <ActionButton
            variant="secondary"
            className="bg-white text-black border-white hover:bg-gray-100"
          >
            Get Started
          </ActionButton>
          <ActionButton
            variant="secondary"
            className="text-white border-white hover:bg-white/10"
          >
            Request a Demo
          </ActionButton>
        </div>
      </div>
    </section>
  );
};
