
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, UsersIcon, TrendingUpIcon, TagIcon, PercentIcon } from 'lucide-react';
import { customerSegments } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const Segments: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Customer Segments</h1>
            <p className="text-muted-foreground">
              Define and manage customer segments for targeted pricing
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Segment
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customerSegments.map((segment) => (
            <Card key={segment.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{segment.name}</CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <UsersIcon className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Segment ID:</span>
                    <span className="font-medium">{segment.id}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Price Sensitivity:</span>
                    <div className="flex items-center">
                      <TrendingUpIcon className="h-4 w-4 text-orange-500 mr-1" />
                      <span className="font-medium">{segment.priceSensitivity || "Medium"}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Average Booking Value:</span>
                    <span className="font-medium">${segment.averageBookingValue || "N/A"}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Special Conditions:</span>
                    <div className="flex gap-1">
                      {(segment.specialConditions?.length || 0) > 0 ? 
                        segment.specialConditions?.map((condition, idx) => (
                          <Badge key={idx} variant="outline">{condition}</Badge>
                        )) : 
                        <span className="text-gray-400">None</span>
                      }
                    </div>
                  </div>
                  
                  <div className="pt-2 flex justify-end gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">View Analytics</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Segments;
