
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import RevenueImpactChart from '@/components/charts/RevenueImpactChart';
import { format, addDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface RevenueImpactAnalysisProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RevenueImpactAnalysis: React.FC<RevenueImpactAnalysisProps> = ({ open, onOpenChange }) => {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(2025, 4, 15), // May 15, 2025
    to: new Date(2025, 4, 28)    // May 28, 2025
  });

  // Calculate detailed revenue impact metrics based on selected date range
  const calculateDetailedImpact = () => {
    const startDate = dateRange.from;
    const endDate = dateRange.to;
    
    let totalProjectedRevenue = 0;
    let totalOptimizedRevenue = 0;
    let totalActualRevenue = 0;
    let dayCount = 0;
    
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const daysSinceStart = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Base revenue calculation
      const baseRevenue = 45000 + Math.sin(daysSinceStart * 0.2) * 5000 + (Math.random() - 0.5) * 3000;
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
      const weekendMultiplier = isWeekend ? 1.25 : 1.0;
      const projectedRevenue = Math.round(baseRevenue * weekendMultiplier);
      
      // Optimized revenue (8-15% higher)
      const optimizationLift = 0.08 + Math.random() * 0.07;
      const optimizedRevenue = Math.round(projectedRevenue * (1 + optimizationLift));
      
      // Actual revenue with some variance (only for dates up to today)
      const today = new Date(2025, 4, 28); // May 28, 2025
      let actualRevenue = 0;
      if (currentDate <= today) {
        actualRevenue = Math.round(projectedRevenue * (1 + optimizationLift) * (0.9 + Math.random() * 0.2));
      }
      
      totalProjectedRevenue += projectedRevenue;
      totalOptimizedRevenue += optimizedRevenue;
      totalActualRevenue += actualRevenue;
      dayCount++;
      
      currentDate = addDays(currentDate, 1);
    }
    
    const projectedVsActual = totalActualRevenue - totalProjectedRevenue;
    const optimizedVsActual = totalActualRevenue - totalOptimizedRevenue;
    const projectedVsActualPct = totalProjectedRevenue > 0 ? (projectedVsActual / totalProjectedRevenue) * 100 : 0;
    const avgDailyImpact = dayCount > 0 ? projectedVsActual / dayCount : 0;
    
    return {
      totalProjected: totalProjectedRevenue,
      totalOptimized: totalOptimizedRevenue,
      totalActual: totalActualRevenue,
      projectedVsActual,
      optimizedVsActual,
      projectedVsActualPct,
      avgDailyImpact,
      dayCount
    };
  };

  const metrics = calculateDetailedImpact();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Revenue Impact Analysis</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex gap-4 items-center">
            <div className="text-sm font-medium">Date Range:</div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[140px] justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "MMM dd") : <span>From</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => date && setDateRange(prev => ({ ...prev, from: date }))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[140px] justify-start text-left font-normal",
                      !dateRange.to && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "MMM dd") : <span>To</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => date && setDateRange(prev => ({ ...prev, to: date }))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Total Projected</p>
                  <p className="text-lg font-bold">${(metrics.totalProjected / 1000).toFixed(0)}k</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Total Actual</p>
                  <p className="text-lg font-bold text-green-600">${(metrics.totalActual / 1000).toFixed(0)}k</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Revenue Lift</p>
                  <p className="text-lg font-bold text-green-600">+${(metrics.projectedVsActual / 1000).toFixed(0)}k</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Avg Daily Impact</p>
                  <p className="text-lg font-bold text-green-600">+${(metrics.avgDailyImpact / 1000).toFixed(1)}k</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue Performance Timeline</CardTitle>
              <CardDescription>
                Projected vs Optimized vs Actual revenue from {format(dateRange.from, 'MMM dd')} - {format(dateRange.to, 'MMM dd')}, 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueImpactChart />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Revenue optimization has generated <span className="font-bold text-green-600">+{metrics.projectedVsActualPct.toFixed(2)}%</span> improvement over projected baseline</li>
                  <li>• Average daily revenue lift of <span className="font-bold">${(metrics.avgDailyImpact / 1000).toFixed(1)}k</span> per day</li>
                  <li>• Total additional revenue generated: <span className="font-bold text-green-600">${(metrics.projectedVsActual / 1000).toFixed(0)}k</span></li>
                  <li>• Performance tracked over {metrics.dayCount} days ({format(dateRange.from, 'MMM dd')}-{format(dateRange.to, 'MMM dd')}, 2025)</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Optimization Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue vs Baseline:</span>
                    <span className="text-sm font-bold text-green-600">+{metrics.projectedVsActualPct.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Days Tracked:</span>
                    <span className="text-sm font-bold">{metrics.dayCount} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Period:</span>
                    <span className="text-sm font-bold">{format(dateRange.from, 'MMM dd')} - {format(dateRange.to, 'MMM dd')}, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Revenue Impact:</span>
                    <span className="text-sm font-bold text-green-600">${(metrics.projectedVsActual / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RevenueImpactAnalysis;
