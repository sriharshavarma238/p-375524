
import React from "react";
import { ActionButton } from "@/components/ui/ActionButton";
import { ArrowRight, Check } from "lucide-react";

export const CallToAction = () => {
  const benefits = [
    "Access to enterprise-grade AI models",
    "Real-time market analysis and insights",
    "Dedicated support team",
    "Customizable analytics dashboard"
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white w-full py-28 px-4 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-700 font-semibold">
                Limited Time Offer
              </span>
            </div>
            
            <h2 className="text-4xl font-bold leading-tight">
              Transform Your Financial Strategy with AI-Driven Insights
            </h2>
            
            <p className="text-lg text-gray-600">
              Join leading financial institutions leveraging our AI technology for 
              enhanced decision-making and market predictions.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ActionButton variant="primary" className="group">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </ActionButton>
              <ActionButton variant="secondary">
                Schedule Consultation
              </ActionButton>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
            <div className="relative bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Enterprise Analytics Dashboard</h3>
                <p className="text-gray-600">
                  Real-time monitoring of key financial metrics and AI-powered predictions
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">94%</div>
                  <div className="text-sm text-gray-600">Prediction Accuracy</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2.5x</div>
                  <div className="text-sm text-gray-600">ROI Improvement</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Market Monitoring</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1M+</div>
                  <div className="text-sm text-gray-600">Data Points/Day</div>
                </div>
              </div>

              <div className="pt-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-blue-500 rounded-full" />
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Current System Load</span>
                  <span>85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
