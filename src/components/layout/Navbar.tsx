
import React, { useState, useEffect, useRef } from "react";
import { Logo } from "@/components/ui/Logo";
import { ActionButton } from "@/components/ui/ActionButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "@/utils/scrollUtils";
import { UserCircle, Loader, Camera, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserProfileMenu } from "@/components/ui/UserProfileMenu";
import { ProfilePicture } from "@/components/ui/ProfilePicture";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isOverHeroSection, setIsOverHeroSection] = useState(true);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileUrl, setProfileUrl] = useState<string | undefined>(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    company: ""
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    // Try to load the profile picture from storage on component mount
    const savedProfileUrl = localStorage.getItem('profilePicture');
    if (savedProfileUrl) {
      setProfileUrl(savedProfileUrl);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        // If user has a profile picture in their metadata, use it
        if (session.user.user_metadata?.avatar_url) {
          setProfileUrl(session.user.user_metadata.avatar_url);
        }
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        // If user has a profile picture in their metadata, use it
        if (session.user.user_metadata?.avatar_url) {
          setProfileUrl(session.user.user_metadata.avatar_url);
        }
      } else {
        setUser(null);
        setProfileUrl(undefined);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.elementsFromPoint(window.innerWidth / 2, 70);
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

  const handleProfileUpload = async (url: string) => {
    setProfileUrl(url);
    localStorage.setItem('profilePicture', url);
    
    // If user is logged in, update their profile in Supabase
    if (user) {
      try {
        const { error } = await supabase.auth.updateUser({
          data: { 
            ...user.user_metadata,
            avatar_url: url 
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Profile updated",
          description: "Your profile picture has been updated successfully."
        });
      } catch (error: any) {
        toast({
          title: "Update failed",
          description: error.message || "Failed to update profile picture",
          variant: "destructive"
        });
      }
    }
  };

  const handleGetStarted = () => {
    setIsSignUpOpen(true);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Clear profile picture from local storage
      localStorage.removeItem('profilePicture');
      setProfileUrl(undefined);
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again.",
      });
    }
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
      const {
        data: signUpData,
        error: signUpError
      } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            company_name: formData.company
          }
        }
      });
      if (signUpError) {
        throw signUpError;
      }
      if (signUpData.user) {
        toast({
          title: "Account Created Successfully",
          description: "Please check your email for verification link."
        });
        setIsSignUpOpen(false);
        setFormData({
          email: "",
          name: "",
          password: "",
          company: ""
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(false);
    try {
      const {
        error,
        data
      } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
      });
      if (error) {
        setLoginError(true);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "This account doesn't exist or the credentials are incorrect."
        });
        return;
      }
      
      // Check if user has a profile picture
      if (data?.user?.user_metadata?.avatar_url) {
        setProfileUrl(data.user.user_metadata.avatar_url);
        localStorage.setItem('profilePicture', data.user.user_metadata.avatar_url);
      }
      
      setShowLoginModal(false);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in."
      });
    } catch (error: any) {
      setLoginError(true);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const textColorClass = isOverHeroSection ? 'text-white' : 'text-gray-800';

  return <>
    <nav className="fixed w-full max-w-[1440px] px-4 md:px-16 h-[72px] flex items-center justify-between top-0 z-50 transition-colors duration-300 bg-transparent">
      <div className="flex items-center gap-8 w-full justify-between md:justify-start">
        <Link to="/" className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-base">
          <button onClick={() => handleNavigation('home')} className={`relative group ${textColorClass} transition-all duration-300 ease-in-out`}>
            <span className="relative z-10">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
          <button onClick={() => handleNavigation('features')} className={`relative group ${textColorClass} transition-all duration-300 ease-in-out`}>
            <span className="relative z-10">Features</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
          <button onClick={() => handleNavigation('solutions')} className={`relative group ${textColorClass} transition-all duration-300 ease-in-out`}>
            <span className="relative z-10">Solutions</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
          <div className="relative">
            <button onClick={() => setIsResourcesOpen(!isResourcesOpen)} className={`flex items-center gap-1 group ${textColorClass} transition-all duration-300 ease-in-out`}>
              <span className="relative z-10">Resources</span>
              <svg className={`w-4 h-4 transform transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isResourcesOpen && <div className="absolute w-48 bg-white shadow-lg mt-2 py-2 rounded-md animate-fade-in">
                <Link to="/blog" className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200">
                  Blog
                </Link>
                <Link to="/pricing" className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200">
                  Pricing
                </Link>
              </div>}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          {user ? (
            <div className="flex items-center">
              <UserProfileMenu 
                user={user}
                profileUrl={profileUrl}
                onProfileUpload={handleProfileUpload}
                textColorClass={isOverHeroSection ? 'text-white' : 'text-gray-900'}
                onLogout={handleLogout}
              />
            </div>
          ) : (
            <>
              <ActionButton onClick={() => setShowLoginModal(true)} variant="cyan" isDarkBg={isOverHeroSection} className="transform hover:scale-105 transition-all duration-200">
                Log in
              </ActionButton>
              <ActionButton onClick={handleGetStarted} className="transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
                Get Started
              </ActionButton>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button className={`md:hidden ${textColorClass}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 pt-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <button onClick={() => handleNavigation('hero')} className="text-lg text-left py-2 hover:text-gray-600 transition-colors duration-200">
                Home
              </button>
              <button onClick={() => handleNavigation('features')} className="text-lg text-left py-2 hover:text-gray-600 transition-colors duration-200">
                Features
              </button>
              <button onClick={() => handleNavigation('solutions')} className="text-lg text-left py-2 hover:text-gray-600 transition-colors duration-200">
                Solutions
              </button>
              <Link to="/blog" className="text-lg text-left py-2 hover:text-gray-600 transition-colors duration-200">
                Blog
              </Link>
              <Link to="/pricing" className="text-lg text-left py-2 hover:text-gray-600 transition-colors duration-200">
                Pricing
              </Link>
              {user ? (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <UserProfileMenu 
                    user={user}
                    profileUrl={profileUrl}
                    onProfileUpload={handleProfileUpload}
                    textColorClass="text-gray-900"
                    onLogout={handleLogout}
                    isMobile={true}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-4 mt-4">
                  <ActionButton onClick={handleGetStarted} className="w-full transform hover:scale-105 transition-all duration-200">
                    Get Started
                  </ActionButton>
                  <ActionButton 
                    onClick={() => setShowLoginModal(true)} 
                    variant="cyan"
                    className="w-full transform hover:scale-105 transition-all duration-200"
                  >
                    Log in
                  </ActionButton>
                </div>
              )}
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
            Fill in your details to create your account and get started.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSignUpSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required disabled={isSubmitting} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" required disabled={isSubmitting} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" required minLength={8} disabled={isSubmitting} />
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" name="company" value={formData.company} onChange={handleInputChange} placeholder="Acme Inc." required disabled={isSubmitting} />
          </div>
          <ActionButton type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </ActionButton>
        </form>
      </DialogContent>
    </Dialog>

    <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
      <DialogContent className={cn("sm:max-w-[425px] transition-transform duration-200", loginError && "animate-shake")}>
        <DialogHeader>
          <DialogTitle>Login to Your Account</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={loginData.email} onChange={e => setLoginData({
              ...loginData,
              email: e.target.value
            })} placeholder="Enter your email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={loginData.password} onChange={e => setLoginData({
              ...loginData,
              password: e.target.value
            })} placeholder="Enter your password" required />
          </div>

          <ActionButton type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? <div className="flex items-center gap-2 justify-center">
                <Loader className="h-4 w-4 animate-spin" />
                Logging in...
              </div> : 'Login'}
          </ActionButton>
        </form>
      </DialogContent>
    </Dialog>
  </>;
};
