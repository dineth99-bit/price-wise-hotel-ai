
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

  // Create connection data for proper line drawing
  const connections = [];
  yourRoomTypes.forEach((yourRoom, yourIndex) => {
    const competitorTypes = getCompetitorRoomTypes(yourRoom.id);
    competitorTypes.forEach(competitorType => {
      const competitorIndex = allCompetitorTypes.indexOf(competitorType);
      if (competitorIndex !== -1) {
        connections.push({
          yourIndex,
          competitorIndex,
          yourRoomType: yourRoom.name,
          competitorRoomType: competitorType
        });
      }
    });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Room Mapping Graph: Your Hotel vs {selectedHotel?.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative flex justify-between items-start gap-8 min-h-[400px]">
          {/* Your Hotel Side */}
          <div className="flex-1 z-10">
            <div className="text-center mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-blue-100 text-blue-800">
                Your Hotel
              </Badge>
            </div>
            <div className="space-y-4">
              {yourRoomTypes.map((roomType, index) => (
                <div key={roomType.id} className="relative">
                  <div 
                    className="bg-blue-500 text-white px-4 py-3 rounded-lg text-center font-medium shadow-md"
                    id={`your-room-${index}`}
                  >
                    {roomType.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connection SVG */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full">
              {connections.map((connection, index) => {
                const yourY = 100 + connection.yourIndex * 72 + 24; // 72px spacing + 24px center
                const competitorY = 100 + connection.competitorIndex * 60 + 20; // 60px spacing + 20px center
                const startX = window.innerWidth < 768 ? 200 : 280; // Responsive start point
                const endX = window.innerWidth < 768 ? window.innerWidth - 200 : window.innerWidth - 280; // Responsive end point
                
                return (
                  <line
                    key={`connection-${index}`}
                    x1={startX}
                    y1={yourY}
                    x2={endX}
                    y2={competitorY}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.7"
                  />
                );
              })}
            </svg>
          </div>

          {/* Competitor Hotel Side */}
          <div className="flex-1 z-10">
            <div className="text-center mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-teal-100 text-teal-800">
                {selectedHotel?.name}
              </Badge>
            </div>
            <div className="space-y-3">
              {allCompetitorTypes.map((competitorType, index) => (
                <div key={competitorType} className="relative">
                  <div 
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg text-center font-medium shadow-md text-sm"
                    id={`competitor-room-${index}`}
                  >
                    {competitorType}
                  </div>
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

        {/* Connection Legend */}
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
              <div className="w-8 h-0.5 bg-gray-400 opacity-70" style={{borderTop: '2px dashed #94a3b8'}}></div>
              <span className="text-sm text-gray-600">Mapping Connection</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MappingGraph;
