
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, subWeeks, subMonths, subQuarters, subYears } from 'date-fns';

interface PickupCurveChartProps {
  timePeriod: string;
}

const PickupCurveChart: React.FC<PickupCurveChartProps> = ({ timePeriod }) => {
  // Generate mock data based on time period
  const generateData = () => {
    const data = [];
    const today = new Date();
    let periods = 30;
    let formatStr = 'MMM dd';
    let subtractFn = subDays;

    switch (timePeriod) {
      case 'weekly':
        periods = 12;
        formatStr = 'MMM dd';
        subtractFn = subWeeks;
        break;
      case 'monthly':
        periods = 12;
        formatStr = 'MMM yyyy';
        subtractFn = subMonths;
        break;
      case 'quarterly':
        periods = 8;
        formatStr = 'QQQ yyyy';
        subtractFn = subQuarters;
        break;
      case 'yearly':
        periods = 5;
        formatStr = 'yyyy';
        subtractFn = subYears;
        break;
    }

    for (let i = periods - 1; i >= 0; i--) {
      const date = subtractFn(today, i);
      const basePickup = 65 + Math.sin(i * 0.2) * 15 + (Math.random() - 0.5) * 10;
      const actualPickup = basePickup + (Math.random() - 0.5) * 20;
      
      data.push({
        period: format(date, formatStr),
        predicted: Math.round(basePickup),
        actual: Math.round(actualPickup),
        trend: Math.round(basePickup * 1.05)
      });
    }

    return data;
  };

  const data = generateData();

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="period" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            label={{ value: 'Pickup Rate (%)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value, name) => [`${value}%`, name]}
            labelFormatter={(label) => `Period: ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="#8884d8" 
            strokeWidth={2}
            name="Predicted Pickup"
            dot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#82ca9d" 
            strokeWidth={2}
            name="Actual Pickup"
            dot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="trend" 
            stroke="#ffc658" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Trend Forecast"
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PickupCurveChart;
