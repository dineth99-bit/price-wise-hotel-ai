import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import AgentsConfiguration from '@/components/agents/AgentsConfiguration';
import ForecastChart from '@/components/charts/ForecastChart';
import OptimizationPanel from '@/components/optimization/OptimizationPanel';
import PriceRecommendationChart from '@/components/charts/PriceRecommendationChart';
import RevenueImpactChart from '@/components/charts/RevenueImpactChart';
import RevenueImpactAnalysis from '@/components/dashboard/RevenueImpactAnalysis';
import StatCard from '@/components/dashboard/StatCard';
import { 
  agents as initialAgents, 
  generateAgentForecasts, 
  forecastData, 
  priceRecommendations,
  roomTypes,
  customerSegments
} from '@/data/mockData';
import { Agent, AgentForecast, OptimizationConstraints } from '@/types';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  UserCheck,
  DollarSign
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [selectedRoomType, setSelectedRoomType] = useState(roomTypes[0].id);
  const [selectedSegment, setSelectedSegment] = useState(customerSegments[0].id);
  const [showRevenueAnalysis, setShowRevenueAnalysis] = useState(false);
  
  const initialConstraints: OptimizationConstraints = {
    min_price: 80,
    max_price: 500,
    min_profit_margin: 15,
    max_price_change: 10,
    occupancy_target: 80,
    algorithm: 'gradient-descent'
  };

  // Handler for toggling agents
  const handleToggleAgent = (agentId: string, enabled: boolean) => {
    setAgents(agents.map(agent => 
      agent.id === agentId ? { ...agent, enabled } : agent
    ));
  };
  
  // Handler for toggling sub-factors
  const handleToggleSubFactor = (agentId: string, subFactorId: string, enabled: boolean) => {
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? {
            ...agent,
            subFactors: agent.subFactors.map(subFactor =>
              subFactor.id === subFactorId ? { ...subFactor, enabled } : subFactor
            )
          }
        : agent
    ));
  };
  
  // Handler for applying constraints
  const handleApplyConstraints = (constraints: OptimizationConstraints) => {
    console.log("Applied constraints:", constraints);
    // In a real app, this would trigger a re-optimization with the new constraints
  };

  const today = format(new Date(), 'yyyy-MM-dd');
  const todayForecasts = forecastData.find(f => f.timestamp === today);
  
  // Calculate occupancy metrics
  const todayOccupancy = todayForecasts ? todayForecasts.predicted_demand : 0;
  const yesterdayForecasts = forecastData.find(
    f => f.timestamp === format(new Date(Date.now() - 86400000), 'yyyy-MM-dd')
  );
  const yesterdayOccupancy = yesterdayForecasts ? yesterdayForecasts.predicted_demand : 0;
  const occupancyChange = yesterdayOccupancy ? 
    Math.round(((todayOccupancy - yesterdayOccupancy) / yesterdayOccupancy) * 100 * 100) / 100 : 
    0;

  // Calculate revenue optimization impact
  const calculateRevenueImpact = () => {
    const startDate = new Date(2025, 4, 15); // May 15, 2025
    const today = new Date(2025, 4, 28); // May 28, 2025
    
    let totalProjectedRevenue = 0;
    let totalActualRevenue = 0;
    
    // Calculate revenue for dates up to today
    let currentDate = new Date(startDate);
    while (currentDate <= today) {
      const daysSinceStart = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Base revenue calculation (similar to RevenueImpactChart)
      const baseRevenue = 45000 + Math.sin(daysSinceStart * 0.2) * 5000 + (Math.random() - 0.5) * 3000;
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
      const weekendMultiplier = isWeekend ? 1.25 : 1.0;
      const projectedRevenue = Math.round(baseRevenue * weekendMultiplier);
      
      // Actual revenue with optimization impact (8-15% higher)
      const optimizationLift = 0.08 + Math.random() * 0.07;
      const actualRevenue = Math.round(projectedRevenue * (1 + optimizationLift) * (0.9 + Math.random() * 0.2));
      
      totalProjectedRevenue += projectedRevenue;
      totalActualRevenue += actualRevenue;
      
      currentDate = addDays(currentDate, 1);
    }
    
    const revenueDifference = totalActualRevenue - totalProjectedRevenue;
    const percentageIncrease = Math.round(((revenueDifference / totalProjectedRevenue) * 100) * 100) / 100;
    
    return {
      difference: revenueDifference,
      percentage: percentageIncrease
    };
  };

  const revenueImpact = calculateRevenueImpact();

  // Generate forecast data for each agent
  const agentForecasts: Record<string, AgentForecast[]> = {};
  agents.forEach(agent => {
    agentForecasts[agent.id] = generateAgentForecasts(agent.id);
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Revenue Manager Dashboard</h1>
          <p className="text-muted-foreground">
            Hotel price optimization powered by AI forecasting agents
          </p>
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          <div onClick={() => setShowRevenueAnalysis(true)} className="cursor-pointer">
            <StatCard 
              title="Revenue Impact" 
              value={`$${Math.round(revenueImpact.difference / 1000)}k`}
              change={revenueImpact.percentage}
              icon={<DollarSign />}
              subtitle="Click for more details"
            />
          </div>
          <StatCard 
            title="Expected Occupancy" 
            value={`${todayOccupancy}%`}
            change={Math.round(occupancyChange * 100) / 100}
            icon={<UserCheck />}
          />
          <StatCard 
            title="ADR Forecast" 
            value={`$${forecastData[0]?.trend_price.toFixed(0) || 0}`} 
            change={2.50}
            icon={<TrendingUp />}
          />
          <StatCard 
            title="RevPAR Potential" 
            value={`$${(forecastData[0]?.trend_price * (todayOccupancy / 100)).toFixed(0) || 0}`}
            change={3.80}
            icon={<BarChart3 />}
          />
          <StatCard 
            title="Price Elasticity" 
            value={forecastData[0]?.price_elasticity.toFixed(2) || 0} 
            icon={<Target />}
          />
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="agents">Forecasting Agents</TabsTrigger>
            <TabsTrigger value="optimization">Price Optimization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle>Price Recommendations</CardTitle>
                    <div className="flex gap-2">
                      <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Room Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomTypes.map(room => (
                            <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Segment" />
                        </SelectTrigger>
                        <SelectContent>
                          {customerSegments.map(segment => (
                            <SelectItem key={segment.id} value={segment.id}>{segment.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <PriceRecommendationChart 
                    data={priceRecommendations}
                    roomType={selectedRoomType}
                    segment={selectedSegment}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Agent Contributions</CardTitle>
                  <CardDescription>
                    Impact of each forecasting agent on today's prices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agents.filter(a => a.enabled).map(agent => (
                      <div key={agent.id} className="space-y-1">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: agent.color }}></div>
                            <span className="text-sm">{agent.name}</span>
                          </div>
                          <span className="text-sm font-medium">
                            {agent.id === 'demand' && `${todayForecasts?.predicted_demand}%`}
                            {agent.id === 'elasticity-graph' && `${todayForecasts?.price_elasticity.toFixed(2)}`}
                            {agent.id === 'ltb' && `${todayForecasts?.look_to_book_ratio.toFixed(2)}`}
                            {agent.id === 'event' && `+$${todayForecasts?.event_boost.toFixed(1)}`}
                            {agent.id === 'weather' && `${todayForecasts?.weather_impact.toFixed(2)}%`}
                            {agent.id === 'macro' && `${todayForecasts?.macro_impact.toFixed(2)}%`}
                            {agent.id === 'cost' && `$${todayForecasts?.cost_estimate.toFixed(1)}`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full" 
                            style={{ 
                              backgroundColor: agent.color,
                              width: `${Math.min(100, Math.max(20, Math.random() * 80 + 20))}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Impact Analysis</CardTitle>
                <CardDescription>
                  Comparison of projected, optimized, and actual daily revenue (May 15 - June 15, 2025)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueImpactChart />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="agents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Forecasting Agents Configuration</CardTitle>
                <CardDescription>
                  Enable or disable agents and their sub-factors to adjust the optimization model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AgentsConfiguration 
                  agents={agents}
                  onToggleAgent={handleToggleAgent}
                  onToggleSubFactor={handleToggleSubFactor}
                />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.filter(agent => agent.enabled).map(agent => (
                <ForecastChart
                  key={agent.id}
                  agentId={agent.id}
                  agentName={agent.name}
                  color={agent.color}
                  data={agentForecasts[agent.id]}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="optimization" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <OptimizationPanel 
                  onApplyConstraints={handleApplyConstraints}
                  initialConstraints={initialConstraints}
                />
              </div>
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Results</CardTitle>
                    <CardDescription>
                      Visualizing the impact of different constraints
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <PriceRecommendationChart 
                      data={priceRecommendations}
                      roomType={selectedRoomType}
                      segment={selectedSegment}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <RevenueImpactAnalysis 
          open={showRevenueAnalysis}
          onOpenChange={setShowRevenueAnalysis}
        />
      </div>
    </AppLayout>
  );
};

export default Index;
