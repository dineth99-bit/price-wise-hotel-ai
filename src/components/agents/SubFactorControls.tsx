
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { SubFactor } from '@/types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubFactorControlsProps {
  agentId: string;
  agentName: string;
  agentColor: string;
  subFactors: SubFactor[];
  onToggleSubFactor: (agentId: string, subFactorId: string, enabled: boolean) => void;
  isExpanded: boolean;
  onToggleExpansion: () => void;
}

const SubFactorControls: React.FC<SubFactorControlsProps> = ({
  agentId,
  agentName,
  agentColor,
  subFactors,
  onToggleSubFactor,
  isExpanded,
  onToggleExpansion
}) => {
  const enabledSubFactors = subFactors.filter(sf => sf.enabled).length;

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: agentColor }}></div>
            {agentName} Sub-factors
            <Badge variant="outline" className="text-xs">
              {enabledSubFactors}/{subFactors.length} active
            </Badge>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpansion}
            className="h-6 w-6 p-0"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {subFactors.map(subFactor => (
              <div key={subFactor.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{subFactor.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {subFactor.impact.toFixed(1)}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {subFactor.description}
                  </p>
                </div>
                <Switch
                  checked={subFactor.enabled}
                  onCheckedChange={(checked) => 
                    onToggleSubFactor(agentId, subFactor.id, checked)
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SubFactorControls;
