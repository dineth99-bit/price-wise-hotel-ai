
import { SubFactor } from '@/types';

export const agentSubFactors: Record<string, SubFactor[]> = {
  demand: [
    {
      id: 'day_of_week',
      name: 'Day-of-Week Seasonality',
      description: 'Fourier weekly patterns for booking behavior',
      enabled: true,
      impact: 35.2
    },
    {
      id: 'long_term_trend',
      name: 'Long-Term Trend',
      description: 'Logistic/spline modeling of historical booking trends',
      enabled: true,
      impact: 28.7
    },
    {
      id: 'lag_momentum',
      name: 'Lag Momentum',
      description: 'AR lags 1-14 days for booking momentum effects',
      enabled: true,
      impact: 22.1
    },
    {
      id: 'school_holiday',
      name: 'School-Holiday Calendar',
      description: 'Binary calendar flags for school holiday periods',
      enabled: true,
      impact: 14.0
    }
  ],
  elasticity: [
    {
      id: 'room_type_segment',
      name: 'Room-Type Segment',
      description: 'Price sensitivity by room category and guest type',
      enabled: true,
      impact: 42.3
    },
    {
      id: 'lead_time_bucket',
      name: 'Lead-Time Bucket',
      description: 'Elasticity varies by booking window (0-1, 2-7, 8-30 days)',
      enabled: true,
      impact: 31.5
    },
    {
      id: 'customer_class',
      name: 'Customer Class',
      description: 'Corporate, OTA, and leisure guest price sensitivity',
      enabled: true,
      impact: 26.2
    },
    {
      id: 'promotional_flag',
      name: 'Promotional Flag',
      description: 'Impact of promotional rates on demand elasticity',
      enabled: false,
      impact: 18.4
    }
  ],
  ltb: [
    {
      id: 'session_depth',
      name: 'Session Depth',
      description: 'Page views and dwell time indicating booking intent',
      enabled: true,
      impact: 38.9
    },
    {
      id: 'device_family',
      name: 'Device Family',
      description: 'Conversion rates vary by mobile, desktop, tablet usage',
      enabled: true,
      impact: 27.4
    },
    {
      id: 'referral_channel',
      name: 'Referral Channel',
      description: 'Booking probability by SEM, social, direct traffic',
      enabled: true,
      impact: 20.3
    },
    {
      id: 'payment_friction',
      name: 'Payment Friction',
      description: 'Failed card rate impact on conversion probability',
      enabled: true,
      impact: 13.4
    }
  ],
  trend: [
    {
      id: 'market_adr_index',
      name: 'Market ADR Index',
      description: 'STR reports and OTA scraping for market benchmarks',
      enabled: true,
      impact: 45.1
    },
    {
      id: 'hotel_supply_growth',
      name: 'Hotel Supply Growth',
      description: 'New rooms pipeline affecting market pricing',
      enabled: true,
      impact: 32.6
    },
    {
      id: 'tourism_arrivals',
      name: 'Tourism Arrivals YoY',
      description: 'Year-over-year tourism growth trends',
      enabled: true,
      impact: 22.3
    },
    {
      id: 'currency_fx_rate',
      name: 'Currency FX Rate',
      description: 'Foreign exchange impact for international guests',
      enabled: false,
      impact: 15.8
    }
  ],
  event: [
    {
      id: 'conferences_exhibitions',
      name: 'Conferences & Exhibitions',
      description: 'Business conferences and trade show impacts',
      enabled: true,
      impact: 34.7
    },
    {
      id: 'city_festivals',
      name: 'City Festivals',
      description: 'Local cultural and entertainment festivals',
      enabled: true,
      impact: 28.9
    },
    {
      id: 'major_sports_games',
      name: 'Major Sports Games',
      description: 'Professional and major sporting events',
      enabled: true,
      impact: 25.2
    },
    {
      id: 'public_holidays',
      name: 'Public Holidays',
      description: 'National and local holiday periods',
      enabled: true,
      impact: 11.2
    }
  ],
  weather: [
    {
      id: 'temperature_deviation',
      name: 'Temperature Deviation',
      description: '°C variance from seasonal norms affecting demand',
      enabled: true,
      impact: 41.8
    },
    {
      id: 'precipitation_probability',
      name: 'Precipitation Probability',
      description: 'Rain and severe weather impact on bookings',
      enabled: true,
      impact: 35.5
    },
    {
      id: 'severe_weather_alerts',
      name: 'Severe-Weather Alerts',
      description: 'Emergency weather warnings affecting travel',
      enabled: true,
      impact: 22.7
    },
    {
      id: 'uv_heat_index',
      name: 'UV / Heat Index',
      description: 'Heat index for resort and leisure demand',
      enabled: false,
      impact: 16.3
    }
  ],
  competitor: [
    {
      id: 'median_competitor_price',
      name: 'Median Competitor Price',
      description: 'Market positioning relative to competitor rates',
      enabled: true,
      impact: 42.1
    },
    {
      id: 'competitor_occupancy_proxy',
      name: 'Competitor Occupancy Proxy',
      description: 'Rate-closed flags indicating competitor demand',
      enabled: true,
      impact: 31.7
    },
    {
      id: 'promo_frequency',
      name: 'Promo Frequency',
      description: 'Competitor promotional activity frequency',
      enabled: true,
      impact: 26.2
    },
    {
      id: 'inventory_parity',
      name: 'Inventory Parity',
      description: 'Available rooms comparison across competitors',
      enabled: false,
      impact: 18.5
    }
  ],
  macro: [
    {
      id: 'gdp_yoy',
      name: 'GDP YoY',
      description: 'Year-over-year GDP growth affecting travel demand',
      enabled: true,
      impact: 38.4
    },
    {
      id: 'inflation_cpi',
      name: 'Inflation CPI',
      description: 'Consumer price index impact on discretionary spending',
      enabled: true,
      impact: 29.1
    },
    {
      id: 'unemployment_rate',
      name: 'Unemployment Rate',
      description: 'Employment levels affecting travel budgets',
      enabled: true,
      impact: 22.8
    },
    {
      id: 'consumer_sentiment',
      name: 'Consumer Sentiment Index',
      description: 'Consumer confidence and spending willingness',
      enabled: true,
      impact: 16.7
    }
  ],
  cost: [
    {
      id: 'operating_costs_per_room',
      name: 'Operating Costs per Occupied Room',
      description: 'Variable costs per occupied room night',
      enabled: true,
      impact: 39.4
    },
    {
      id: 'energy_cost_index',
      name: 'Energy Cost Index',
      description: 'Electricity, heating, and cooling cost trends',
      enabled: true,
      impact: 28.1
    },
    {
      id: 'labour_hourly_rate',
      name: 'Labour Hourly Rate',
      description: 'Staffing and service-related cost escalation',
      enabled: true,
      impact: 21.7
    },
    {
      id: 'maintenance_capex',
      name: 'Maintenance Cap-Ex Plan',
      description: 'Planned capital expenditure for property upkeep',
      enabled: false,
      impact: 10.8
    }
  ]
};
