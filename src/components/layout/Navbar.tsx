import React, { useState, useEffect } from "react";
import { Logo } from "@/components/ui/Logo";
import { ActionButton } from "@/components/ui/ActionButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Link, useLocation } from "react-router-dom";
import { scrollToSection } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isOverHeroSection, setIsOverHeroSection] = useState(true);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    company: ""
  });
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.elementsFromPoint(
        window.innerWidth / 2,
        70
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

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/?section=${sectionId}`;
    } else {
      scrollToSection(sectionId);
      setIsMenuOpen(false);
    }
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

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSignInError(false);

    try {
      const isValidUser = false;
      
      if (!isValidUser) {
        setSignInError(true);
        toast({
          title: "Sign In Failed",
          description: "Account not found. Please sign up if you're new here.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const textColorClass = isOverHeroSection ? 'text-white' : 'text-gray-800';

  return (
    <>
      <nav 
        className="fixed w-full max-w-[1440px] px-4 md:px-16 h-[72px] flex items-center justify-between top-0 z-50 transition-colors duration-300 bg-transparent"
      >
        <div className="flex items-center gap-8 w-full justify-between md:justify-start">
          <Link to="/" className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-base">
            <button 
              onClick={() => handleNavigation('home')}
              className={`relative group ${textColorClass} transition-all duration-300 ease-in-out`}
            >
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
            <button 
              onClick={() => handleNavigation('features')}
              className={`relative group ${textColorClass} transition-all duration-300 ease-in-out`}
            >
              <span className="relative z-10">Features</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
            <button 
              onClick={() => handleNavigation('solutions')}
              className={`relative group ${textColorClass} transition-all duration-300 ease-in-out`}
            >
              <span className="relative z-10">Solutions</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
            <div className="relative">
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className={`flex items-center gap-1 group ${textColorClass} transition-all duration-300 ease-in-out`}
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
              </button>
              {isResourcesOpen && (
                <div className="absolute w-48 bg-white shadow-lg mt-2 py-2 rounded-md animate-fade-in">
                  <Link 
                    to="/blog"
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Blog
                  </Link>
                  <Link 
                    to="/pricing"
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 ml-auto">
            <ActionButton 
              onClick={() => setIsSignInOpen(true)}
              variant="secondary"
              className={`${textColorClass} border-current hover:bg-white/10`}
            >
              Sign In
            </ActionButton>
            <div className="flex items-center gap-2">
              <ActionButton 
                onClick={() => handleGetStarted()}
                className="transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
              >
                Get Started
              </ActionButton>
              <ActionButton 
                onClick={() => handleNavigation('home')}
                variant="secondary"
                className="text-white border-white hover:bg-white/10"
              >
                Request a Demo
              </ActionButton>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button
                className={`md:hidden ${textColorClass}`}
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
                  onClick={() => handleNavigation('hero')}
                  className="text-lg text-left py-2 hover:text-gray-600 transition-colors duration-200"
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNavigation('features')}
                  className="text-lg text-left py-2 hover:text-gray-600 transition-colors duration-200"
                >
                  Features
                </button>
                <button 
                  onClick={() => handleNavigation('solutions')}
                  className="text-lg text-left py-2 hover:text-gray-600 transition-colors duration-200"
                >
                  Solutions
                </button>
                <Link 
                  to="/blog"
                  className="text-lg text-left py-2 hover:text-gray-600 transition-colors duration-200"
                >
                  Blog
                </Link>
                <Link 
                  to="/pricing"
                  className="text-lg text-left py-2 hover:text-gray-600 transition-colors duration-200"
                >
                  Pricing
                </Link>
                <ActionButton 
                  onClick={handleGetStarted}
                  className="w-full mt-4 transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </ActionButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <DialogContent className={cn(
          "sm:max-w-[425px] transition-all duration-300",
          signInError && "animate-shake"
        )}>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignInSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                name="email"
                type="email"
                value={signInData.email}
                onChange={handleSignInInputChange}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                id="signin-password"
                name="password"
                type="password"
                value={signInData.password}
                onChange={handleSignInInputChange}
                placeholder="Enter your password"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col gap-2">
              <ActionButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing In..." : "Sign In"}
              </ActionButton>
              {signInError && (
                <div className="text-center">
                  <p className="text-sm text-red-500 mb-2">Account not found</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignInOpen(false);
                      setIsSignUpOpen(true);
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Sign Up Instead
                  </button>
                </div>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>

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
