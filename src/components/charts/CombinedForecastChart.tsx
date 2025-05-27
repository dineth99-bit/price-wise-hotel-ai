
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { Agent, AgentForecast } from '@/types';
import { format } from 'date-fns';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface CombinedForecastData {
  timestamp: string;
  combinedValue: number;
  confidence: [number, number];
  consensus: 'high' | 'medium' | 'low';
  riskLevel: 'low' | 'medium' | 'high';
}

interface CombinedForecastChartProps {
  agents: Agent[];
  agentForecasts: Record<string, AgentForecast[]>;
}

const CombinedForecastChart: React.FC<CombinedForecastChartProps> = ({ 
  agents, 
  agentForecasts 
}) => {
  const enabledAgents = agents.filter(a => a.enabled);

  // Calculate combined forecast data
  const combinedData: CombinedForecastData[] = [];
  
  if (enabledAgents.length > 0 && agentForecasts[enabledAgents[0].id]) {
    const dates = agentForecasts[enabledAgents[0].id];
    
    dates.forEach((_, index) => {
      const timestamp = dates[index].timestamp;
      
      // Normalize values and calculate weighted average
      let weightedSum = 0;
      let totalWeight = 0;
      let confidenceRanges: number[] = [];
      
      enabledAgents.forEach(agent => {
        if (agentForecasts[agent.id] && agentForecasts[agent.id][index]) {
          const forecast = agentForecasts[agent.id][index];
          
          // Calculate weight based on enabled sub-factors
          const enabledSubFactors = agent.subFactors.filter(sf => sf.enabled);
          const weight = enabledSubFactors.reduce((sum, sf) => sum + sf.impact, 0) / 100;
          
          // Normalize forecast value to 0-100 scale for combination
          let normalizedValue = 50; // Default middle value
          
          switch (agent.id) {
            case 'demand':
              normalizedValue = Math.min(100, Math.max(0, forecast.value));
              break;
            case 'elasticity':
              normalizedValue = Math.min(100, Math.max(0, (forecast.value + 3) * 16.67)); // Convert -3 to 0 range to 0-100
              break;
            case 'ltb':
              normalizedValue = Math.min(100, Math.max(0, forecast.value * 500)); // Convert 0-0.2 to 0-100
              break;
            case 'trend':
              normalizedValue = Math.min(100, Math.max(0, (forecast.value - 50) * 2 + 50)); // Center around 50
              break;
            case 'event':
            case 'weather':
              normalizedValue = Math.min(100, Math.max(0, forecast.value + 50)); // Shift to positive range
              break;
            case 'cost':
              normalizedValue = Math.min(100, Math.max(0, 100 - forecast.value)); // Invert cost (lower cost = better)
              break;
          }
          
          weightedSum += normalizedValue * weight;
          totalWeight += weight;
          
          if (forecast.confidence) {
            confidenceRanges.push(forecast.confidence[1] - forecast.confidence[0]);
          }
        }
      });
      
      const combinedValue = totalWeight > 0 ? weightedSum / totalWeight : 50;
      
      // Calculate consensus based on confidence range variance
      const avgConfidenceRange = confidenceRanges.length > 0 
        ? confidenceRanges.reduce((sum, range) => sum + range, 0) / confidenceRanges.length 
        : 10;
      
      const consensus: 'high' | 'medium' | 'low' = 
        avgConfidenceRange < 5 ? 'high' : 
        avgConfidenceRange < 15 ? 'medium' : 'low';
      
      // Calculate risk level based on value extremes and consensus
      const riskLevel: 'low' | 'medium' | 'high' = 
        (combinedValue < 20 || combinedValue > 80) && consensus === 'low' ? 'high' :
        (combinedValue < 30 || combinedValue > 70) || consensus === 'low' ? 'medium' : 'low';
      
      // Confidence interval for combined forecast
      const confidenceRange = avgConfidenceRange * 0.8; // Reduce uncertainty in combination
      const confidence: [number, number] = [
        Math.max(0, combinedValue - confidenceRange / 2),
        Math.min(100, combinedValue + confidenceRange / 2)
      ];
      
      combinedData.push({
        timestamp,
        combinedValue,
        confidence,
        consensus,
        riskLevel
      });
    });
  }

  const formatXAxis = (tickItem: string) => {
    return format(new Date(tickItem), 'MMM dd');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium">{format(new Date(label), 'MMM dd, yyyy')}</p>
          <p className="text-sm">
            <span className="font-medium">Market Outlook:</span>{' '}
            {payload[0].value.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500">
            Confidence: [{data.confidence[0].toFixed(1)}% - {data.confidence[1].toFixed(1)}%]
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs">Consensus:</span>
            {data.consensus === 'high' ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : data.consensus === 'medium' ? (
              <TrendingUp className="w-3 h-3 text-yellow-500" />
            ) : (
              <AlertTriangle className="w-3 h-3 text-red-500" />
            )}
            <span className="text-xs capitalize">{data.consensus}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate insights
  const highConfidencePeriods = combinedData.filter(d => d.consensus === 'high').length;
  const conflictingSignals = combinedData.filter(d => d.consensus === 'low').length;
  const highRiskPeriods = combinedData.filter(d => d.riskLevel === 'high').length;
  
  const avgMarketOutlook = combinedData.length > 0 
    ? combinedData.reduce((sum, d) => sum + d.combinedValue, 0) / combinedData.length 
    : 50;

  if (enabledAgents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Combined Forecast Analysis</CardTitle>
          <CardDescription>Enable agents below to view combined forecasts</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No agents enabled</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Combined Forecast Analysis</CardTitle>
        <CardDescription>
          Aggregated market outlook from {enabledAgents.length} active agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {avgMarketOutlook.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Market Outlook</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {highConfidencePeriods}
            </div>
            <div className="text-sm text-gray-500">High Confidence Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {conflictingSignals}
            </div>
            <div className="text-sm text-gray-500">Conflicting Signals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {highRiskPeriods}
            </div>
            <div className="text-sm text-gray-500">High Risk Days</div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={combinedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatXAxis} 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd" 
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                domain={[0, 100]}
                label={{ value: 'Market Outlook (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={50} stroke="#64748b" strokeDasharray="2 2" />
              <Line 
                type="monotone" 
                dataKey="combinedValue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
                isAnimationActive={true} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>High Consensus</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-yellow-500" />
              <span>Medium Consensus</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>Low Consensus</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CombinedForecastChart;
