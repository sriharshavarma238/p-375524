
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
              <a
                href="#"
                className="underline hover:text-gray-600 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="underline hover:text-gray-600 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="underline hover:text-gray-600 transition-colors"
              >
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!dialogContent} onOpenChange={() => setDialogContent(null)}>
        <DialogContent>
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
