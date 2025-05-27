import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { OptimizationConstraints } from '@/types';

interface OptimizationPanelProps {
  onApplyConstraints: (constraints: OptimizationConstraints) => void;
  initialConstraints: OptimizationConstraints;
}

const algorithms = [
  { id: 'gradient-descent', name: 'Gradient Descent', description: 'Fast convergence for smooth optimization landscapes' },
  { id: 'genetic-algorithm', name: 'Genetic Algorithm', description: 'Global optimization with evolutionary approach' },
  { id: 'simulated-annealing', name: 'Simulated Annealing', description: 'Escapes local minima through probabilistic jumps' },
  { id: 'particle-swarm', name: 'Particle Swarm', description: 'Swarm intelligence for multi-dimensional optimization' },
  { id: 'bayesian-optimization', name: 'Bayesian Optimization', description: 'Sample-efficient optimization with uncertainty quantification' },
  { id: 'reinforcement-learning', name: 'Reinforcement Learning', description: 'Adaptive learning through environment interaction' }
];

const OptimizationPanel: React.FC<OptimizationPanelProps> = ({ onApplyConstraints, initialConstraints }) => {
  const [constraints, setConstraints] = useState<OptimizationConstraints>({
    ...initialConstraints,
    algorithm: initialConstraints.algorithm || 'gradient-descent'
  });

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

  const handleAlgorithmChange = (algorithm: string) => {
    setConstraints(prev => ({ ...prev, algorithm }));
  };

  const applyConstraints = () => {
    onApplyConstraints(constraints);
    toast.success(`Price optimization applied with ${algorithms.find(a => a.id === constraints.algorithm)?.name} algorithm`);
  };

  const resetConstraints = () => {
    setConstraints({ ...initialConstraints, algorithm: 'gradient-descent' });
    toast.info("Price optimization constraints reset to defaults");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Price Optimization Constraints</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="algorithm">Optimization Algorithm</Label>
          <Select value={constraints.algorithm} onValueChange={handleAlgorithmChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map(algorithm => (
                <SelectItem key={algorithm.id} value={algorithm.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{algorithm.name}</span>
                    <span className="text-xs text-muted-foreground">{algorithm.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
        <Button onClick={applyConstraints}>Apply Optimization</Button>
      </CardFooter>
    </Card>
  );
};

export default OptimizationPanel;
