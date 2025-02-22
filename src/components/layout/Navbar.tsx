
import React, { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ActionButton } from "@/components/ui/ActionButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "Get Started",
      description: "Welcome! Let's begin your journey with us.",
    });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="bg-transparent w-full max-w-[1440px] px-4 md:px-16 h-[72px] flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center gap-8 w-full justify-between md:justify-start">
        <div className="flex-shrink-0">
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-8 text-base text-black">
          <button 
            onClick={handleHome}
            className="hover:text-gray-600 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("features")}
            className="hover:text-gray-600 transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection("solutions")}
            className="hover:text-gray-600 transition-colors"
          >
            Solutions
          </button>
          <div className="relative">
            <button
              className="flex items-center gap-1 hover:text-gray-600 transition-colors"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              Resources
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  isResourcesOpen ? "rotate-180" : ""
                }`}
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
            {isResourcesOpen && (
              <div className="absolute w-48 bg-white shadow-lg mt-2 py-2 rounded-md">
                <button 
                  onClick={() => scrollToSection("blog")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Blog
                </button>
                <button 
                  onClick={() => scrollToSection("pricing")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Contact Us
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <ActionButton onClick={handleGetStarted}>Get Started</ActionButton>
        </div>

        <Sheet>
          <SheetTrigger asChild>
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
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 pt-8">
              <button 
                onClick={handleHome}
                className="text-lg text-left py-2 hover:text-gray-600"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("features")}
                className="text-lg text-left py-2 hover:text-gray-600"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection("solutions")}
                className="text-lg text-left py-2 hover:text-gray-600"
              >
                Solutions
              </button>
              <button 
                onClick={() => scrollToSection("blog")}
                className="text-lg text-left py-2 hover:text-gray-600"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection("pricing")}
                className="text-lg text-left py-2 hover:text-gray-600"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-lg text-left py-2 hover:text-gray-600"
              >
                Contact Us
              </button>
              <ActionButton 
                onClick={handleGetStarted}
                className="w-full mt-4"
              >
                Get Started
              </ActionButton>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
