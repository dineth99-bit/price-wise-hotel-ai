import { Agent } from '../types';
import { agentSubFactors } from './agentSubFactors';

// Define agents with updated naming and mission statements
export const agents: Agent[] = [
  {
    id: 'demand',
    name: 'Demand-Series Agent',
    description: 'Model the "internal physics" of bookings when nothing external changes',
    color: '#3b82f6', // blue
    enabled: true,
    subFactors: agentSubFactors.demand
  },
  {
    id: 'elasticity-graph',
    name: 'Elasticity-Graph Intelligent Agent',
    description: 'Quantify how demand moves when we change price and track rival behaviour that cannibalises demand',
    color: '#10b981', // green
    enabled: true,
    subFactors: agentSubFactors['elasticity-graph']
  },
  {
    id: 'ltb',
    name: 'Look-to-Book Agent',
    description: 'Convert website/app traffic into booking probabilities',
    color: '#8b5cf6', // purple
    enabled: true,
    subFactors: agentSubFactors.ltb
  },
  {
    id: 'trend',
    name: 'Price-Trend Agent',
    description: 'Forecast the market average ADR we benchmark against',
    color: '#ef4444', // red
    enabled: true,
    subFactors: agentSubFactors.trend
  },
  {
    id: 'event',
    name: 'Event-Impact Agent',
    description: 'Add deterministic lifts/dips from local happenings',
    color: '#f97316', // orange
    enabled: true,
    subFactors: agentSubFactors.event
  },
  {
    id: 'weather',
    name: 'Weather-Impact Agent',
    description: 'Translate weather into room-night deltas',
    color: '#06b6d4', // cyan
    enabled: true,
    subFactors: agentSubFactors.weather
  },
  {
    id: 'macro',
    name: 'Macro-Economy Agent',
    description: 'Capture macro head-winds / tail-winds',
    color: '#84cc16', // lime
    enabled: true,
    subFactors: agentSubFactors.macro
  },
  {
    id: 'cost',
    name: 'Cost-Structure Agent',
    description: 'Forecast cost components for profit optimisation',
    color: '#64748b', // slate
    enabled: true,
    subFactors: agentSubFactors.cost
  }
];

// Re-export everything from the refactored files
export { generateAgentForecasts } from './agentForecasts';
export { roomTypes, customerSegments } from './roomData';
export { generateForecastData, generatePriceRecommendations } from './priceRecommendations';

// Pre-generate data for immediate use using proper ES6 imports
import { generateForecastData, generatePriceRecommendations } from './priceRecommendations';

export const forecastData = generateForecastData();
export const priceRecommendations = generatePriceRecommendations();
