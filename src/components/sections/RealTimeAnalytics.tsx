
import React, { useEffect, useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface AnalyticsData {
  metric_name: string;
  value: number;
  timestamp: string;
}

export const RealTimeAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalyticsData = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('analytics_data')
        .select('*')
        .order('timestamp', { ascending: true });

      if (error) throw error;
      if (data) setAnalyticsData(data);
    } catch (error: any) {
      toast({
        title: "Error fetching analytics data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAnalyticsData();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('analytics_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'analytics_data'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          fetchAnalyticsData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAnalyticsData]);

  const formatValue = (value: number, metric: string) => {
    if (metric === 'transactions') return `$${(value / 1000000).toFixed(1)}M`;
    if (metric === 'performance') return `${value}%`;
    return value.toLocaleString();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[100vw] py-24 px-4 md:px-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 
            [text-shadow:_0_1px_20px_rgb(59_130_246_/_0.2)] animate-pulse">
            Real-Time Analytics Dashboard
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the power of real-time data visualization and analytics. Make informed decisions with our cutting-edge dashboard that updates in real-time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                User Activity
              </h3>
              <div className="h-[300px] relative">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </motion.div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData}>
                        <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3b82f6" 
                          fillOpacity={1} 
                          fill="url(#colorUsers)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                Transaction Volume
              </h3>
              <div className="h-[300px] relative">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </motion.div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#06b6d4" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {analyticsData.map((metric, index) => (
            <motion.div
              key={metric.metric_name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300">
                <h4 className="text-lg font-medium text-gray-600">{metric.metric_name}</h4>
                <div className="mt-2 flex items-baseline">
                  <motion.p
                    key={metric.value}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-bold text-gray-900"
                  >
                    {formatValue(metric.value, metric.metric_name)}
                  </motion.p>
                  <span className="ml-2 text-sm font-medium text-green-600">+{(Math.random() * 10).toFixed(1)}%</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
