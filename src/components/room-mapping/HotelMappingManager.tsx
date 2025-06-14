
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, X, Building2, BarChart, List } from 'lucide-react';
import MappingGraph from './MappingGraph';

interface CompetitorHotel {
  id: string;
  name: string;
}

interface RoomMapping {
  yourRoomType: string;
  competitorRoomTypes: string[];
}

interface HotelMappingManagerProps {
  competitorHotels: CompetitorHotel[];
  yourRoomTypes: { id: string; name: string }[];
  onAddHotel: (hotel: CompetitorHotel) => void;
  selectedCompetitor: string;
  onSelectCompetitor: (competitorId: string) => void;
  mappings: Record<string, RoomMapping[]>;
  onUpdateMappings: (competitorId: string, mappings: RoomMapping[]) => void;
}

const HotelMappingManager: React.FC<HotelMappingManagerProps> = ({
  competitorHotels,
  yourRoomTypes,
  onAddHotel,
  selectedCompetitor,
  onSelectCompetitor,
  mappings,
  onUpdateMappings
}) => {
  const [newHotelName, setNewHotelName] = useState('');
  const [showAddHotel, setShowAddHotel] = useState(false);
  // Change to track input per room type
  const [newRoomTypes, setNewRoomTypes] = useState<Record<string, string>>({});

  const handleAddHotel = () => {
    if (newHotelName.trim()) {
      const newHotel: CompetitorHotel = {
        id: newHotelName.toLowerCase().replace(/\s+/g, '-'),
        name: newHotelName
      };
      onAddHotel(newHotel);
      setNewHotelName('');
      setShowAddHotel(false);
    }
  };

  const currentMappings = mappings[selectedCompetitor] || [];

  const addRoomTypeMapping = (yourRoomTypeId: string) => {
    const newRoomType = newRoomTypes[yourRoomTypeId];
    if (newRoomType?.trim()) {
      const updatedMappings = [...currentMappings];
      const existingMapping = updatedMappings.find(m => m.yourRoomType === yourRoomTypeId);
      
      if (existingMapping) {
        existingMapping.competitorRoomTypes.push(newRoomType);
      } else {
        updatedMappings.push({
          yourRoomType: yourRoomTypeId,
          competitorRoomTypes: [newRoomType]
        });
      }
      
      onUpdateMappings(selectedCompetitor, updatedMappings);
      // Clear only this specific input
      setNewRoomTypes(prev => ({ ...prev, [yourRoomTypeId]: '' }));
    }
  };

  const removeRoomTypeMapping = (yourRoomTypeId: string, competitorRoomType: string) => {
    const updatedMappings = currentMappings.map(mapping => {
      if (mapping.yourRoomType === yourRoomTypeId) {
        return {
          ...mapping,
          competitorRoomTypes: mapping.competitorRoomTypes.filter(rt => rt !== competitorRoomType)
        };
      }
      return mapping;
    }).filter(mapping => mapping.competitorRoomTypes.length > 0);
    
    onUpdateMappings(selectedCompetitor, updatedMappings);
  };

  const getCompetitorRoomTypes = (yourRoomTypeId: string): string[] => {
    const mapping = currentMappings.find(m => m.yourRoomType === yourRoomTypeId);
    return mapping ? mapping.competitorRoomTypes : [];
  };

  const updateNewRoomType = (yourRoomTypeId: string, value: string) => {
    setNewRoomTypes(prev => ({ ...prev, [yourRoomTypeId]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-2">Room Types Mapping</h2>
          <p className="text-muted-foreground">
            Compare your room types with competitor hotels and manage mappings
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowAddHotel(!showAddHotel)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Hotel
        </Button>
      </div>

      {showAddHotel && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Competitor Hotel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Label htmlFor="hotel-name">Hotel Name:</Label>
              <Input
                id="hotel-name"
                value={newHotelName}
                onChange={(e) => setNewHotelName(e.target.value)}
                placeholder="Enter hotel name"
                className="flex-1"
              />
              <Button onClick={handleAddHotel} disabled={!newHotelName.trim()}>
                Add
              </Button>
              <Button variant="outline" onClick={() => setShowAddHotel(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-4">
        <Label className="text-sm font-medium">Select Competitor:</Label>
        <Select value={selectedCompetitor} onValueChange={onSelectCompetitor}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Choose a competitor hotel" />
          </SelectTrigger>
          <SelectContent>
            {competitorHotels.map((hotel) => (
              <SelectItem key={hotel.id} value={hotel.id}>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {hotel.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCompetitor && (
        <Tabs defaultValue="graph" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="graph" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Graph View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="graph" className="mt-6">
            <MappingGraph
              selectedCompetitor={selectedCompetitor}
              competitorHotels={competitorHotels}
              yourRoomTypes={yourRoomTypes}
              mappings={mappings}
            />
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Room Mapping: Your Hotel vs {competitorHotels.find(h => h.id === selectedCompetitor)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {yourRoomTypes.map((roomType) => (
                    <div key={roomType.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-blue-600">{roomType.name}</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-orange-600">
                          Mapped to {competitorHotels.find(h => h.id === selectedCompetitor)?.name}:
                        </Label>
                        
                        {getCompetitorRoomTypes(roomType.id).map((competitorRoomType, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                            <span>{competitorRoomType}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRoomTypeMapping(roomType.id, competitorRoomType)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="flex items-center gap-2 mt-2">
                          <Input
                            key={`${selectedCompetitor}-${roomType.id}`} // Unique key for each input
                            value={newRoomTypes[roomType.id] || ''}
                            onChange={(e) => updateNewRoomType(roomType.id, e.target.value)}
                            placeholder="Add competitor room type"
                            className="flex-1"
                          />
                          <Button
                            onClick={() => addRoomTypeMapping(roomType.id)}
                            disabled={!newRoomTypes[roomType.id]?.trim()}
                            size="sm"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default HotelMappingManager;
