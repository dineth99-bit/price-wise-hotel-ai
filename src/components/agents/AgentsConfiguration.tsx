
import React from 'react';
import AgentCard from './AgentCard';
import { Agent } from '@/types';

interface AgentsConfigurationProps {
  agents: Agent[];
  onToggleAgent: (agentId: string, enabled: boolean) => void;
  onToggleSubFactor: (agentId: string, subFactorId: string, enabled: boolean) => void;
}

const AgentsConfiguration: React.FC<AgentsConfigurationProps> = ({ 
  agents, 
  onToggleAgent, 
  onToggleSubFactor 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {agents.map(agent => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onToggle={onToggleAgent}
          onToggleSubFactor={onToggleSubFactor}
        />
      ))}
    </div>
  );
};

export default AgentsConfiguration;
