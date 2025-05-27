
import { Agent, AgentForecast, ForecastData, PriceRecommendation, RoomType, CustomerSegment } from '../types';
import { agentSubFactors } from './agentSubFactors';

// Define agents
export const agents: Agent[] = [
  {
    id: 'demand',
    name: 'Demand Agent',
    description: 'Predicts future room demand based on historical bookings, seasonality, and events',
    color: '#3b82f6', // blue
    enabled: true,
    subFactors: agentSubFactors.demand
  },
  {
    id: 'elasticity',
    name: 'Elasticity Agent',
    description: 'Estimates price elasticity across room types and customer segments',
    color: '#10b981', // green
    enabled: true,
    subFactors: agentSubFactors.elasticity
  },
  {
    id: 'ltb',
    name: 'Look-to-Book Agent',
    description: 'Predicts conversion rate based on traffic and booking trends',
    color: '#8b5cf6', // purple
    enabled: true,
    subFactors: agentSubFactors.ltb
  },
  {
    id: 'trend',
    name: 'Price Trend Agent',
    description: 'Projects future average prices using time-series analysis',
    color: '#ef4444', // red
    enabled: true,
    subFactors: agentSubFactors.trend
  },
  {
    id: 'event',
    name: 'Event Impact Agent',
    description: 'Quantifies the impact of nearby events on demand',
    color: '#f97316', // orange
    enabled: true,
    subFactors: agentSubFactors.event
  },
  {
    id: 'weather',
    name: 'Weather Impact Agent',
    description: 'Estimates the influence of weather conditions on room occupancy',
    color: '#06b6d4', // cyan
    enabled: true,
    subFactors: agentSubFactors.weather
  },
  {
    id: 'cost',
    name: 'Cost Agent',
    description: 'Forecasts operational costs to maintain profitability',
    color: '#64748b', // slate
    enabled: true,
    subFactors: agentSubFactors.cost
  }
];

// Generate dates for the next 30 days
const generateDates = (days: number) => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

const dates = generateDates(30);

// Create a consistent set of market conditions for logical data generation
const marketConditions = dates.map((date, index) => {
  const day = new Date(date).getDay();
  const isWeekend = day === 0 || day === 6;
  const isHoliday = Math.random() < 0.05; // 5% chance of holiday
  const hasEvent = Math.random() < 0.15; // 15% chance of event
  const seasonalFactor = Math.sin((index / 30) * Math.PI * 2) * 0.3 + 1; // Seasonal cycle
  const trendFactor = 1 + (index * 0.002); // Slight upward trend
  
  return {
    date,
    index,
    isWeekend,
    isHoliday,
    hasEvent,
    seasonalFactor,
    trendFactor,
    baseWeatherScore: Math.sin(index / 7 * Math.PI) * 15, // Weekly weather pattern
    economicSentiment: 0.8 + Math.sin(index / 15 * Math.PI) * 0.2 // Economic cycle
  };
});

// Generate agent forecasts with logical consistency
export const generateAgentForecasts = (agentId: string): AgentForecast[] => {
  const forecasts: AgentForecast[] = [];
  
  marketConditions.forEach((condition) => {
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
        
      case 'elasticity':
        // Price elasticity: -0.8 to -2.5 (more negative = more elastic)
        value = -1.5;
        if (condition.isWeekend) value *= 0.7; // Less elastic on weekends
        if (condition.hasEvent) value *= 0.6; // Less elastic during events
        value *= condition.economicSentiment; // Economic conditions affect elasticity
        value = Math.max(-3, Math.min(-0.5, value + (Math.random() - 0.5) * 0.3));
        confidenceRange = 0.4;
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
    const costForecasts = generateAgentForecasts('cost');
    
    return {
      timestamp: condition.date,
      predicted_demand: Math.round(demandForecasts[condition.index].value),
      price_elasticity: elasticityForecasts[condition.index].value,
      look_to_book_ratio: ltbForecasts[condition.index].value,
      trend_price: trendForecasts[condition.index].value,
      weather_impact: weatherForecasts[condition.index].value,
      event_boost: eventForecasts[condition.index].value,
      cost_estimate: costForecasts[condition.index].value
    };
  });
};

// Room types
export const roomTypes: RoomType[] = [
  { id: 'standard', name: 'Standard Room', basePrice: 100, capacity: 2, inventory: 50 },
  { id: 'deluxe', name: 'Deluxe Room', basePrice: 150, capacity: 2, inventory: 30 },
  { id: 'suite', name: 'Suite', basePrice: 250, capacity: 4, inventory: 15 },
  { id: 'executive', name: 'Executive Suite', basePrice: 350, capacity: 4, inventory: 5 }
];

// Customer segments
export const customerSegments: CustomerSegment[] = [
  { id: 'default', name: 'Standard Rate', priceMultiplier: 1.0, description: 'Regular booking rate' },
  { id: 'member', name: 'Loyalty Member', priceMultiplier: 0.9, description: 'Hotel loyalty program members' },
  { id: 'corporate', name: 'Corporate', priceMultiplier: 0.85, description: 'Business travelers with negotiated rates' },
  { id: 'package', name: 'Package Deal', priceMultiplier: 0.95, description: 'Booking as part of a travel package' }
];

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

// Pre-generate forecast data
export const forecastData = generateForecastData();
export const priceRecommendations = generatePriceRecommendations();
