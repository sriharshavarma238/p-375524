
import React from "react";
import { Logo } from "@/components/ui/Logo";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { scrollToSection } from "@/utils/scrollUtils";

export const Footer = () => {
  const navigate = useNavigate();
  const [dialogContent, setDialogContent] = React.useState<{
    title: string;
    content: string;
  } | null>(null);

  const handleNavigation = (section: string) => {
    switch (section) {
      case "blog":
        navigate("/blog");
        break;
      case "get-started":
        scrollToSection("home");
        break;
      case "about":
        setDialogContent({
          title: "About Us",
          content: "We are a cutting-edge enterprise solutions provider specializing in AI-driven analytics and business intelligence. Our mission is to empower organizations with data-driven insights that drive growth and innovation. With years of expertise in quantum computing and artificial intelligence, we help businesses transform their operations and stay ahead in the digital age."
        });
        break;
      case "services":
        setDialogContent({
          title: "Our Services",
          content: "Our comprehensive suite of services includes:\n\n• Enterprise Analytics Solutions\n• AI Integration Services\n• Data Security & Compliance\n• Business Intelligence Consulting\n• Digital Transformation Strategy\n• Custom Software Development\n• Cloud Infrastructure Optimization\n\nEach service is tailored to meet your specific business needs and objectives."
        });
        break;
      case "contact":
        setDialogContent({
          title: "Contact Us",
          content: "Get in touch with our team:\n\n• Email: enterprise@company.com\n• Phone: +1 (555) 123-4567\n• Hours: Monday - Friday, 9:00 AM - 6:00 PM EST\n\nFor immediate assistance, you can also use our chat support or schedule a consultation through the pricing page."
        });
        break;
      case "privacy":
        setDialogContent({
          title: "Privacy Policy",
          content: "Last Updated: March 2024\n\nYour privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information:\n\n• Data Collection: We collect information you provide directly to us and data about your usage of our services\n\n• Data Usage: Your information helps us provide and improve our services, communicate with you, and enhance security\n\n• Data Protection: We implement industry-standard security measures to protect your personal information\n\n• Your Rights: You have the right to access, correct, or delete your personal information\n\n• Cookies: We use cookies to improve your experience and analyze website traffic\n\nFor detailed information about our privacy practices, please contact our Data Protection Officer."
        });
        break;
      case "terms":
        setDialogContent({
          title: "Terms of Service",
          content: "Last Updated: March 2024\n\nBy using our services, you agree to these terms:\n\n1. Account Responsibilities\n• Maintain accurate account information\n• Protect your account credentials\n• Notify us of any unauthorized access\n\n2. Acceptable Use\n• Follow all applicable laws and regulations\n• Respect intellectual property rights\n• Don't misuse our services\n\n3. Service Availability\n• We strive for 99.9% uptime\n• Scheduled maintenance will be announced\n• No guarantee of uninterrupted service\n\n4. Termination\n• We may suspend or terminate accounts\n• You can cancel your account anytime\n\n5. Liability\n• Services provided 'as-is'\n• Limited liability for damages\n\nContact legal@company.com for questions."
        });
        break;
      case "cookies":
        setDialogContent({
          title: "Cookie Settings",
          content: "Cookie Preferences\n\nWe use cookies to enhance your experience:\n\n1. Essential Cookies (Required)\n• Authentication\n• Security\n• Basic functionality\n\n2. Analytics Cookies (Optional)\n• Usage patterns\n• Performance monitoring\n• Error tracking\n\n3. Marketing Cookies (Optional)\n• Personalized content\n• Advertisement targeting\n\n4. Preference Cookies (Optional)\n• Remember settings\n• Language preferences\n\nYou can manage cookie preferences in your browser settings at any time. Essential cookies cannot be disabled as they are required for basic site functionality."
        });
        break;
    }
  };

  return (
    <footer className="bg-white w-full px-4 md:px-16 py-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center max-w-[493px] mx-auto">
          <Logo />

          <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm font-semibold text-black">
            <button 
              onClick={() => handleNavigation("about")}
              className="hover:text-gray-600 transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavigation("services")}
              className="hover:text-gray-600 transition-colors"
            >
              Our Services
            </button>
            <button 
              onClick={() => handleNavigation("contact")}
              className="hover:text-gray-600 transition-colors"
            >
              Contact Us
            </button>
            <button 
              onClick={() => handleNavigation("blog")}
              className="hover:text-gray-600 transition-colors"
            >
              Blog Insights
            </button>
            <button 
              onClick={() => handleNavigation("get-started")}
              className="hover:text-gray-600 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="mt-20">
          <div className="border-t border-black"></div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm">
            <div className="text-black">
              © 2024 Relume. All rights reserved.
            </div>
            <div className="flex gap-6 text-black mt-4 md:mt-0">
              <button
                onClick={() => handleNavigation("privacy")}
                className="underline hover:text-gray-600 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNavigation("terms")}
                className="underline hover:text-gray-600 transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => handleNavigation("cookies")}
                className="underline hover:text-gray-600 transition-colors"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!dialogContent} onOpenChange={() => setDialogContent(null)}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-4">{dialogContent?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-2 text-gray-600 whitespace-pre-wrap">
            {dialogContent?.content}
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};
