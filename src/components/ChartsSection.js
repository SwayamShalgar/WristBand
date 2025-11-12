"use client";
import { useState, useEffect } from 'react';
import { BarChart3, PieChart } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function ChartsSection({ analytics }) {
  const [recharts, setRecharts] = useState(null);

  useEffect(() => {
    // Dynamically import recharts only on client side, after mount
    import('recharts').then((mod) => {
      setRecharts(mod);
    }).catch(err => {
      console.error('Failed to load charts:', err);
    });
  }, []);

  if (!recharts) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-rose-600" />
            <h3 className="text-lg font-bold text-black">Patient Status Distribution</h3>
          </div>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            Loading chart...
          </div>
        </Card>
        <Card className="p-6 bg-white border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-rose-600" />
            <h3 className="text-lg font-bold text-black">Status Breakdown</h3>
          </div>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            Loading chart...
          </div>
        </Card>
      </div>
    );
  }

  const { BarChart, Bar, PieChart: RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = recharts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <Card className="p-6 bg-white border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-rose-600" />
          <h3 className="text-lg font-bold text-black">Patient Status Distribution</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ec4899">
              {analytics.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Pie Chart */}
      <Card className="p-6 bg-white border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-5 h-5 text-rose-600" />
          <h3 className="text-lg font-bold text-black">Status Breakdown</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={analytics.pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {analytics.pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
