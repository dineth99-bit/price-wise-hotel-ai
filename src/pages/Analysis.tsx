
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import PickupCurveChart from '@/components/charts/PickupCurveChart';
import BookingCurveChart from '@/components/charts/BookingCurveChart';

const Analysis: React.FC = () => {
  const [pickupTimePeriod, setPickupTimePeriod] = useState('daily');
  const [bookingTimePeriod, setBookingTimePeriod] = useState('daily');
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date());

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
                      Track when bookings were made for a specific arrival date
                    </CardDescription>
                  </div>
                  <div className="flex gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[200px] justify-start text-left font-normal",
                            !arrivalDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {arrivalDate ? format(arrivalDate, "PPP") : <span>Pick arrival date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={arrivalDate}
                          onSelect={(date) => date && setArrivalDate(date)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
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
                </div>
              </CardHeader>
              <CardContent>
                <PickupCurveChart timePeriod={pickupTimePeriod} arrivalDate={arrivalDate} />
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
