
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-1 pt-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16">
          <h1 className="text-4xl font-bold mb-12">Latest Blog Posts</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">AI in Finance: The Future of Money Management</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Discover how artificial intelligence is revolutionizing personal finance and helping individuals make better financial decisions.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">March 15, 2024</span>
                <button className="text-primary hover:text-primary/80">Read More →</button>
              </div>
            </article>

            <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Smart Budgeting Tips for 2024</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learn effective strategies for managing your expenses and building wealth in today's economic landscape.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">March 10, 2024</span>
                <button className="text-primary hover:text-primary/80">Read More →</button>
              </div>
            </article>

            <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Cybersecurity in Personal Finance</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Protect your financial assets with these essential cybersecurity practices for personal finance management.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">March 5, 2024</span>
                <button className="text-primary hover:text-primary/80">Read More →</button>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
