
import React from "react";
import { ActionButton } from "@/components/ui/ActionButton";

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center bg-[#1A1A1A]">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="flex-1 space-y-8">
          <p className="text-primary text-xl font-medium">Secure your wealth</p>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Manage all your<br />
            money <span className="text-secondary">$</span> in one place.
          </h1>

          <p className="text-gray-400 text-lg max-w-lg">
            Our Personal Finance Product provides comprehensive money management tools to
            help you budget, save, and grow your wealth.
          </p>

          <div>
            <ActionButton
              variant="primary"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
            >
              Sign Up
            </ActionButton>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative w-full aspect-square">
            <div className="absolute inset-0 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-full w-full rounded-xl border border-gray-800 bg-gray-900/50"></div>
                <div className="h-32 w-full rounded-xl border border-gray-800 bg-gray-900/50"></div>
              </div>
              <div className="space-y-4 pt-16">
                <div className="h-32 w-full rounded-xl border border-gray-800 bg-gray-900/50">
                  <div className="p-4">
                    <div className="w-12 h-12 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="h-full w-full rounded-xl border border-gray-800 bg-gray-900/50">
                  <div className="p-4 flex justify-end">
                    <div className="w-24 h-24 rounded-xl bg-secondary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
