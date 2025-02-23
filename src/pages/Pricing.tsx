
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ActionButton } from "@/components/ui/ActionButton";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const Pricing = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  const handleSubscriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setIsLoading(selectedPlan);
    try {
      // Get the current authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('You must be logged in to subscribe');
      }

      // First, save subscription details to Supabase
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan_id: selectedPlan,
          customer_name: formData.name,
          email: formData.email,
          company_name: formData.company,
          status: 'pending'
        })
        .select()
        .single();

      if (subscriptionError) {
        console.error('Supabase error:', subscriptionError);
        throw new Error('Failed to save subscription details');
      }

      // Then create checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planId: selectedPlan,
          origin: window.location.origin,
          subscriptionId: subscriptionData.id,
          customerName: formData.name,
          customerEmail: formData.email
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      if (!data?.url) {
        console.error('No checkout URL in response:', data);
        throw new Error('No checkout URL received from server');
      }

      window.location.href = data.url;
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: error?.message || "Failed to initiate checkout. Please try again.",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleGetStarted = (planId: string) => {
    setSelectedPlan(planId);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedPlan(null);
    setFormData({
      name: "",
      email: "",
      company: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-1 pt-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that best fits your needs. All plans include core features with different usage limits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Starter</h3>
              <p className="text-3xl font-bold mb-4">$99<span className="text-gray-500 text-lg">/mo</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Basic Analytics
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  5 Users
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Basic Support
                </li>
              </ul>
              <ActionButton 
                className="w-full"
                onClick={() => handleGetStarted('starter')}
                disabled={isLoading === 'starter'}
              >
                {isLoading === 'starter' ? 'Loading...' : 'Get Started'}
              </ActionButton>
            </div>

            {/* Professional Plan */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Popular</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Professional</h3>
              <p className="text-3xl font-bold mb-4">$199<span className="text-gray-500 text-lg">/mo</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Advanced Analytics
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  20 Users
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Priority Support
                </li>
              </ul>
              <ActionButton 
                className="w-full bg-primary"
                onClick={() => handleGetStarted('professional')}
                disabled={isLoading === 'professional'}
              >
                {isLoading === 'professional' ? 'Loading...' : 'Get Started'}
              </ActionButton>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">Custom</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Custom Solutions
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited Users
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  24/7 Support
                </li>
              </ul>
              <ActionButton 
                className="w-full"
                onClick={() => window.location.href = 'mailto:sales@yourdomain.com'}
              >
                Contact Sales
              </ActionButton>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Subscription</DialogTitle>
            <DialogDescription>
              Please provide your details to continue with the subscription process.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubscriptionSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <DialogFooter>
              <ActionButton 
                type="submit" 
                variant="primary"
                disabled={isLoading === selectedPlan}
                className="w-full"
              >
                {isLoading === selectedPlan ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  'Continue to Payment'
                )}
              </ActionButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Pricing;
