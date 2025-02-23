
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
      const { error } = await supabase
        .from('demo_requests')
        .insert([
          {
            company_name: formData.companyName,
            contact_name: formData.contactName,
            email: formData.email,
            phone_number: formData.phoneNumber,
            company_size: formData.companySize,
            business_challenge: formData.businessChallenge
          }
        ]);

      if (error) throw error;
      
      // Show success message
      toast({
        title: "Demo Request Received",
        description: "We'll get back to you within 24 hours to schedule your demo.",
        duration: 5000,
      });
      
      // Close modal and reset form
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
    <section className="relative min-h-[900px] w-full flex items-center justify-center overflow-hidden">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/e18e13be738cbf10cd48d58b583f5a53f4c7a781a550c2587c827bcff17f5cf0?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/e18e13be738cbf10cd48d58b583f5a53f4c7a781a550c2587c827bcff17f5cf0?placeholderIfAbsent=true&width=2000 2000w"
        className="absolute h-full w-full object-cover inset-0"
        alt="Hero background"
      />

      <div className="relative z-10 max-w-[768px] mx-auto px-4 text-center">
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
