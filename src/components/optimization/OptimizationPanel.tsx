
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { OptimizationConstraints } from '@/types';

interface OptimizationPanelProps {
  onApplyConstraints: (constraints: OptimizationConstraints) => void;
  initialConstraints: OptimizationConstraints;
}

const OptimizationPanel: React.FC<OptimizationPanelProps> = ({ onApplyConstraints, initialConstraints }) => {
  const [constraints, setConstraints] = useState<OptimizationConstraints>(initialConstraints);

  const handleMinPriceChange = (value: number) => {
    setConstraints(prev => ({ ...prev, min_price: value }));
  };

  const handleMaxPriceChange = (value: number) => {
    setConstraints(prev => ({ ...prev, max_price: value }));
  };

  const handleProfitMarginChange = (value: number[]) => {
    setConstraints(prev => ({ ...prev, min_profit_margin: value[0] }));
  };

  const handleMaxPriceChangePercentChange = (value: number[]) => {
    setConstraints(prev => ({ ...prev, max_price_change: value[0] }));
  };

  const handleOccupancyTargetChange = (value: number[]) => {
    setConstraints(prev => ({ ...prev, occupancy_target: value[0] }));
  };

  const applyConstraints = () => {
    onApplyConstraints(constraints);
    toast.success("Optimization constraints applied successfully");
  };

  const resetConstraints = () => {
    setConstraints(initialConstraints);
    toast.info("Optimization constraints reset to defaults");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Optimization Constraints</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-price">Minimum Price ($)</Label>
            <Input
              id="min-price"
              type="number"
              value={constraints.min_price}
              onChange={(e) => handleMinPriceChange(Number(e.target.value))}
              min={0}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-price">Maximum Price ($)</Label>
            <Input
              id="max-price"
              type="number"
              value={constraints.max_price}
              onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
              min={constraints.min_price}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Minimum Profit Margin (%)</Label>
            <span className="text-sm font-medium">{constraints.min_profit_margin}%</span>
          </div>
          <Slider
            value={[constraints.min_profit_margin]}
            min={0}
            max={50}
            step={1}
            onValueChange={handleProfitMarginChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Maximum Price Change (%)</Label>
            <span className="text-sm font-medium">{constraints.max_price_change}%</span>
          </div>
          <Slider
            value={[constraints.max_price_change]}
            min={1}
            max={30}
            step={1}
            onValueChange={handleMaxPriceChangePercentChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Target Occupancy (%)</Label>
            <span className="text-sm font-medium">{constraints.occupancy_target}%</span>
          </div>
          <Slider
            value={[constraints.occupancy_target]}
            min={50}
            max={100}
            step={1}
            onValueChange={handleOccupancyTargetChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetConstraints}>Reset</Button>
        <Button onClick={applyConstraints}>Apply Constraints</Button>
      </CardFooter>
    </Card>
  );
};

export default OptimizationPanel;
