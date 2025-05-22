
import React from 'react';
import AgentCard from './AgentCard';
import { Agent } from '@/types';

interface AgentsConfigurationProps {
  agents: Agent[];
  onToggleAgent: (agentId: string, enabled: boolean) => void;
}

const AgentsConfiguration: React.FC<AgentsConfigurationProps> = ({ agents, onToggleAgent }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {agents.map(agent => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onToggle={onToggleAgent}
        />
      ))}
    </div>
  );
};

export default AgentsConfiguration;
