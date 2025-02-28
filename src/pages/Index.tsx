
import React, { useEffect, useState } from "react";
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
  const [isOverHeroSection, setIsOverHeroSection] = useState(true);

  useEffect(() => {
    // Setup intersection observers for animations
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

    // Setup navbar color change on scroll
    const handleScroll = () => {
      const elements = document.elementsFromPoint(window.innerWidth / 2, 70);
      const isHero = elements.some(element => {
        const isHeroSection = (el: Element): boolean => {
          if (!el) return false;
          if (el.id === 'home') {
            return true;
          }
          return el.parentElement ? isHeroSection(el.parentElement) : false;
        };
        return isHeroSection(element);
      });
      setIsOverHeroSection(isHero);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Different animation variants for each section
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const featuresVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const solutionsVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeInOut"
      }
    }
  };

  const testimonialVariants = {
    hidden: { opacity: 0, rotateY: 10 },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      transition: { 
        duration: 0.8, 
        type: "spring",
        stiffness: 100
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen flex flex-col overflow-x-hidden relative bg-gradient-to-b from-[#000000] via-[#1a1a1a] to-[#000000]"
    >
      <AnimatedBackground />
      
      <header className="sticky top-0 z-50 glass-morphism">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <motion.section 
          id="home"
          variants={heroVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="scroll-animation"
        >
          <Hero />
        </motion.section>

        <motion.section 
          id="features"
          variants={featuresVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="scroll-animation"
        >
          <Features />
        </motion.section>

        <motion.section 
          id="solutions" 
          className="bg-gradient-to-b from-[#1a1a1a] to-[#000000] w-[100vw] py-28 px-4 md:px-16 scroll-animation"
          variants={solutionsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-gradient">Our Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="glass-morphism rounded-lg p-6 hover:scale-105 transition-transform duration-300"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-white">Enterprise Analytics</h3>
                <p className="text-gray-300 mb-4">
                  Advanced analytics solutions tailored for enterprise-scale operations.
                </p>
                <ul className="list-disc list-inside text-gray-400">
                  <li>Real-time data processing</li>
                  <li>Custom reporting dashboards</li>
                  <li>Predictive analytics</li>
                </ul>
              </motion.div>

              <motion.div 
                className="glass-morphism rounded-lg p-6 hover:scale-105 transition-transform duration-300"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                  transition: { duration: 0.2, delay: 0.05 }
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-white">AI Integration</h3>
                <p className="text-gray-300 mb-4">
                  Seamless AI integration solutions that enhance your existing systems.
                </p>
                <ul className="list-disc list-inside text-gray-400">
                  <li>Machine learning models</li>
                  <li>Natural language processing</li>
                  <li>Automated decision making</li>
                </ul>
              </motion.div>

              <motion.div 
                className="glass-morphism rounded-lg p-6 hover:scale-105 transition-transform duration-300"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
                  transition: { duration: 0.2, delay: 0.1 }
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-white">Security & Compliance</h3>
                <p className="text-gray-300 mb-4">
                  Comprehensive security solutions ensuring your data protection.
                </p>
                <ul className="list-disc list-inside text-gray-400">
                  <li>End-to-end encryption</li>
                  <li>Regulatory compliance</li>
                  <li>24/7 monitoring</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <RealTimeAnalytics />

        <motion.section
          variants={testimonialVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="scroll-animation"
        >
          <Testimonial />
        </motion.section>

        <motion.section
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
