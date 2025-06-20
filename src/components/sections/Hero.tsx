import React, { useState } from "react";
import { ActionButton } from "@/components/ui/ActionButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Hero = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phoneNumber: "",
    companySize: "",
    businessChallenge: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from('demo_requests')
        .insert([{
            company_name: formData.companyName,
            contact_name: formData.contactName,
            email: formData.email,
            phone_number: formData.phoneNumber,
            company_size: formData.companySize,
            business_challenge: formData.businessChallenge
          }] as any);

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke('send-demo-confirmation', {
        body: {
          companyName: formData.companyName,
          contactName: formData.contactName,
          email: formData.email,
          companySize: formData.companySize,
        },
      });

      if (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }
      
      toast({
        title: "Demo Request Received",
        description: "We'll get back to you within 24 hours to schedule your demo. Please check your email for confirmation.",
        duration: 5000,
      });
      
      setIsDemoModalOpen(false);
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phoneNumber: "",
        companySize: "",
        businessChallenge: ""
      });
    } catch (error) {
      console.error("Error submitting demo request:", error);
      toast({
        title: "Error",
        description: "Failed to submit demo request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[900px] w-[100vw] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="/lovable-uploads/e261233a-cfd3-4dad-843e-52936cd3d3c9.png"
          />
          <source 
            media="(min-width: 769px)" 
            srcSet="/lovable-uploads/624f1b55-9dc7-4ac0-9031-726c2204db25.png"
          />
          <img
            loading="lazy"
            src="/lovable-uploads/624f1b55-9dc7-4ac0-9031-726c2204db25.png"
            className="w-full h-full object-cover [image-rendering:pixelated] scale-[1.01]"
            alt="City skyline view"
          />
        </picture>
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          style={{
            backdropFilter: 'contrast(1.2) brightness(0.8)'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[768px] mx-auto px-4 md:px-6 text-center">
        <h1 className="text-[#FFEA00] text-[56px] font-bold leading-[67px] md:leading-[67px] max-md:text-[40px] max-md:leading-[54px]">
          Scaling Enterprises at the Speed of Thought
        </h1>

        <p className="text-[#00F6FF] text-lg font-normal leading-[27px] mt-6">
          Unlock the potential of Quantum AI-driven insights to propel your
          business into new markets. Stay ahead of the competition with
          data-backed strategies designed for rapid expansion.
        </p>

        <div className="flex justify-center mt-8">
          <ActionButton
            variant="secondary"
            className="text-white border-white hover:bg-white/10"
            onClick={() => setIsDemoModalOpen(true)}
            disabled={isSubmitting}
          >
            Request a Demo
          </ActionButton>
        </div>
      </div>

      <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">Request a Demo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDemoRequest} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name*</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  required
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name*</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  required
                  placeholder="Enter your full name"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Business Email*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number*</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size*</Label>
              <Input
                id="companySize"
                name="companySize"
                required
                placeholder="Number of employees"
                value={formData.companySize}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessChallenge">What's your biggest business challenge right now?*</Label>
              <textarea
                id="businessChallenge"
                name="businessChallenge"
                required
                className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tell us about the challenges you're facing..."
                value={formData.businessChallenge}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <ActionButton
                type="button"
                variant="secondary"
                onClick={() => setIsDemoModalOpen(false)}
                className="bg-gray-100 hover:bg-gray-200"
                disabled={isSubmitting}
              >
                Cancel
              </ActionButton>
              <ActionButton
                type="submit"
                variant="primary"
                className="bg-black text-white hover:bg-gray-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </ActionButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
