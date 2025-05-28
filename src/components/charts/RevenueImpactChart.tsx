
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, addDays } from 'date-fns';

interface RevenueData {
  date: string;
  projectedRevenue: number;
  optimizedRevenue: number;
  actualRevenue?: number;
}

interface RevenueImpactChartProps {
  className?: string;
}

const generateRevenueData = (): RevenueData[] => {
  const data: RevenueData[] = [];
  const today = new Date(2025, 4, 28); // May 28, 2025
  const startDate = new Date(2025, 4, 15); // May 15, 2025
  const endDate = new Date(2025, 5, 15); // June 15, 2025

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const daysSinceStart = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Base revenue with some seasonality and randomness
    const baseRevenue = 45000 + Math.sin(daysSinceStart * 0.2) * 5000 + (Math.random() - 0.5) * 3000;
    
    // Weekend boost
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const weekendMultiplier = isWeekend ? 1.25 : 1.0;
    
    const projectedRevenue = Math.round(baseRevenue * weekendMultiplier);
    
    // Optimized revenue is typically 8-15% higher due to better pricing
    const optimizationLift = 0.08 + Math.random() * 0.07; // 8-15% improvement
    const optimizedRevenue = Math.round(projectedRevenue * (1 + optimizationLift));
    
    // Actual revenue only exists for dates up to today
    let actualRevenue: number | undefined = undefined;
    if (currentDate <= today) {
      // Actual revenue has some variance around projected (±10%)
      const actualVariance = 0.9 + Math.random() * 0.2; // 90-110% of projected
      actualRevenue = Math.round(projectedRevenue * actualVariance);
    }

    data.push({
      date: format(currentDate, 'MMM dd'),
      projectedRevenue,
      optimizedRevenue,
      actualRevenue
    });

    currentDate = addDays(currentDate, 1);
  }

  return data;
};

const RevenueImpactChart: React.FC<RevenueImpactChartProps> = ({ className }) => {
  const data = generateRevenueData();

  const formatCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(0)}k`;
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12 }}
            label={{ value: 'Daily Revenue', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [formatCurrency(value), name]}
            labelStyle={{ color: '#374151' }}
          />
          <Legend />
          
          <Line
            type="monotone"
            dataKey="projectedRevenue"
            stroke="#64748b"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Projected Revenue"
            dot={false}
          />
          
          <Line
            type="monotone"
            dataKey="optimizedRevenue"
            stroke="#10b981"
            strokeWidth={2}
            name="Optimized Revenue"
            dot={false}
          />
          
          <Line
            type="monotone"
            dataKey="actualRevenue"
            stroke="#3b82f6"
            strokeWidth={3}
            name="Actual Revenue"
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueImpactChart;
