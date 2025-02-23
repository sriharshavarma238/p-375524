
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
      // First, check if the user exists
      const { data: userExists } = await supabase
        .from('auth.users')
        .select('confirmed_at')
        .eq('email', formData.email)
        .single();

      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        handleLoginError();
        
        // Provide more specific error messages
        if (error.message.includes('Invalid login credentials')) {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "The email or password you entered is incorrect. Please try again.",
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

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            company_name: formData.company,
          },
        },
      });

      if (error) {
        handleLoginError();
        throw error;
      }

      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
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
