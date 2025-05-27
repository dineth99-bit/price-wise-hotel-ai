
// Generate dates for the next 30 days
export const generateDates = (days: number) => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

export interface MarketCondition {
  date: string;
  index: number;
  isWeekend: boolean;
  isHoliday: boolean;
  hasEvent: boolean;
  seasonalFactor: number;
  trendFactor: number;
  baseWeatherScore: number;
  economicSentiment: number;
}

// Create a consistent set of market conditions for logical data generation
export const generateMarketConditions = (dates: string[]): MarketCondition[] => {
  return dates.map((date, index) => {
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
};

export const dates = generateDates(30);
export const marketConditions = generateMarketConditions(dates);
