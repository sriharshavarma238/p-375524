import React from "react";

export const SectionsContent = () => {
  return (
    <>
      <section id="features" className="py-20 bg-[#F2FCE2]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">AI-Powered Analytics</h3>
              <p>Advanced analytics powered by artificial intelligence to provide deep insights.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Real-time Processing</h3>
              <p>Process and analyze data in real-time for immediate insights.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Secure Infrastructure</h3>
              <p>Enterprise-grade security to protect your valuable data.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="py-20 bg-[#D3E4FD]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Enterprise Solutions</h3>
              <p>Customized solutions for large-scale enterprise operations.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">SMB Solutions</h3>
              <p>Scalable solutions designed for small and medium businesses.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 bg-[#FEF7CD]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Blog</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <article className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Latest Insights</h3>
              <p>Discover the latest trends and insights in AI and data analytics.</p>
            </article>
            <article className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Case Studies</h3>
              <p>Real-world examples of successful implementations.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-[#FDE1D3]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Starter</h3>
              <p className="text-3xl font-bold mb-4">$99/mo</p>
              <ul className="space-y-2">
                <li>Basic Analytics</li>
                <li>5 Users</li>
                <li>Basic Support</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Professional</h3>
              <p className="text-3xl font-bold mb-4">$199/mo</p>
              <ul className="space-y-2">
                <li>Advanced Analytics</li>
                <li>20 Users</li>
                <li>Priority Support</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">Custom</p>
              <ul className="space-y-2">
                <li>Custom Solutions</li>
                <li>Unlimited Users</li>
                <li>24/7 Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-[#F2FCE2]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Contact Us</h2>
          <div className="max-w-lg mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea className="w-full px-4 py-2 border rounded-lg h-32"></textarea>
              </div>
              <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
