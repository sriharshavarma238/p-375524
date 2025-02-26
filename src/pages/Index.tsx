
import React, { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Testimonial } from "@/components/sections/Testimonial";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/layout/Footer";
import { ChatSupport } from "@/components/chat/ChatSupport";
import { RealTimeAnalytics } from "@/components/sections/RealTimeAnalytics";
import { AnimatedBackground } from "@/components/sections/AnimatedBackground";
import { ProfilePicture } from "@/components/ui/ProfilePicture";
import { motion } from "framer-motion";

const Index = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const elements = document.querySelectorAll('.scroll-animation');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleProfileUpload = (url: string) => {
    console.log("Profile picture uploaded:", url);
    // Handle the profile picture update here
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen flex flex-col overflow-x-hidden relative bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#000000]"
    >
      <AnimatedBackground />
      
      <header className="sticky top-0 z-50 glass-morphism">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Navbar />
          <div className="py-2">
            <ProfilePicture
              size="sm"
              onUpload={handleProfileUpload}
              className="animate-float"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <motion.section 
          id="home"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="scroll-animation"
        >
          <Hero />
        </motion.section>

        <motion.section 
          id="features"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="scroll-animation"
        >
          <Features />
        </motion.section>

        <motion.section 
          id="solutions" 
          className="bg-gradient-to-b from-[#1a1a1a] to-[#000000] w-[100vw] py-28 px-4 md:px-16 scroll-animation"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-gradient">Our Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-morphism rounded-lg p-6 hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-4 text-white">Enterprise Analytics</h3>
                <p className="text-gray-300 mb-4">
                  Advanced analytics solutions tailored for enterprise-scale operations.
                </p>
                <ul className="list-disc list-inside text-gray-400">
                  <li>Real-time data processing</li>
                  <li>Custom reporting dashboards</li>
                  <li>Predictive analytics</li>
                </ul>
              </div>

              <div className="glass-morphism rounded-lg p-6 hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-4 text-white">AI Integration</h3>
                <p className="text-gray-300 mb-4">
                  Seamless AI integration solutions that enhance your existing systems.
                </p>
                <ul className="list-disc list-inside text-gray-400">
                  <li>Machine learning models</li>
                  <li>Natural language processing</li>
                  <li>Automated decision making</li>
                </ul>
              </div>

              <div className="glass-morphism rounded-lg p-6 hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-4 text-white">Security & Compliance</h3>
                <p className="text-gray-300 mb-4">
                  Comprehensive security solutions ensuring your data protection.
                </p>
                <ul className="list-disc list-inside text-gray-400">
                  <li>End-to-end encryption</li>
                  <li>Regulatory compliance</li>
                  <li>24/7 monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <RealTimeAnalytics />

        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="scroll-animation"
        >
          <Testimonial />
        </motion.section>

        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="scroll-animation"
        >
          <CallToAction />
        </motion.section>
      </main>

      <Footer />
      <ChatSupport />
    </motion.div>
  );
};

export default Index;
