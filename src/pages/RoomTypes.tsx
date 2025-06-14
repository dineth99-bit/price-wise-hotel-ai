import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EditIcon, Plus, TagIcon } from 'lucide-react';
import { roomTypes } from '@/data/mockData';
import HotelMappingManager from '@/components/room-mapping/HotelMappingManager';

// Room type images mapping with more meaningful images
const roomTypeImages = {
  'standard': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop', // Standard hotel room with clean bed
  'deluxe': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop', // Deluxe room with city view
  'suite': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop', // Luxury suite with living area
  'executive': 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop' // Executive suite with premium furnishing
};

interface CompetitorHotel {
  id: string;
  name: string;
}

interface RoomMapping {
  yourRoomType: string;
  competitorRoomTypes: string[];
}

// Initial competitor hotels
const initialCompetitorHotels: CompetitorHotel[] = [
  { id: 'marriott', name: 'Marriott Downtown' },
  { id: 'hilton', name: 'Hilton City Center' },
  { id: 'hyatt', name: 'Hyatt Regency' },
  { id: 'sheraton', name: 'Sheraton Grand' }
];

// Initial mappings with examples of many-to-one relationships
const initialMappings: Record<string, RoomMapping[]> = {
  'marriott': [
    { yourRoomType: 'standard', competitorRoomTypes: ['Standard King Room', 'Standard Queen Room'] },
    { yourRoomType: 'deluxe', competitorRoomTypes: ['Deluxe Room with City View'] },
    { yourRoomType: 'suite', competitorRoomTypes: ['Executive Suite', 'Junior Suite'] },
    { yourRoomType: 'executive', competitorRoomTypes: ['Presidential Suite'] }
  ],
  'hilton': [
    { yourRoomType: 'standard', competitorRoomTypes: ['Guest Room'] },
    { yourRoomType: 'deluxe', competitorRoomTypes: ['Premium Room', 'Premium King'] },
    { yourRoomType: 'suite', competitorRoomTypes: ['Business Suite'] },
    { yourRoomType: 'executive', competitorRoomTypes: ['Executive Suite', 'Presidential Suite'] }
  ],
  'hyatt': [
    { yourRoomType: 'standard', competitorRoomTypes: ['Standard Room', 'Classic Room'] },
    { yourRoomType: 'deluxe', competitorRoomTypes: ['Deluxe King'] },
    { yourRoomType: 'suite', competitorRoomTypes: ['Regency Suite'] },
    { yourRoomType: 'executive', competitorRoomTypes: ['Ambassador Suite', 'Grand Suite'] }
  ],
  'sheraton': [
    { yourRoomType: 'standard', competitorRoomTypes: ['Traditional Room'] },
    { yourRoomType: 'deluxe', competitorRoomTypes: ['Club Room', 'Premium Club'] },
    { yourRoomType: 'suite', competitorRoomTypes: ['Sheraton Suite'] },
    { yourRoomType: 'executive', competitorRoomTypes: ['Grand Suite', 'Royal Suite'] }
  ]
};

const RoomTypes: React.FC = () => {
  const [competitorHotels, setCompetitorHotels] = useState<CompetitorHotel[]>(initialCompetitorHotels);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('');
  const [mappings, setMappings] = useState<Record<string, RoomMapping[]>>(initialMappings);

  const handleAddHotel = (hotel: CompetitorHotel) => {
    setCompetitorHotels(prev => [...prev, hotel]);
    // Initialize empty mappings for the new hotel
    setMappings(prev => ({
      ...prev,
      [hotel.id]: []
    }));
  };

  const handleUpdateMappings = (competitorId: string, newMappings: RoomMapping[]) => {
    setMappings(prev => ({
      ...prev,
      [competitorId]: newMappings
    }));
  };
  
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
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
        <HotelMappingManager
          competitorHotels={competitorHotels}
          yourRoomTypes={roomTypes}
          onAddHotel={handleAddHotel}
          selectedCompetitor={selectedCompetitor}
          onSelectCompetitor={setSelectedCompetitor}
          mappings={mappings}
          onUpdateMappings={handleUpdateMappings}
        />
      </div>
    </AppLayout>
  );
};

export default RoomTypes;
