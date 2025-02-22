import React, { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ActionButton } from "@/components/ui/ActionButton";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white w-full max-w-[1440px] px-4 md:px-16 h-[72px] flex items-center justify-between">
      <div className="flex items-center gap-8 w-full justify-between md:justify-start">
        <div className="flex-shrink-0">
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-8 text-base text-black">
          <a href="#" className="hover:text-gray-600 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Features
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Solutions
          </a>
          <div className="relative group">
            <button
              className="flex items-center gap-1 hover:text-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Resources
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg mt-2 py-2 rounded-md">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Blog
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Pricing
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <ActionButton>Get Started</ActionButton>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white shadow-lg md:hidden z-50">
          <div className="px-4 py-2">
            <a href="#" className="block py-3 text-lg text-center">
              Home
            </a>
            <a href="#" className="block py-3 text-lg text-center">
              Features
            </a>
            <a href="#" className="block py-3 text-lg text-center">
              Solutions
            </a>
            <a href="#" className="block py-3 text-lg text-center">
              Blog
            </a>
            <a href="#" className="block py-3 text-lg text-center">
              Pricing
            </a>
            <a href="#" className="block py-3 text-lg text-center">
              Contact Us
            </a>
            <div className="py-3">
              <ActionButton className="w-full">Get Started</ActionButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
