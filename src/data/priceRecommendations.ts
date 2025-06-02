
import { PriceRecommendation, ForecastData } from '../types';
import { roomTypes, customerSegments } from './roomData';
import { marketConditions } from './marketConditions';
import { generateAgentForecasts } from './agentForecasts';

// Generate combined forecast data using the same market conditions
export const generateForecastData = (): ForecastData[] => {
  return marketConditions.map((condition) => {
    // Use the same logic as individual agents for consistency
    const demandForecasts = generateAgentForecasts('demand');
    const elasticityForecasts = generateAgentForecasts('elasticity');
    const ltbForecasts = generateAgentForecasts('ltb');
    const trendForecasts = generateAgentForecasts('trend');
    const eventForecasts = generateAgentForecasts('event');
    const weatherForecasts = generateAgentForecasts('weather');
    const competitorForecasts = generateAgentForecasts('competitor');
    const macroForecasts = generateAgentForecasts('macro');
    const costForecasts = generateAgentForecasts('cost');
    
    return {
      timestamp: condition.date,
      predicted_demand: Math.round(demandForecasts[condition.index].value),
      price_elasticity: elasticityForecasts[condition.index].value,
      look_to_book_ratio: ltbForecasts[condition.index].value,
      trend_price: trendForecasts[condition.index].value,
      weather_impact: weatherForecasts[condition.index].value,
      event_boost: eventForecasts[condition.index].value,
      competitor_impact: competitorForecasts[condition.index].value,
      macro_impact: macroForecasts[condition.index].value,
      cost_estimate: costForecasts[condition.index].value
    };
  });
};

// Generate price recommendations using consistent forecast data
export const generatePriceRecommendations = (): PriceRecommendation[] => {
  const recommendations: PriceRecommendation[] = [];
  const forecastData = generateForecastData();
  
  roomTypes.forEach(room => {
    customerSegments.forEach(segment => {
      forecastData.forEach((forecast, index) => {
        const condition = marketConditions[index];
        
        // Base price with segment adjustment
        const basePrice = room.basePrice * segment.priceMultiplier;
        
        // Calculate current price (what was previously set)
        let currentPrice = basePrice;
        if (condition.isWeekend) currentPrice *= 1.15;
        if (condition.hasEvent) currentPrice *= 1.1;
        currentPrice = Math.round(currentPrice + (Math.random() - 0.5) * basePrice * 0.1);
        
        // Calculate optimized recommended price using all forecast factors
        let recommendedPrice = basePrice;
        
        // Apply demand factor
        const demandFactor = forecast.predicted_demand / 80; // Normalize around 80% demand
        recommendedPrice *= (1 + (demandFactor - 1) * 0.3);
        
        // Apply elasticity factor
        const elasticityAdjustment = Math.abs(forecast.price_elasticity) > 2 ? 0.9 : 1.1;
        recommendedPrice *= elasticityAdjustment;
        
        // Apply look-to-book factor
        const ltbAdjustment = 1 + (forecast.look_to_book_ratio - 0.12) * 2;
        recommendedPrice *= ltbAdjustment;
        
        // Apply trend factor
        recommendedPrice *= (forecast.trend_price / 100);
        
        // Apply event boost
        if (forecast.event_boost > 5) {
          recommendedPrice *= (1 + forecast.event_boost / 100);
        }
        
        // Apply weather impact
        recommendedPrice *= (1 + forecast.weather_impact / 200);
        
        // Ensure minimum profit margin above cost
        const minPriceWithMargin = forecast.cost_estimate * 1.3; // 30% minimum margin
        recommendedPrice = Math.max(recommendedPrice, minPriceWithMargin);
        
        recommendedPrice = Math.round(recommendedPrice);
        
        // Calculate min and max prices
        const minPrice = Math.round(basePrice * 0.75);
        const maxPrice = Math.round(basePrice * 1.8);
        
        // Calculate expected metrics
        const priceRatio = recommendedPrice / Math.max(currentPrice, 1);
        const elasticityImpact = Math.pow(priceRatio, forecast.price_elasticity);
        const expectedOccupancy = Math.min(95, Math.max(10, 
          (forecast.predicted_demand / 100) * elasticityImpact * 100
        ));
        const expectedRevenue = recommendedPrice * (expectedOccupancy / 100) * room.inventory;
        
        recommendations.push({
          timestamp: forecast.timestamp,
          room_type: room.id,
          segment: segment.id,
          recommended_price: recommendedPrice,
          min_price: minPrice,
          max_price: maxPrice,
          current_price: currentPrice,
          expected_occupancy: parseFloat(expectedOccupancy.toFixed(1)),
          expected_revenue: Math.round(expectedRevenue)
        });
      });
    });
  });
  
  return recommendations;
};
