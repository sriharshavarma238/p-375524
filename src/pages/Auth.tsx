
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';

export const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleLoginError = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', formData.email); // Debug log
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(), // Trim whitespace
        password: formData.password,
      });

      console.log('Login response:', { data, error }); // Debug log

      if (error) {
        handleLoginError();
        console.error('Login error:', error); // Debug log
        
        if (error.message.includes('Invalid login credentials')) {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Please make sure your email and password are correct. If you just signed up, try logging in with the exact same email you used.",
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            variant: "destructive",
            title: "Email not verified",
            description: "Please check your email and click the verification link to complete signup.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: error.message,
          });
        }
        return;
      }

      if (data?.session) {
        console.log('Login successful, session created'); // Debug log
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/');
      } else {
        console.log('No session created after successful login'); // Debug log
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Unable to create session. Please try again.",
        });
      }
    } catch (error: any) {
      console.error('Unexpected error during login:', error); // Debug log
      handleLoginError();
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting signup with:', formData.email); // Debug log
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(), // Trim whitespace
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            company_name: formData.company,
          },
        },
      });

      console.log('Signup response:', { data, error }); // Debug log

      if (error) {
        handleLoginError();
        throw error;
      }

      // Check if the signup was successful
      if (data?.user) {
        toast({
          title: "Account created successfully!",
          description: "You can now log in with your email and password.",
        });
        // Switch to login tab after successful signup
        const loginTrigger = document.querySelector('[value="login"]') as HTMLButtonElement;
        if (loginTrigger) {
          loginTrigger.click();
        }
      }
    } catch (error: any) {
      console.error('Signup error:', error); // Debug log
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full space-y-8 ${shake ? 'animate-shake' : ''}`}>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome
          </h2>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm
              email={formData.email}
              password={formData.password}
              isLoading={isLoading}
              onEmailChange={updateFormData('email')}
              onPasswordChange={updateFormData('password')}
              onSubmit={handleLogin}
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupForm
              email={formData.email}
              password={formData.password}
              name={formData.name}
              company={formData.company}
              isLoading={isLoading}
              onEmailChange={updateFormData('email')}
              onPasswordChange={updateFormData('password')}
              onNameChange={updateFormData('name')}
              onCompanyChange={updateFormData('company')}
              onSubmit={handleSignUp}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
