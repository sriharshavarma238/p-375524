import React, { useState, useEffect } from "react";
import { Logo } from "@/components/ui/Logo";
import { ActionButton } from "@/components/ui/ActionButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav 
      className={`fixed w-full max-w-[1440px] px-4 md:px-16 h-[72px] flex items-center justify-between top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-8 w-full justify-between md:justify-start">
        <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200">
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-8 text-base">
          <button 
            onClick={handleHome}
            className={`relative group ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          >
            <span className="relative z-10">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
          <button 
            onClick={() => scrollToSection("features")}
            className={`relative group ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          >
            <span className="relative z-10">Features</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
          <button 
            onClick={() => scrollToSection("solutions")}
            className={`relative group ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          >
            <span className="relative z-10">Solutions</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
          <div className="relative">
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className={`flex items-center gap-1 group ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              <span className="relative z-10">Resources</span>
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isResourcesOpen ? 'rotate-180' : ''
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
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
            {isResourcesOpen && (
              <div className="absolute w-48 bg-white shadow-lg mt-2 py-2 rounded-md animate-fade-in">
                <button 
                  onClick={() => scrollToSection("blog")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                >
                  Blog
                </button>
                <button 
                  onClick={() => scrollToSection("pricing")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                >
                  Contact Us
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <ActionButton 
            onClick={handleGetStarted}
            className="transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
          >
            Get Started
          </ActionButton>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}
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
