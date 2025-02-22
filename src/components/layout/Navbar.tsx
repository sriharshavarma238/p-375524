import React, { useState, useEffect } from "react";
import { Logo } from "@/components/ui/Logo";
import { ActionButton } from "@/components/ui/ActionButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isOverHeroSection, setIsOverHeroSection] = useState(true);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    company: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.elementsFromPoint(
        window.innerWidth / 2,
        70 // Navbar height + small offset
      );
      
      const isHero = elements.some(element => {
        const isHeroSection = (el: Element): boolean => {
          if (!el) return false;
          if (el.tagName.toLowerCase() === 'section' && el.querySelector('h1')?.textContent?.includes('Scaling Enterprises')) {
            return true;
          }
          return el.parentElement ? isHeroSection(el.parentElement) : false;
        };
        return isHeroSection(element);
      });
      
      setIsOverHeroSection(isHero);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    setIsSignUpOpen(true);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password.length < 8) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Sending verification email to:", formData.email);
      const { data, error } = await supabase.functions.invoke('send-verification', {
        body: {
          name: formData.name,
          email: formData.email,
        }
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      console.log("Verification email response:", data);
      
      toast({
        title: "Verification Email Sent",
        description: `We've sent a verification email to ${formData.email}. Please check your inbox.`,
      });
      
      setIsSignUpOpen(false);
      setFormData({ email: "", name: "", password: "", company: "" });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const textColorClass = isOverHeroSection ? 'text-white' : 'text-gray-800';

  return (
    <>
      <nav className="fixed w-full max-w-[1440px] px-4 md:px-16 h-[72px] flex items-center justify-between top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ActionButton
            variant="secondary"
            onClick={handleGetStarted}
            className="hidden md:block"
          >
            Get Started
          </ActionButton>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2 md:hidden">
                <span className="sr-only">Open menu</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 18H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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

      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create an Account</DialogTitle>
            <DialogDescription>
              Fill in your details to create your account and get started. You'll receive a verification email shortly.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignUpSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                minLength={8}
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Acme Inc."
                required
                disabled={isSubmitting}
              />
            </div>
            <ActionButton type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </ActionButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
