
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

  // Get appropriate Y-axis label based on agent type
  const getYAxisLabel = (agentId: string) => {
    switch (agentId) {
      case 'demand':
        return 'Demand (%)';
      case 'elasticity':
        return 'Price Elasticity';
      case 'ltb':
        return 'Conversion Rate';
      case 'trend':
        return 'Price ($)';
      case 'event':
        return 'Event Boost (%)';
      case 'weather':
        return 'Weather Impact';
      case 'cost':
        return 'Cost per Room ($)';
      default:
        return 'Value';
    }
  };

  // Calculate contribution percentage based on enabled sub-factors
  const getContributionPercentage = (agentId: string) => {
    // This would normally be calculated based on the agent's weight in the combined forecast
    // For now, we'll use the sum of enabled sub-factors impact as a proxy
    const agent = agentId;
    const subFactorsData = {
      demand: [35.2, 28.7, 22.1], // enabled sub-factors impacts
      elasticity: [42.3, 31.5, 26.2],
      ltb: [38.9, 27.4, 20.3],
      trend: [45.1, 32.6, 22.3],
      event: [34.7, 28.9, 25.2, 11.2],
      weather: [41.8, 35.5, 22.7],
      cost: [39.4, 28.1, 21.7]
    };
    
    const impacts = subFactorsData[agentId as keyof typeof subFactorsData] || [25];
    const totalImpact = impacts.reduce((sum, impact) => sum + impact, 0);
    const normalizedContribution = (totalImpact / 120) * 100; // Normalize to reasonable percentage
    return Math.min(100, Math.max(5, normalizedContribution)).toFixed(1);
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <CardTitle>{agentName}</CardTitle>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">
              {getContributionPercentage(agentId)}%
            </div>
            <div className="text-xs text-gray-500">Contribution</div>
          </div>
        </div>
        <CardDescription>Forecast for the next 30 days</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div className="h-64">
          {showConfidence ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
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
                  label={{ value: 'Date', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  label={{ value: getYAxisLabel(agentId), angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  fill={`url(#color${agentId})`}
                  activeDot={{ r: 4 }}
                  isAnimationActive={true} 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatXAxis} 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                  label={{ value: 'Date', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  label={{ value: getYAxisLabel(agentId), angle: -90, position: 'insideLeft' }}
                />
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
