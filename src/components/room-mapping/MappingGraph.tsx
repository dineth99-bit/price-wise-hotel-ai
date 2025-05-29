
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CompetitorHotel {
  id: string;
  name: string;
}

interface RoomMapping {
  yourRoomType: string;
  competitorRoomTypes: string[];
}

interface MappingGraphProps {
  selectedCompetitor: string;
  competitorHotels: CompetitorHotel[];
  yourRoomTypes: { id: string; name: string }[];
  mappings: Record<string, RoomMapping[]>;
}

const MappingGraph: React.FC<MappingGraphProps> = ({
  selectedCompetitor,
  competitorHotels,
  yourRoomTypes,
  mappings
}) => {
  const currentMappings = mappings[selectedCompetitor] || [];
  const selectedHotel = competitorHotels.find(h => h.id === selectedCompetitor);

  const getCompetitorRoomTypes = (yourRoomTypeId: string): string[] => {
    const mapping = currentMappings.find(m => m.yourRoomType === yourRoomTypeId);
    return mapping ? mapping.competitorRoomTypes : [];
  };

  const getAllCompetitorRoomTypes = () => {
    const allTypes = new Set<string>();
    currentMappings.forEach(mapping => {
      mapping.competitorRoomTypes.forEach(type => allTypes.add(type));
    });
    return Array.from(allTypes);
  };

  const allCompetitorTypes = getAllCompetitorRoomTypes();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Room Mapping Graph: Your Hotel vs {selectedHotel?.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-start gap-8 min-h-[400px]">
          {/* Your Hotel Side */}
          <div className="flex-1">
            <div className="text-center mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-blue-100 text-blue-800">
                Your Hotel
              </Badge>
            </div>
            <div className="space-y-4">
              {yourRoomTypes.map((roomType, index) => (
                <div key={roomType.id} className="relative">
                  <div className="bg-blue-500 text-white px-4 py-3 rounded-lg text-center font-medium shadow-md">
                    {roomType.name}
                  </div>
                  {/* Connection lines */}
                  {getCompetitorRoomTypes(roomType.id).length > 0 && (
                    <div className="absolute top-1/2 right-0 w-8 h-0.5 bg-gray-300 transform translate-x-full -translate-y-1/2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connection Area */}
          <div className="flex-shrink-0 w-16 relative">
            <div className="absolute inset-0 flex flex-col justify-center">
              {yourRoomTypes.map((roomType, index) => {
                const competitorTypes = getCompetitorRoomTypes(roomType.id);
                return competitorTypes.map((_, connIndex) => (
                  <div
                    key={`${roomType.id}-${connIndex}`}
                    className="h-0.5 bg-gray-300 mb-2"
                    style={{
                      marginTop: index * 60 + connIndex * 8 + 'px'
                    }}
                  ></div>
                ));
              })}
            </div>
          </div>

          {/* Competitor Hotel Side */}
          <div className="flex-1">
            <div className="text-center mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-teal-100 text-teal-800">
                {selectedHotel?.name}
              </Badge>
            </div>
            <div className="space-y-2">
              {allCompetitorTypes.map((competitorType, index) => (
                <div key={competitorType} className="relative">
                  <div className="bg-teal-500 text-white px-4 py-2 rounded-lg text-center font-medium shadow-md text-sm">
                    {competitorType}
                  </div>
                  {/* Connection lines */}
                  <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-gray-300 transform -translate-x-full -translate-y-1/2"></div>
                </div>
              ))}
              
              {allCompetitorTypes.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No mappings configured yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 pt-4 border-t">
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Your Room Types</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-teal-500 rounded"></div>
              <span className="text-sm text-gray-600">Competitor Room Types</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <span className="text-sm text-gray-600">Mapping Connection</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MappingGraph;
