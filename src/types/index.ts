// Agent Types
export type AgentType = 'demand' | 'elasticity' | 'ltb' | 'trend' | 'event' | 'weather' | 'cost';

export interface SubFactor {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  impact: number; // Percentage impact on the main agent forecast
}

export interface Agent {
  id: AgentType;
  name: string;
  description: string;
  color: string;
  enabled: boolean;
  subFactors: SubFactor[];
}

export interface AgentForecast {
  timestamp: string;
  value: number;
  confidence?: [number, number]; // Lower and upper bounds for confidence interval
}

// Data Types
export interface ForecastData {
  timestamp: string;
  predicted_demand: number;
  price_elasticity: number;
  look_to_book_ratio: number;
  trend_price: number;
  weather_impact: number;
  event_boost: number;
  cost_estimate: number;
}

export interface PriceRecommendation {
  timestamp: string;
  room_type: string;
  segment: string;
  recommended_price: number;
  min_price: number;
  max_price: number;
  current_price: number;
  expected_occupancy: number;
  expected_revenue: number;
}

// Optimization Constraints
export interface OptimizationConstraints {
  min_price: number;
  max_price: number;
  min_profit_margin: number;
  max_price_change: number; // Maximum allowed price change in percentage
  occupancy_target: number; // Target occupancy percentage
  algorithm?: string;
}

// Room Types
export interface RoomType {
  id: string;
  name: string;
  basePrice: number;
  capacity: number;
  inventory: number;
  description?: string; // Added this property
}

// Customer Segments
export interface CustomerSegment {
  id: string;
  name: string;
  priceMultiplier: number;
  description: string;
  priceSensitivity?: string; // Added this property
  averageBookingValue?: number; // Added this property
  specialConditions?: string[]; // Added this property
}
