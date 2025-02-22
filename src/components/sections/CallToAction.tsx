import React from "react";
import { ActionButton } from "@/components/ui/ActionButton";

export const CallToAction = () => {
  return (
    <section className="bg-white w-full py-28 px-4 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-[768px]">
            <h2 className="text-[40px] font-bold leading-[1.2] text-black">
              Unlock Your Business Potential
            </h2>
            <p className="text-lg font-normal mt-6 text-black">
              Harness Quantum AI for Unmatched Growth and Innovation
            </p>
          </div>

          <div className="flex gap-4">
            <ActionButton variant="primary">Get Started</ActionButton>
            <ActionButton variant="secondary">Request a Demo</ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
};
