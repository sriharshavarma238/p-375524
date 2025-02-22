import React from "react";
import { Logo } from "@/components/ui/Logo";

export const Footer = () => {
  return (
    <footer className="bg-white w-full px-4 md:px-16 py-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center max-w-[493px] mx-auto">
          <Logo />

          <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm font-semibold text-black">
            <a href="#" className="hover:text-gray-600 transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Our Services
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Contact Us
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Blog Insights
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Get Started
            </a>
          </div>
        </div>

        <div className="mt-20">
          <div className="border-t border-black"></div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm">
            <div className="text-black">
              © 2024 Relume. All rights reserved.
            </div>
            <div className="flex gap-6 text-black mt-4 md:mt-0">
              <a
                href="#"
                className="underline hover:text-gray-600 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="underline hover:text-gray-600 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="underline hover:text-gray-600 transition-colors"
              >
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
