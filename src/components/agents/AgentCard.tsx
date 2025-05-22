
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Agent } from '@/types';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AgentCardProps {
  agent: Agent;
  onToggle: (agentId: string, enabled: boolean) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onToggle }) => {
  const handleToggle = (checked: boolean) => {
    onToggle(agent.id, checked);
  };

  const borderStyle = agent.enabled 
    ? { borderColor: agent.color, borderWidth: '2px' }
    : {};

  return (
    <Card className="h-full transition-all" style={borderStyle}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: agent.color }}></div>
            {agent.name}
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>{agent.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          
          <Switch 
            checked={agent.enabled} 
            onCheckedChange={handleToggle}
          />
        </div>
        <CardDescription className="text-xs">
          {agent.enabled ? 'Active' : 'Inactive'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`text-sm ${!agent.enabled && "opacity-50"}`}>
          {agent.description}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
