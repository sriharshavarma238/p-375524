
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Testimonial } from "@/components/sections/Testimonial";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/layout/Footer";
import { SectionsContent } from "@/components/sections/SectionsContent";
import { BusinessAssistant } from "@/components/business/BusinessAssistant";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonial />
        <SectionsContent />
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Business Assistant</h2>
            <p className="text-gray-600 text-center mb-12">
              Get expert business guidance and strategic insights from our AI-powered assistant.
            </p>
            <BusinessAssistant />
          </div>
        </section>
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
