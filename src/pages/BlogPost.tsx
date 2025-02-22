
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useParams, Link } from "react-router-dom";

const blogPosts = {
  "ai-in-finance": {
    title: "AI in Finance: The Future of Money Management",
    date: "March 15, 2024",
    content: `
      Artificial Intelligence is revolutionizing the way we manage money and make financial decisions. 
      This transformation is happening across multiple fronts, from personal banking to institutional investing.

      One of the most significant impacts of AI in finance is in the realm of personal financial management. 
      AI-powered tools can now analyze spending patterns, predict future expenses, and provide personalized 
      recommendations for saving and investing. These tools take into account various factors such as income, 
      fixed expenses, financial goals, and risk tolerance to create tailored financial strategies.

      Machine learning algorithms are also being used to detect fraudulent transactions with unprecedented 
      accuracy. By analyzing patterns across millions of transactions, these systems can identify suspicious 
      activities in real-time, providing better protection for consumers and financial institutions alike.

      The future of AI in finance looks even more promising. We're seeing developments in:
      
      • Automated portfolio management
      • Real-time risk assessment
      • Predictive market analysis
      • Personalized financial coaching
      
      As these technologies continue to evolve, we can expect even more sophisticated and accessible 
      financial management tools that will help individuals make better financial decisions and achieve 
      their financial goals more effectively.
    `,
  },
  "smart-budgeting": {
    title: "Smart Budgeting Tips for 2024",
    date: "March 10, 2024",
    content: `
      In today's dynamic economic environment, smart budgeting has become more crucial than ever. 
      Here are comprehensive strategies to help you manage your finances effectively in 2024.

      The 50/30/20 Rule:
      This time-tested budgeting principle suggests allocating:
      • 50% of your income to necessities
      • 30% to wants
      • 20% to savings and debt repayment

      Digital Tools and Automation:
      Leverage technology to automate your savings and bill payments. Many banks now offer automatic 
      savings features that round up purchases to the nearest dollar and save the difference.

      Emergency Fund Building:
      In today's uncertain times, having a robust emergency fund is crucial. Aim to save:
      • 3-6 months of living expenses for stable income
      • 6-12 months for variable income

      Investment Strategies:
      Consider diversifying your investments across:
      • Index funds
      • Real estate investment trusts (REITs)
      • High-yield savings accounts
      • Government bonds

      Remember, the key to successful budgeting is consistency and regular review of your financial goals 
      and spending patterns.
    `,
  },
  "cybersecurity": {
    title: "Cybersecurity in Personal Finance",
    date: "March 5, 2024",
    content: `
      In an increasingly digital financial world, protecting your financial assets from cyber threats 
      has never been more important. This guide covers essential cybersecurity practices for personal 
      finance management.

      Essential Security Measures:
      
      1. Strong Password Management:
      • Use unique, complex passwords for each financial account
      • Implement two-factor authentication whenever possible
      • Consider using a password manager

      2. Secure Networks:
      • Always use encrypted connections for financial transactions
      • Avoid public Wi-Fi for banking activities
      • Keep your home network security updated

      3. Regular Monitoring:
      • Check account statements regularly
      • Set up transaction alerts
      • Monitor your credit report

      4. Safe Online Banking Practices:
      • Use official banking apps
      • Verify website security certificates
      • Never click on suspicious links in emails

      Modern Threats and Solutions:
      Stay informed about current cybersecurity threats such as:
      • Phishing attempts
      • Malware
      • Identity theft
      • Social engineering attacks

      Remember, cybersecurity is an ongoing process. Regularly update your security measures and 
      stay informed about new threats and protection methods.
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="flex-1 pt-24">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16">
            <h1 className="text-4xl font-bold mb-8">Blog Post Not Found</h1>
            <Link to="/blog" className="text-primary hover:text-primary/80">
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-1 pt-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16">
          <Link to="/blog" className="text-primary hover:text-primary/80 mb-8 inline-block">
            ← Back to Blog
          </Link>
          
          <article className="prose dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-gray-500 mb-8">{post.date}</div>
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="mb-4 whitespace-pre-wrap">
                  {paragraph}
                </p>
              )
            ))}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
