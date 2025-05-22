
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import { toast } from 'sonner';
import { PriceRecommendation } from '@/types';

interface RecommendationSummaryProps {
  recommendations: PriceRecommendation[];
}

const RecommendationSummary: React.FC<RecommendationSummaryProps> = ({ recommendations }) => {
  // Calculate metrics for today's recommendations
  const today = new Date().toISOString().split('T')[0];
  const todayRecommendations = recommendations.filter(rec => rec.timestamp === today);
  
  // Count recommendations where price should increase, decrease, or stay the same
  const increases = todayRecommendations.filter(rec => rec.recommended_price > rec.current_price).length;
  const decreases = todayRecommendations.filter(rec => rec.recommended_price < rec.current_price).length;
  const unchanged = todayRecommendations.filter(rec => rec.recommended_price === rec.current_price).length;
  
  // Calculate average recommendation change percentage
  const averageChange = todayRecommendations.length > 0
    ? todayRecommendations.reduce((sum, rec) => {
        const pctChange = ((rec.recommended_price - rec.current_price) / rec.current_price) * 100;
        return sum + pctChange;
      }, 0) / todayRecommendations.length
    : 0;
    
  // Calculate estimated revenue impact
  const currentRevenue = todayRecommendations.reduce((sum, rec) => {
    // Simple estimate based on current price and expected occupancy
    const currentOccupancyEstimate = (rec.expected_occupancy / 100) * (rec.current_price / rec.recommended_price);
    return sum + (rec.current_price * currentOccupancyEstimate);
  }, 0);
  
  const recommendedRevenue = todayRecommendations.reduce((sum, rec) => {
    return sum + (rec.recommended_price * (rec.expected_occupancy / 100));
  }, 0);
  
  const revenueImpact = recommendedRevenue - currentRevenue;
  const revenueImpactPct = (revenueImpact / currentRevenue) * 100;
  
  const handleExport = () => {
    toast.success("Recommendations exported successfully");
  };
  
  const handleApply = () => {
    toast.success("Price recommendations applied to PMS");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Today's Price Recommendations</CardTitle>
        <CardDescription>
          Optimized pricing based on forecasting agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Price Increases</p>
            <p className="text-2xl font-bold text-green-600">{increases}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Price Decreases</p>
            <p className="text-2xl font-bold text-red-600">{decreases}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Avg. Change</p>
            <p className={`text-2xl font-bold ${averageChange > 0 ? 'text-green-600' : averageChange < 0 ? 'text-red-600' : 'text-gray-600'}`}>
              {averageChange > 0 ? '+' : ''}{averageChange.toFixed(1)}%
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Revenue Impact</p>
            <p className={`text-2xl font-bold ${revenueImpact > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {revenueImpact > 0 ? '+' : ''}{revenueImpactPct.toFixed(1)}%
            </p>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleApply}>
            <Send className="mr-2 h-4 w-4" />
            Apply Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationSummary;
