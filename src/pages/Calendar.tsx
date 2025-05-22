
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays, startOfWeek, endOfWeek, isToday, isSameMonth, addMonths, subMonths } from 'date-fns';
import { cn } from '@/lib/utils';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'week' | 'month'>('month');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState('all');

  // Mock data for calendar events
  const events = [
    { date: new Date(), title: 'Peak Pricing', type: 'price', color: 'bg-orange-100 text-orange-800' },
    { date: addDays(new Date(), 2), title: 'Local Event', type: 'event', color: 'bg-blue-100 text-blue-800' },
    { date: addDays(new Date(), 5), title: 'Low Demand', type: 'demand', color: 'bg-red-100 text-red-800' },
    { date: addDays(new Date(), 7), title: 'Weather Impact', type: 'weather', color: 'bg-green-100 text-green-800' },
    { date: addDays(new Date(), 10), title: 'High Demand', type: 'demand', color: 'bg-emerald-100 text-emerald-800' },
  ];

  // Generate days for month view
  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const days = [];
    // Add previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = 0; i < startDay; i++) {
      const date = new Date(year, month - 1, prevMonthLastDay - startDay + i + 1);
      days.push({ date, isCurrentMonth: false });
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }

    // Add next month's days until we have a complete grid (6 rows x 7 columns = 42 cells)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const navigate = (direction: 'prev' | 'next') => {
    if (calendarView === 'month') {
      setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
    } else {
      const days = direction === 'prev' ? -7 : 7;
      setCurrentDate(addDays(currentDate, days));
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Calendar</h1>
            <p className="text-muted-foreground">
              View pricing events, forecasts and seasonal patterns
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rooms</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="direct">Direct Booking</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="leisure">Leisure</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex rounded-md overflow-hidden border">
              <Button
                variant={calendarView === 'month' ? 'default' : 'ghost'}
                className="rounded-none"
                onClick={() => setCalendarView('month')}
              >
                Month
              </Button>
              <Button
                variant={calendarView === 'week' ? 'default' : 'ghost'}
                className="rounded-none"
                onClick={() => setCalendarView('week')}
              >
                Week
              </Button>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <CardTitle>
                {calendarView === 'month' 
                  ? format(currentDate, 'MMMM yyyy')
                  : `${format(startOfWeek(currentDate), 'MMM d')} - ${format(endOfWeek(currentDate), 'MMM d, yyyy')}`
                }
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => navigate('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date())}>
                  <CalendarIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigate('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-0">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div 
                  key={day} 
                  className="p-2 text-center font-medium text-sm border-b"
                >
                  {day}
                </div>
              ))}
              
              {generateMonthDays().map((day, index) => {
                const dayEvents = getEventsForDate(day.date);
                
                return (
                  <div 
                    key={index}
                    className={cn(
                      'border h-28 p-1 overflow-hidden',
                      !day.isCurrentMonth && 'bg-gray-50 text-gray-400',
                      isToday(day.date) && 'bg-blue-50'
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <span 
                        className={cn(
                          'inline-flex h-6 w-6 items-center justify-center rounded-full text-sm',
                          isToday(day.date) && 'bg-blue-600 text-white'
                        )}
                      >
                        {format(day.date, 'd')}
                      </span>
                      
                      {isToday(day.date) && (
                        <Badge className="bg-blue-500">Today</Badge>
                      )}
                    </div>
                    
                    <div className="mt-1 space-y-1">
                      {dayEvents.map((event, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            'text-xs px-1 py-0.5 rounded truncate',
                            event.color
                          )}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Calendar;
