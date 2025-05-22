
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea } from 'recharts';
import { PriceRecommendation } from '@/types';
import { format } from 'date-fns';

interface PriceRecommendationChartProps {
  data: PriceRecommendation[];
  roomType: string;
  segment: string;
}

const PriceRecommendationChart: React.FC<PriceRecommendationChartProps> = ({ data, roomType, segment }) => {
  // Filter data for the specific room type and segment
  const filteredData = data.filter(item => 
    item.room_type === roomType && 
    item.segment === segment
  );

  const formatXAxis = (tickItem: string) => {
    return format(new Date(tickItem), 'MMM dd');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">{format(new Date(label), 'MMM dd, yyyy')}</p>
          <p className="text-sm">
            <span className="font-medium text-blue-600">Recommended:</span>{' '}
            ${payload[0].value}
          </p>
          <p className="text-sm">
            <span className="font-medium text-gray-600">Current:</span>{' '}
            ${payload[1].value}
          </p>
          <p className="text-sm">
            <span className="font-medium">Expected Occupancy:</span>{' '}
            {payload[0].payload.expected_occupancy}%
          </p>
          <p className="text-sm">
            <span className="font-medium">Revenue:</span>{' '}
            ${payload[0].payload.expected_revenue.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Price Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorRecommended" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatXAxis}
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={['dataMin - 10', 'dataMax + 10']}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Renders the min/max price range as a reference area */}
              <ReferenceArea 
                y1="min_price" 
                y2="max_price" 
                fill="#f1f5f9" 
                fillOpacity={0.6}
              />
              
              <Line 
                name="Recommended Price" 
                type="monotone" 
                dataKey="recommended_price" 
                stroke="#3b82f6" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
              />
              <Line 
                name="Current Price" 
                type="monotone" 
                dataKey="current_price" 
                stroke="#64748b" 
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceRecommendationChart;
