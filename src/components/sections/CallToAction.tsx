import React, { useState } from "react";
import { ActionButton } from "@/components/ui/ActionButton";
import { ArrowRight, Check, Calendar, Clock, Loader2, ArrowLeft, CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addDays, format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface TrialRegistration {
  user_id: string;
  name: string;
  email: string;
  company: string;
}

interface DemoRequest {
  contact_name: string;
  email: string;
  company_name: string;
  company_size: string;
  phone_number: string;
  business_challenge: string;
}

export const CallToAction = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [showTrialDialog, setShowTrialDialog] = useState(false);
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const [isSubmittingTrial, setIsSubmittingTrial] = useState(false);
  const [isSubmittingDemo, setIsSubmittingDemo] = useState(false);
  const [trialFormData, setTrialFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [demoFormData, setDemoFormData] = useState({
    name: "",
    email: "",
    company: "",
    companySize: "",
    phone: "",
    message: "",
    preferredDate: new Date(),
  });
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingDemo(true);

    try {
      const demoData: DemoRequest = {
        contact_name: demoFormData.name,
        email: demoFormData.email,
        company_name: demoFormData.company,
        company_size: demoFormData.companySize,
        phone_number: demoFormData.phone,
        business_challenge: demoFormData.message
      };

      const { error: demoError } = await supabase
        .from('demo_requests')
        .insert(demoData);

      if (demoError) {
        throw demoError;
      }

      toast({
        title: "Consultation Request Submitted! 🎉",
        description: "We'll get back to you shortly to schedule your consultation.",
      });
      
      setShowDemoDialog(false);
      setDemoFormData({
        name: "",
        email: "",
        company: "",
        companySize: "",
        phone: "",
        message: "",
        preferredDate: new Date(),
      });
    } catch (error: any) {
      console.error('Demo request error:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Failed to submit consultation request. Please try again.",
      });
    } finally {
      setIsSubmittingDemo(false);
    }
  };

  const handleTrialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTrial(true);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('You must be logged in to register for a trial');
      }

      const trialData: TrialRegistration = {
        user_id: user.id,
        name: trialFormData.name,
        email: trialFormData.email,
        company: trialFormData.company,
      };

      const { error: trialError } = await supabase
        .from('trial_registrations')
        .insert(trialData);

      if (trialError) {
        throw trialError;
      }

      toast({
        title: "Trial Registration Successful! 🎉",
        description: "You're all set to start your free trial.",
      });
      setShowTrialDialog(false);
      setTrialFormData({
        name: "",
        email: "",
        company: "",
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Trial registration error:', error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error?.message || "Failed to register for trial. Please try again.",
      });
    } finally {
      setIsSubmittingTrial(false);
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Ready to transform your business?
            </h2>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-300">
              Start your free trial today and see the impact. No credit card
              required.
            </p>
          </div>
          <div className="space-x-3">
            <ActionButton onClick={() => setShowTrialDialog(true)}>
              Start Free Trial
            </ActionButton>
            <ActionButton
              variant="secondary"
              onClick={() => setShowDemoDialog(true)}
            >
              Request a Consultation
            </ActionButton>
          </div>
        </div>
      </div>

      {/* Trial Registration Dialog */}
      <Dialog open={showTrialDialog} onOpenChange={setShowTrialDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Start Your Free Trial</DialogTitle>
            <DialogDescription>
              Enter your details to begin your free trial.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTrialSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                value={trialFormData.name}
                onChange={(e) =>
                  setTrialFormData({ ...trialFormData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                value={trialFormData.email}
                onChange={(e) =>
                  setTrialFormData({ ...trialFormData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Acme Corp"
                required
                value={trialFormData.company}
                onChange={(e) =>
                  setTrialFormData({ ...trialFormData, company: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <ActionButton
                type="submit"
                disabled={isSubmittingTrial}
                className="w-full"
              >
                {isSubmittingTrial ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Registering...
                  </div>
                ) : (
                  "Start Trial"
                )}
              </ActionButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Consultation Request Dialog */}
      <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request a Consultation</DialogTitle>
            <DialogDescription>
              Schedule a free consultation with one of our experts.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDemoSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                value={demoFormData.name}
                onChange={(e) =>
                  setDemoFormData({ ...demoFormData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                value={demoFormData.email}
                onChange={(e) =>
                  setDemoFormData({ ...demoFormData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Acme Corp"
                required
                value={demoFormData.company}
                onChange={(e) =>
                  setDemoFormData({ ...demoFormData, company: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Input
                id="companySize"
                placeholder="1-50"
                required
                value={demoFormData.companySize}
                onChange={(e) =>
                  setDemoFormData({
                    ...demoFormData,
                    companySize: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                required
                value={demoFormData.phone}
                onChange={(e) =>
                  setDemoFormData({ ...demoFormData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Business Challenge</Label>
              <Input
                id="message"
                placeholder="What challenges are you facing?"
                required
                value={demoFormData.message}
                onChange={(e) =>
                  setDemoFormData({ ...demoFormData, message: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <ActionButton
                type="submit"
                disabled={isSubmittingDemo}
                className="w-full"
              >
                {isSubmittingDemo ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  "Request Consultation"
                )}
              </ActionButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
