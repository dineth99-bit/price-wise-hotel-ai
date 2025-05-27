
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Filter, TrendingUp } from 'lucide-react';
import ForecastChart from '@/components/charts/ForecastChart';
import CombinedForecastChart from '@/components/charts/CombinedForecastChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { agents, generateAgentForecasts } from '@/data/mockData';
import { AgentForecast } from '@/types';

const Forecasts: React.FC = () => {
  const [timeframe, setTimeframe] = useState('7days');
  const [selectedAgent, setSelectedAgent] = useState('all');
  
  // Generate forecast data for each agent
  const agentForecasts: Record<string, AgentForecast[]> = {};
  agents.forEach(agent => {
    agentForecasts[agent.id] = generateAgentForecasts(agent.id);
  });

  const enabledAgents = agents.filter(a => a.enabled);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Forecasts</h1>
            <p className="text-muted-foreground">
              Analyze forecast data across different agents and time periods
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Next 7 days</SelectItem>
                <SelectItem value="14days">Next 14 days</SelectItem>
                <SelectItem value="30days">Next 30 days</SelectItem>
                <SelectItem value="90days">Next 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <CombinedForecastChart 
          agents={agents} 
          agentForecasts={agentForecasts} 
        />

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Individual Agent Forecasts</h2>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter agents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                {enabledAgents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enabledAgents
              .filter(agent => selectedAgent === 'all' || agent.id === selectedAgent)
              .map(agent => (
                <ForecastChart
                  key={agent.id}
                  agentId={agent.id}
                  agentName={agent.name}
                  color={agent.color}
                  data={agentForecasts[agent.id]}
                />
              ))
            }
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Forecasts;
