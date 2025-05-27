
import { RoomType, CustomerSegment } from '../types';

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
