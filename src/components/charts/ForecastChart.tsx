
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { AgentForecast } from '@/types';
import { format } from 'date-fns';

interface ForecastChartProps {
  agentId: string;
  agentName: string;
  color: string;
  data: AgentForecast[];
  showConfidence?: boolean;
}

const ForecastChart: React.FC<ForecastChartProps> = ({ 
  agentId, 
  agentName, 
  color, 
  data,
  showConfidence = true
}) => {
  const formatXAxis = (tickItem: string) => {
    return format(new Date(tickItem), 'MMM dd');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">{format(new Date(label), 'MMM dd, yyyy')}</p>
          <p className="text-sm">
            <span className="font-medium">{agentName}:</span>{' '}
            {payload[0].value.toFixed(2)}
          </p>
          {showConfidence && payload[0].payload.confidence && (
            <p className="text-xs text-gray-500">
              Confidence: [{payload[0].payload.confidence[0].toFixed(2)} - {payload[0].payload.confidence[1].toFixed(2)}]
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
          <CardTitle>{agentName}</CardTitle>
        </div>
        <CardDescription>Forecast for the next 30 days</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div className="h-64">
          {showConfidence ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`color${agentId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatXAxis} 
                  tick={{ fontSize: 12 }} 
                  interval="preserveStartEnd"
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  fill={`url(#color${agentId})`}
                  activeDot={{ r: 4 }}
                  isAnimationActive={true} 
                />
                {showConfidence && (
                  <Area 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="transparent"
                    fill={color}
                    fillOpacity={0.2}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatXAxis} 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd" 
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                  isAnimationActive={true} 
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastChart;
