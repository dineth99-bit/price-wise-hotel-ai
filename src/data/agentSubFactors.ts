
import { SubFactor } from '@/types';

export const agentSubFactors: Record<string, SubFactor[]> = {
  demand: [
    {
      id: 'seasonal',
      name: 'Seasonal Patterns',
      description: 'Historical booking patterns based on time of year',
      enabled: true,
      impact: 35.2
    },
    {
      id: 'historical',
      name: 'Historical Trends',
      description: 'Past booking data and occupancy rates',
      enabled: true,
      impact: 28.7
    },
    {
      id: 'market_events',
      name: 'Market Events',
      description: 'Local conferences, festivals, and attractions',
      enabled: true,
      impact: 22.1
    },
    {
      id: 'economic',
      name: 'Economic Indicators',
      description: 'GDP, employment rates, and consumer confidence',
      enabled: false,
      impact: 14.0
    }
  ],
  elasticity: [
    {
      id: 'competitor_pricing',
      name: 'Competitor Pricing',
      description: 'Pricing strategies of nearby hotels',
      enabled: true,
      impact: 42.3
    },
    {
      id: 'customer_segments',
      name: 'Customer Segments',
      description: 'Price sensitivity by customer type',
      enabled: true,
      impact: 31.5
    },
    {
      id: 'booking_window',
      name: 'Booking Window',
      description: 'Time between booking and check-in',
      enabled: true,
      impact: 26.2
    }
  ],
  ltb: [
    {
      id: 'website_behavior',
      name: 'Website Behavior',
      description: 'User interaction patterns and session data',
      enabled: true,
      impact: 38.9
    },
    {
      id: 'device_type',
      name: 'Device Type',
      description: 'Mobile vs desktop booking patterns',
      enabled: true,
      impact: 27.4
    },
    {
      id: 'search_patterns',
      name: 'Search Patterns',
      description: 'Room search criteria and filters used',
      enabled: true,
      impact: 20.3
    },
    {
      id: 'user_location',
      name: 'User Location',
      description: 'Geographic location of potential guests',
      enabled: false,
      impact: 13.4
    }
  ],
  trend: [
    {
      id: 'market_trends',
      name: 'Market Trends',
      description: 'Overall hospitality market pricing trends',
      enabled: true,
      impact: 45.1
    },
    {
      id: 'inflation',
      name: 'Inflation Rates',
      description: 'Economic inflation affecting pricing',
      enabled: true,
      impact: 32.6
    },
    {
      id: 'supply_demand',
      name: 'Supply & Demand',
      description: 'Local hotel inventory vs demand balance',
      enabled: true,
      impact: 22.3
    }
  ],
  event: [
    {
      id: 'conferences',
      name: 'Conferences',
      description: 'Business conferences and conventions',
      enabled: true,
      impact: 34.7
    },
    {
      id: 'festivals',
      name: 'Festivals',
      description: 'Music, food, and cultural festivals',
      enabled: true,
      impact: 28.9
    },
    {
      id: 'sports',
      name: 'Sports Events',
      description: 'Professional and amateur sporting events',
      enabled: true,
      impact: 25.2
    },
    {
      id: 'holidays',
      name: 'Public Holidays',
      description: 'National and local holiday periods',
      enabled: true,
      impact: 11.2
    }
  ],
  weather: [
    {
      id: 'temperature',
      name: 'Temperature',
      description: 'Current and forecasted temperature trends',
      enabled: true,
      impact: 41.8
    },
    {
      id: 'precipitation',
      name: 'Precipitation',
      description: 'Rain, snow, and severe weather conditions',
      enabled: true,
      impact: 35.5
    },
    {
      id: 'seasonal_weather',
      name: 'Seasonal Weather',
      description: 'Expected weather patterns for the season',
      enabled: true,
      impact: 22.7
    }
  ],
  cost: [
    {
      id: 'operational',
      name: 'Operational Costs',
      description: 'Daily operational expenses per room',
      enabled: true,
      impact: 39.4
    },
    {
      id: 'energy',
      name: 'Energy Costs',
      description: 'Electricity, heating, and cooling expenses',
      enabled: true,
      impact: 28.1
    },
    {
      id: 'labor',
      name: 'Labor Costs',
      description: 'Staffing and service-related expenses',
      enabled: true,
      impact: 21.7
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      description: 'Room upkeep and facility maintenance costs',
      enabled: false,
      impact: 10.8
    }
  ]
};
