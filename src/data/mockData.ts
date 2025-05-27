
import { Agent } from '../types';
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

// Re-export everything from the refactored files
export { generateAgentForecasts } from './agentForecasts';
export { roomTypes, customerSegments } from './roomData';
export { generateForecastData, generatePriceRecommendations } from './priceRecommendations';

// Pre-generate data for immediate use
export const forecastData = (() => {
  const { generateForecastData } = require('./priceRecommendations');
  return generateForecastData();
})();

export const priceRecommendations = (() => {
  const { generatePriceRecommendations } = require('./priceRecommendations');
  return generatePriceRecommendations();
})();
