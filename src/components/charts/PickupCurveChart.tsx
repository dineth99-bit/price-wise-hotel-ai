
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, subWeeks, subMonths, subQuarters, subYears } from 'date-fns';

interface PickupCurveChartProps {
  timePeriod: string;
  arrivalDate: Date;
}

const PickupCurveChart: React.FC<PickupCurveChartProps> = ({ timePeriod, arrivalDate }) => {
  // Generate mock data based on time period - showing bookings made for the arrival date
  const generateData = () => {
    const data = [];
    let periods = 30;
    let formatStr = 'MMM dd';
    let subtractFn = subDays;
    let baseBookings = 15;

    switch (timePeriod) {
      case 'weekly':
        periods = 12;
        formatStr = 'MMM dd';
        subtractFn = subWeeks;
        baseBookings = 105; // 15 * 7
        break;
      case 'monthly':
        periods = 12;
        formatStr = 'MMM yyyy';
        subtractFn = subMonths;
        baseBookings = 450; // 15 * 30
        break;
      case 'quarterly':
        periods = 8;
        formatStr = 'QQQ yyyy';
        subtractFn = subQuarters;
        baseBookings = 1350; // 15 * 90
        break;
      case 'yearly':
        periods = 5;
        formatStr = 'yyyy';
        subtractFn = subYears;
        baseBookings = 5475; // 15 * 365
        break;
    }

    // Generate data going backwards from arrival date (when bookings were made)
    for (let i = periods - 1; i >= 0; i--) {
      const bookingDate = subtractFn(arrivalDate, i);
      
      // Bookings typically increase closer to arrival date
      const proximityFactor = Math.max(0.1, (periods - i) / periods);
      const randomVariation = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
      
      const predictedBookings = Math.round(baseBookings * proximityFactor * randomVariation);
      const actualBookings = Math.round(predictedBookings * (0.85 + Math.random() * 0.3)); // 0.85 to 1.15 of predicted
      
      data.push({
        period: format(bookingDate, formatStr),
        predicted: Math.max(0, predictedBookings),
        actual: Math.max(0, actualBookings),
        daysOut: i === 0 ? 'Arrival Day' : `${i} ${timePeriod === 'daily' ? 'days' : timePeriod.slice(0, -2)} before`
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
            label={{ value: 'Bookings Made', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value, name) => [value, name]}
            labelFormatter={(label) => `Booking Period: ${label}`}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="#8884d8" 
            strokeWidth={2}
            name="Predicted Bookings"
            dot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#82ca9d" 
            strokeWidth={2}
            name="Actual Bookings"
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PickupCurveChart;
