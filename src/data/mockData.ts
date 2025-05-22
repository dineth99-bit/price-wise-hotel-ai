
import { Agent, AgentForecast, ForecastData, PriceRecommendation, RoomType, CustomerSegment } from '../types';

// Define agents
export const agents: Agent[] = [
  {
    id: 'demand',
    name: 'Demand Agent',
    description: 'Predicts future room demand based on historical bookings, seasonality, and events',
    color: '#3b82f6', // blue
    enabled: true
  },
  {
    id: 'elasticity',
    name: 'Elasticity Agent',
    description: 'Estimates price elasticity across room types and customer segments',
    color: '#10b981', // green
    enabled: true
  },
  {
    id: 'ltb',
    name: 'Look-to-Book Agent',
    description: 'Predicts conversion rate based on traffic and booking trends',
    color: '#8b5cf6', // purple
    enabled: true
  },
  {
    id: 'trend',
    name: 'Price Trend Agent',
    description: 'Projects future average prices using time-series analysis',
    color: '#ef4444', // red
    enabled: true
  },
  {
    id: 'event',
    name: 'Event Impact Agent',
    description: 'Quantifies the impact of nearby events on demand',
    color: '#f97316', // orange
    enabled: true
  },
  {
    id: 'weather',
    name: 'Weather Impact Agent',
    description: 'Estimates the influence of weather conditions on room occupancy',
    color: '#06b6d4', // cyan
    enabled: true
  },
  {
    id: 'cost',
    name: 'Cost Agent',
    description: 'Forecasts operational costs to maintain profitability',
    color: '#64748b', // slate
    enabled: true
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

// Generate agent forecasts
export const generateAgentForecasts = (agentId: string): AgentForecast[] => {
  const forecasts: AgentForecast[] = [];
  
  // Base values and trends for each agent
  const baseValues: Record<string, number> = {
    demand: 80,
    elasticity: -1.5,
    ltb: 0.12,
    trend: 100,
    event: 0,
    weather: 0,
    cost: 40
  };
  
  // Day-to-day variation for each agent
  const variations: Record<string, number> = {
    demand: 10,
    elasticity: 0.2,
    ltb: 0.02,
    trend: 5,
    event: 5,
    weather: 3,
    cost: 2
  };
  
  // Weekly patterns (weekend effect)
  const weekendEffects: Record<string, number> = {
    demand: 15,
    elasticity: -0.3,
    ltb: 0.05,
    trend: 20,
    event: 10,
    weather: 0,
    cost: 5
  };
  
  dates.forEach((date, index) => {
    const day = new Date(date).getDay();
    const isWeekend = day === 0 || day === 6;
    
    // Base value with some randomness
    let value = baseValues[agentId] + (Math.random() - 0.5) * variations[agentId];
    
    // Add weekend effect
    if (isWeekend) {
      value += weekendEffects[agentId];
    }
    
    // Add special events (random spikes)
    if (Math.random() > 0.9 && agentId === 'event') {
      value += Math.random() * 20;
    }
    
    // Add trend over time (slight increase)
    value += index * (variations[agentId] / 10);
    
    // Generate confidence interval
    const confidenceRange = variations[agentId] * 0.8;
    const lowerBound = value - confidenceRange / 2;
    const upperBound = value + confidenceRange / 2;
    
    forecasts.push({
      timestamp: date,
      value,
      confidence: [lowerBound, upperBound]
    });
  });
  
  return forecasts;
};

// Generate combined forecast data
export const generateForecastData = (): ForecastData[] => {
  return dates.map((date, index) => {
    const day = new Date(date).getDay();
    const isWeekend = day === 0 || day === 6;
    
    // Base data with weekly patterns
    let demand = 80 + (isWeekend ? 15 : 0) + (Math.random() - 0.5) * 10;
    let elasticity = -1.5 + (isWeekend ? -0.3 : 0) + (Math.random() - 0.5) * 0.2;
    let ltb = 0.12 + (isWeekend ? 0.05 : 0) + (Math.random() - 0.5) * 0.02;
    let trend = 100 + (isWeekend ? 20 : 0) + (Math.random() - 0.5) * 5;
    let cost = 40 + (isWeekend ? 5 : 0) + (Math.random() - 0.5) * 2;
    
    // Random events
    let event = 0;
    if (Math.random() > 0.85) {
      event = Math.random() * 25;
    }
    
    // Weather impact (seasonal pattern)
    let weather = Math.sin(index / 15 * Math.PI) * 10;
    
    // Add trend over time
    demand += index * 0.2;
    trend += index * 0.5;
    
    return {
      timestamp: date,
      predicted_demand: Math.round(demand),
      price_elasticity: parseFloat(elasticity.toFixed(2)),
      look_to_book_ratio: parseFloat(ltb.toFixed(2)),
      trend_price: parseFloat(trend.toFixed(1)),
      weather_impact: parseFloat(weather.toFixed(1)),
      event_boost: parseFloat(event.toFixed(1)),
      cost_estimate: parseFloat(cost.toFixed(1))
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

// Generate price recommendations
export const generatePriceRecommendations = (): PriceRecommendation[] => {
  const recommendations: PriceRecommendation[] = [];
  
  roomTypes.forEach(room => {
    customerSegments.forEach(segment => {
      dates.forEach((date, index) => {
        const day = new Date(date).getDay();
        const isWeekend = day === 0 || day === 6;
        
        // Base price with adjustments
        const basePrice = room.basePrice * segment.priceMultiplier;
        const weekendMultiplier = isWeekend ? 1.25 : 1;
        const trendFactor = 1 + (index * 0.005); // Slight upward trend
        
        // Current price (what was set previously)
        const currentPrice = Math.round(basePrice * weekendMultiplier * (1 + (Math.random() - 0.5) * 0.1));
        
        // Recommended price with optimization
        const forecastData = generateForecastData()[index];
        const demandFactor = forecastData.predicted_demand / 80;
        const elasticityAdjustment = -1 / forecastData.price_elasticity * 0.1;
        const eventAdjustment = forecastData.event_boost > 0 ? (forecastData.event_boost / 100) : 0;
        const weatherAdjustment = forecastData.weather_impact / 100;
        
        const recommendedPrice = Math.round(
          basePrice * 
          weekendMultiplier * 
          trendFactor *
          (1 + demandFactor * 0.2) * 
          (1 + elasticityAdjustment) *
          (1 + eventAdjustment) *
          (1 + weatherAdjustment)
        );
        
        // Calculate min and max prices
        const minPrice = Math.round(basePrice * 0.8);
        const maxPrice = Math.round(basePrice * 1.5);
        
        // Calculate expected metrics
        const priceRatio = recommendedPrice / currentPrice;
        const elasticityImpact = priceRatio ** forecastData.price_elasticity;
        const expectedOccupancy = Math.min(0.95, forecastData.predicted_demand / 100 * elasticityImpact);
        const expectedRevenue = recommendedPrice * expectedOccupancy * room.inventory;
        
        recommendations.push({
          timestamp: date,
          room_type: room.id,
          segment: segment.id,
          recommended_price: recommendedPrice,
          min_price: minPrice,
          max_price: maxPrice,
          current_price: currentPrice,
          expected_occupancy: parseFloat((expectedOccupancy * 100).toFixed(1)),
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
