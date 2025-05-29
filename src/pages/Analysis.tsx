
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PickupCurveChart from '@/components/charts/PickupCurveChart';
import BookingCurveChart from '@/components/charts/BookingCurveChart';

const Analysis: React.FC = () => {
  const [pickupTimePeriod, setPickupTimePeriod] = useState('daily');
  const [bookingTimePeriod, setBookingTimePeriod] = useState('daily');

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Analysis Dashboard</h1>
          <p className="text-muted-foreground">
            Analyze pickup curves and booking patterns with predictive insights
          </p>
        </div>
        
        <Tabs defaultValue="pickup" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pickup">Pickup Curve</TabsTrigger>
            <TabsTrigger value="booking">Booking Curve</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pickup" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Pickup Curve Analysis</CardTitle>
                    <CardDescription>
                      Track reservation pickup patterns over time with forecasting
                    </CardDescription>
                  </div>
                  <Select value={pickupTimePeriod} onValueChange={setPickupTimePeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <PickupCurveChart timePeriod={pickupTimePeriod} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="booking" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Booking Curve Analysis</CardTitle>
                    <CardDescription>
                      Compare actual check-ins with predicted arrivals
                    </CardDescription>
                  </div>
                  <Select value={bookingTimePeriod} onValueChange={setBookingTimePeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <BookingCurveChart timePeriod={bookingTimePeriod} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Analysis;
