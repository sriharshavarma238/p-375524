import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col">
    <img
      loading="lazy"
      src={icon}
      className="aspect-[1] object-contain w-12"
      alt={`${title} icon`}
    />
    <h3 className="text-xl font-bold leading-[1.4] mt-4">{title}</h3>
    <p className="text-base font-normal leading-6 mt-4">{description}</p>
  </div>
);

const InsightStep = ({ image, title, description, actionText, onActionClick }) => (
  <div className="flex-1">
    <img
      src={image}
      alt={title}
      className="w-full aspect-[4/3] object-cover rounded-lg mb-6"
    />
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-base text-gray-600 mb-4">{description}</p>
    <button 
      onClick={onActionClick}
      className="flex items-center text-black font-semibold hover:opacity-80"
    >
      {actionText}
      <svg
        className="w-4 h-4 ml-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

export const Features = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const stepDetails = {
    scan: {
      title: "AI Scanning for Comprehensive Data Analysis",
      description: `Our advanced AI scanning technology performs deep analysis of vast datasets to uncover meaningful patterns and insights. Here's what makes it special:

      • Real-time Processing: Analyze millions of data points in seconds
      • Pattern Recognition: Identify hidden trends and correlations
      • Automated Reporting: Generate comprehensive insights reports
      • Custom Filters: Focus on the data that matters most to your business
      
      The system continuously learns and adapts to new data patterns, ensuring that your insights remain current and relevant in an ever-changing business landscape.`,
    },
    predict: {
      title: "Predictive Modeling for Strategic Decision Making",
      description: `Our predictive modeling capabilities transform historical data into actionable future insights:

      • Advanced Algorithms: Utilize state-of-the-art machine learning models
      • Risk Assessment: Identify potential challenges before they arise
      • Market Forecasting: Predict industry trends and market movements
      • Scenario Planning: Test different strategies in a simulated environment
      
      By combining multiple data sources and advanced analytics, we help you make informed decisions with confidence.`,
    },
    implement: {
      title: "Implementation and Optimization",
      description: `Turn insights into action with our proven implementation framework:

      • Step-by-step Guidance: Clear implementation roadmaps
      • Performance Monitoring: Real-time tracking of key metrics
      • Continuous Optimization: Regular updates and improvements
      • Expert Support: Access to our team of implementation specialists
      
      We ensure that the transition from insight to action is smooth and effective, maximizing the value of your data-driven decisions.`,
    },
  };

  return (
    <section className="bg-white w-full py-28 px-4 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row gap-[40px_80px] items-center">
          <div className="flex-1">
            <h2 className="text-[40px] font-bold leading-[48px] max-md:text-[32px] max-md:leading-[38px]">
              Long heading is what you see here in this feature section
            </h2>

            <p className="text-lg font-normal leading-[27px] mt-6">
              Experience unparalleled growth with our Quantum AI solutions.
              Transform your business strategies and gain insights that propel
              you ahead of the competition.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <FeatureCard
                icon="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/361a9b83cc025dc630a90fbdc8044aca265bc17b3bb12b44b5549ba02b8acf07?placeholderIfAbsent=true"
                title="Enhanced Insights"
                description="Leverage AI to uncover actionable insights for smarter decision-making and strategic planning."
              />
              <FeatureCard
                icon="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/361a9b83cc025dc630a90fbdc8044aca265bc17b3bb12b44b5549ba02b8acf07?placeholderIfAbsent=true"
                title="Accelerated Growth"
                description="Fast-track your market entry with data-driven strategies tailored for rapid expansion."
              />
            </div>
          </div>

          <div className="flex-1">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/d1f8acffd5aaf94aaf10455f3c7690adde6b3103c133f0ecb7457fbce09a0581?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/d1f8acffd5aaf94aaf10455f3c7690adde6b3103c133f0ecb7457fbce09a0581?placeholderIfAbsent=true&width=2000 2000w"
              className="w-full aspect-[0.96] object-contain"
              alt="Features illustration"
            />
          </div>
        </div>

        <div className="mt-32">
          <h2 className="text-[32px] font-bold mb-12">
            Transforming Data into Actionable Insights with Quantum AI
          </h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">
              Unlock Your Business Potential in Three Simple Steps
            </h3>
            <p className="text-base text-gray-600">
              Experience a streamlined process that leverages cutting-edge technology for growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <InsightStep
              image="/lovable-uploads/462eb367-4541-4da1-a84e-3966867f8fc2.png"
              title="Step 1: AI Scanning for Comprehensive Data Analysis"
              description="Our AI scans vast datasets to identify trends and opportunities."
              actionText="Learn"
              onActionClick={() => setOpenDialog('scan')}
            />
            <InsightStep
              image="/lovable-uploads/0b4fb985-4c15-4890-bc61-19fe508dbd58.png"
              title="Step 2: Predictive Modeling for Strategic Decision Making"
              description="Utilize predictive models to forecast market movements and risks."
              actionText="Discover"
              onActionClick={() => setOpenDialog('predict')}
            />
            <InsightStep
              image="/lovable-uploads/b98d46c6-f611-4f71-ab1a-d9e129a520dc.png"
              title="Step 3: Implementation and Optimization"
              description="Put insights into action with our proven implementation framework."
              actionText="Analyze"
              onActionClick={() => setOpenDialog('implement')}
            />
          </div>
        </div>

        <Dialog open={openDialog === 'scan'} onOpenChange={() => setOpenDialog(null)}>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-4">{stepDetails.scan.title}</DialogTitle>
              <DialogDescription className="text-base whitespace-pre-line">
                {stepDetails.scan.description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={openDialog === 'predict'} onOpenChange={() => setOpenDialog(null)}>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-4">{stepDetails.predict.title}</DialogTitle>
              <DialogDescription className="text-base whitespace-pre-line">
                {stepDetails.predict.description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={openDialog === 'implement'} onOpenChange={() => setOpenDialog(null)}>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-4">{stepDetails.implement.title}</DialogTitle>
              <DialogDescription className="text-base whitespace-pre-line">
                {stepDetails.implement.description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
