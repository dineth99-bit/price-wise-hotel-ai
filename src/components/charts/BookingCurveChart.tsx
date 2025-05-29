
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, subWeeks, subMonths, subQuarters, subYears } from 'date-fns';

interface BookingCurveChartProps {
  timePeriod: string;
}

const BookingCurveChart: React.FC<BookingCurveChartProps> = ({ timePeriod }) => {
  // Generate mock data based on time period
  const generateData = () => {
    const data = [];
    const today = new Date();
    let periods = 30;
    let formatStr = 'MMM dd';
    let subtractFn = subDays;
    let baseValue = 45;

    switch (timePeriod) {
      case 'weekly':
        periods = 12;
        formatStr = 'MMM dd';
        subtractFn = subWeeks;
        baseValue = 315; // 45 * 7
        break;
      case 'monthly':
        periods = 12;
        formatStr = 'MMM yyyy';
        subtractFn = subMonths;
        baseValue = 1350; // 45 * 30
        break;
      case 'quarterly':
        periods = 8;
        formatStr = 'QQQ yyyy';
        subtractFn = subQuarters;
        baseValue = 4050; // 45 * 90
        break;
      case 'yearly':
        periods = 5;
        formatStr = 'yyyy';
        subtractFn = subYears;
        baseValue = 16425; // 45 * 365
        break;
    }

    for (let i = periods - 1; i >= 0; i--) {
      const date = subtractFn(today, i);
      const predictedCheckins = baseValue + Math.sin(i * 0.3) * (baseValue * 0.2) + (Math.random() - 0.5) * (baseValue * 0.1);
      const actualCheckins = predictedCheckins + (Math.random() - 0.5) * (baseValue * 0.3);
      
      data.push({
        period: format(date, formatStr),
        predicted: Math.round(Math.max(0, predictedCheckins)),
        actual: Math.round(Math.max(0, actualCheckins))
      });
    }

    return data;
  };

  const data = generateData();

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="period" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            label={{ value: 'Check-ins', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value, name) => [value, name]}
            labelFormatter={(label) => `Period: ${label}`}
          />
          <Legend />
          <Bar 
            dataKey="predicted" 
            fill="#8884d8" 
            name="Predicted Check-ins"
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            dataKey="actual" 
            fill="#82ca9d" 
            name="Actual Check-ins"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingCurveChart;
