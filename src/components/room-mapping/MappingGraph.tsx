
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Room Mapping Graph: Your Hotel vs {selectedHotel?.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {yourRoomTypes.map((roomType) => {
            const competitorTypes = getCompetitorRoomTypes(roomType.id);
            
            return (
              <div key={roomType.id} className="flex items-center gap-4">
                {/* Your Hotel Room Type */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-blue-500 text-white px-4 py-3 rounded-lg text-center font-medium shadow-md">
                    <div className="text-xs text-blue-100 mb-1">Your Hotel</div>
                    {roomType.name}
                  </div>
                </div>

                {/* Arrow(s) and Competitor Room Types */}
                {competitorTypes.length > 0 ? (
                  <div className="flex-1 space-y-3">
                    {competitorTypes.map((competitorType, index) => (
                      <div key={index} className="flex items-center gap-4">
                        {/* Arrow */}
                        <div className="flex items-center">
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                        
                        {/* Competitor Room Type */}
                        <div className="flex-1 max-w-md">
                          <div className="bg-teal-500 text-white px-4 py-2 rounded-lg text-center font-medium shadow-md">
                            <div className="text-xs text-teal-100 mb-1">{selectedHotel?.name}</div>
                            {competitorType}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex items-center">
                      <ArrowRight className="h-5 w-5 text-gray-300" />
                    </div>
                    <div className="text-gray-400 italic">No mapping configured</div>
                  </div>
                )}
              </div>
            );
          })}
          
          {yourRoomTypes.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No room types available
            </div>
          )}
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
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Mapping Connection</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MappingGraph;
