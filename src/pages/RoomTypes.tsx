
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedIcon, EditIcon, Plus, TagIcon } from 'lucide-react';
import { roomTypes } from '@/data/mockData';

const RoomTypes: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  return (
    <AppLayout>
      <div className="space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomTypes.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <BedIcon className="h-16 w-16 text-gray-400" />
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
      </div>
    </AppLayout>
  );
};

export default RoomTypes;
