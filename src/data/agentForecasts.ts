
import { AgentForecast } from '../types';
import { marketConditions, MarketCondition } from './marketConditions';

// Generate agent forecasts with logical consistency
export const generateAgentForecasts = (agentId: string): AgentForecast[] => {
  const forecasts: AgentForecast[] = [];
  
  marketConditions.forEach((condition: MarketCondition) => {
    let value: number;
    let confidenceRange: number;
    
    switch (agentId) {
      case 'demand':
        // Base demand: 60-100, higher on weekends/holidays/events
        value = 70 * condition.seasonalFactor * condition.trendFactor;
        if (condition.isWeekend) value *= 1.25;
        if (condition.isHoliday) value *= 1.4;
        if (condition.hasEvent) value *= 1.3;
        value = Math.min(100, Math.max(40, value + (Math.random() - 0.5) * 8));
        confidenceRange = 8;
        break;
        
      case 'elasticity-graph':
        // Combined elasticity and competitor impact: -0.8 to -2.5 (more negative = more elastic)
        value = -1.5;
        if (condition.isWeekend) value *= 0.7; // Less elastic on weekends
        if (condition.hasEvent) value *= 0.6; // Less elastic during events
        value *= condition.economicSentiment; // Economic conditions affect elasticity
        
        // Add competitor impact (competitive pressure affects elasticity)
        const competitorPressure = Math.sin(condition.index / 10) * 0.3;
        value += competitorPressure;
        
        value = Math.max(-3, Math.min(-0.5, value + (Math.random() - 0.5) * 0.3));
        confidenceRange = 0.5;
        break;
        
      case 'ltb':
        // Look-to-book ratio: 0.05 to 0.20
        value = 0.12 * condition.economicSentiment;
        if (condition.isWeekend) value *= 1.3; // Higher conversion on weekends
        if (condition.hasEvent) value *= 1.4; // Higher conversion during events
        value = Math.max(0.05, Math.min(0.25, value + (Math.random() - 0.5) * 0.03));
        confidenceRange = 0.02;
        break;
        
      case 'trend':
        // Price trend: $80-$150
        value = 100 * condition.seasonalFactor * condition.trendFactor;
        if (condition.isWeekend) value *= 1.2;
        if (condition.hasEvent) value *= 1.25;
        value = Math.max(80, Math.min(150, value + (Math.random() - 0.5) * 10));
        confidenceRange = 12;
        break;
        
      case 'event':
        // Event boost: 0-30% (only when there's an event)
        value = condition.hasEvent ? 15 + Math.random() * 20 : Math.random() * 3;
        if (condition.isHoliday) value += 10;
        confidenceRange = condition.hasEvent ? 8 : 2;
        break;
        
      case 'weather':
        // Weather impact: -15 to +15
        value = condition.baseWeatherScore;
        // Extreme weather reduces bookings
        if (Math.abs(value) > 12) value *= 1.5;
        value = Math.max(-20, Math.min(20, value + (Math.random() - 0.5) * 6));
        confidenceRange = 5;
        break;
        
      case 'macro':
        // Macro impact: -5 to +5 (economic conditions)
        value = condition.economicSentiment * 10 - 5; // Convert to -5 to +5 range
        value += Math.sin(condition.index / 20) * 2; // Economic cycles
        value = Math.max(-8, Math.min(8, value + (Math.random() - 0.5) * 2));
        confidenceRange = 3;
        break;
        
      case 'cost':
        // Operational cost: $30-$60 per room
        value = 40 * condition.trendFactor; // Costs trend upward
        if (condition.isWeekend) value *= 1.1; // Higher weekend costs
        value = Math.max(30, Math.min(60, value + (Math.random() - 0.5) * 4));
        confidenceRange = 6;
        break;
        
      default:
        value = 50;
        confidenceRange = 10;
    }
    
    // Calculate confidence interval
    const lowerBound = value - confidenceRange / 2;
    const upperBound = value + confidenceRange / 2;
    
    forecasts.push({
      timestamp: condition.date,
      value: parseFloat(value.toFixed(2)),
      confidence: [parseFloat(lowerBound.toFixed(2)), parseFloat(upperBound.toFixed(2))]
    });
  });
  
  return forecasts;
};
