
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedIcon, EditIcon, Plus, TagIcon } from 'lucide-react';
import { roomTypes } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Room type images mapping
const roomTypeImages = {
  'standard': 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
  'deluxe': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
  'suite': 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
  'executive': 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop'
};

// Mock competitor hotels
const competitorHotels = [
  { id: 'marriott', name: 'Marriott Downtown' },
  { id: 'hilton', name: 'Hilton City Center' },
  { id: 'hyatt', name: 'Hyatt Regency' },
  { id: 'sheraton', name: 'Sheraton Grand' }
] as const;

type CompetitorId = typeof competitorHotels[number]['id'];
type RoomTypeId = 'standard' | 'deluxe' | 'suite' | 'executive';

// Mock mapping data
const roomMappings: Record<CompetitorId, Record<RoomTypeId, string>> = {
  'marriott': {
    'standard': 'Standard King Room',
    'deluxe': 'Deluxe Room with City View',
    'suite': 'Executive Suite',
    'executive': 'Presidential Suite'
  },
  'hilton': {
    'standard': 'Guest Room',
    'deluxe': 'Premium Room',
    'suite': 'Junior Suite',
    'executive': 'Executive Suite'
  },
  'hyatt': {
    'standard': 'Standard Room',
    'deluxe': 'Deluxe King',
    'suite': 'Regency Suite',
    'executive': 'Ambassador Suite'
  },
  'sheraton': {
    'standard': 'Traditional Room',
    'deluxe': 'Club Room',
    'suite': 'Sheraton Suite',
    'executive': 'Grand Suite'
  }
};

const RoomTypes: React.FC = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorId | ''>('');
  
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Room Types</h1>
            <p className="text-muted-foreground">
              Manage room categories and their pricing configurations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room Type
            </Button>
          </div>
        </div>

        {/* Room Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomTypes.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img
                  src={roomTypeImages[room.id as keyof typeof roomTypeImages] || roomTypeImages.standard}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{room.name}</span>
                  <span className="text-base font-normal text-blue-600">${room.basePrice}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TagIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Code: {room.id}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {room.description || "No description available"}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  <EditIcon className="mr-2 h-4 w-4" />
                  Edit Configuration
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Room Types Mapping Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-2">Room Types Mapping</h2>
            <p className="text-muted-foreground">
              Compare your room types with competitor hotels
            </p>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Select Competitor:</label>
            <Select value={selectedCompetitor} onValueChange={(value: CompetitorId) => setSelectedCompetitor(value)}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Choose a competitor hotel" />
              </SelectTrigger>
              <SelectContent>
                {competitorHotels.map((hotel) => (
                  <SelectItem key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCompetitor && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Room Mapping: Your Hotel vs {competitorHotels.find(h => h.id === selectedCompetitor)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-blue-600">Your Hotel</h3>
                    <div className="space-y-2">
                      {roomTypes.map((room) => (
                        <div key={room.id} className="p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">{room.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-orange-600">
                      {competitorHotels.find(h => h.id === selectedCompetitor)?.name}
                    </h3>
                    <div className="space-y-2">
                      {roomTypes.map((room) => (
                        <div key={room.id} className="p-3 bg-orange-50 rounded-lg">
                          <span className="font-medium">
                            {roomMappings[selectedCompetitor]?.[room.id as RoomTypeId] || 'No mapping available'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default RoomTypes;
