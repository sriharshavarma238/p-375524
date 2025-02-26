
import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', users: 4000, transactions: 2400, amt: 2400 },
  { name: 'Feb', users: 3000, transactions: 1398, amt: 2210 },
  { name: 'Mar', users: 2000, transactions: 9800, amt: 2290 },
  { name: 'Apr', users: 2780, transactions: 3908, amt: 2000 },
  { name: 'May', users: 1890, transactions: 4800, amt: 2181 },
  { name: 'Jun', users: 2390, transactions: 3800, amt: 2500 },
  { name: 'Jul', users: 3490, transactions: 4300, amt: 2100 },
];

export const RealTimeAnalytics = () => {
  return (
    <section className="w-[100vw] py-24 px-4 md:px-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16 opacity-0 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Real-Time Analytics Dashboard
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the power of real-time data visualization and analytics. Make informed decisions with our cutting-edge dashboard that updates in real-time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 opacity-0 animate-fade-in-left hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.02] transition-transform">
            <h3 className="text-xl font-semibold mb-4">User Activity</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorUsers)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 opacity-0 animate-fade-in-right hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.02] transition-transform">
            <h3 className="text-xl font-semibold mb-4">Transaction Volume</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="transactions" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { title: "Active Users", value: "2,457", change: "+12.5%" },
            { title: "Total Transactions", value: "$1.2M", change: "+8.3%" },
            { title: "System Performance", value: "99.99%", change: "+0.7%" }
          ].map((stat, index) => (
            <Card key={index} className={`p-6 opacity-0 animate-fade-in-up animation-delay-${index + 1} hover:shadow-lg transition-shadow duration-300`}>
              <h4 className="text-lg font-medium text-gray-600">{stat.title}</h4>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
