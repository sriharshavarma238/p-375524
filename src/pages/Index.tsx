
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Testimonial } from "@/components/sections/Testimonial";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/layout/Footer";
import { ChatSupport } from "@/components/chat/ChatSupport";
import { RealTimeAnalytics } from "@/components/sections/RealTimeAnalytics";
import { AnimatedBackground } from "@/components/sections/AnimatedBackground";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen flex flex-col overflow-x-hidden relative"
    >
      <AnimatedBackground />
      
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-1 relative z-10">
        <motion.section 
          id="home"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.section>

        <motion.section 
          id="features"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Features />
        </motion.section>

        <motion.section 
          id="solutions" 
          className="bg-white w-[100vw] py-28 px-4 md:px-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-4xl font-bold mb-12">Our Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-4">Enterprise Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Advanced analytics solutions tailored for enterprise-scale operations, 
                  providing deep insights into business performance and growth opportunities.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Real-time data processing</li>
                  <li>Custom reporting dashboards</li>
                  <li>Predictive analytics</li>
                </ul>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-4">AI Integration</h3>
                <p className="text-gray-600 mb-4">
                  Seamless AI integration solutions that enhance your existing systems 
                  with cutting-edge machine learning capabilities.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Machine learning models</li>
                  <li>Natural language processing</li>
                  <li>Automated decision making</li>
                </ul>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-4">Security & Compliance</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive security solutions ensuring your data and operations 
                  meet the highest standards of protection and compliance.
                </p>
                <ul className="list-disc list-inside text-gray-600">
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
        >
          <Testimonial />
        </motion.section>

        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
