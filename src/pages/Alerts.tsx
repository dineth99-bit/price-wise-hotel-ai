
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircleIcon, BellIcon, CalendarIcon, CheckIcon, FilterIcon, Settings, XIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDistanceToNow } from 'date-fns';

// Mock data for alerts
const mockAlerts = [
  {
    id: 'alert-1',
    title: 'High Demand Detected',
    description: 'Unusual surge in demand for Standard rooms detected for dates June 15-18.',
    type: 'demand',
    severity: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
  },
  {
    id: 'alert-2',
    title: 'Price Threshold Exceeded',
    description: 'Prices for Deluxe rooms exceed the maximum threshold by 15% for next weekend.',
    type: 'price',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: false,
  },
  {
    id: 'alert-3',
    title: 'Weather Event Warning',
    description: 'Upcoming storm may impact occupancy rates for coastal properties.',
    type: 'weather',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isRead: true,
  },
  {
    id: 'alert-4',
    title: 'Low Look-to-Book Ratio',
    description: 'Conversion rates for leisure segment have dropped by 8% in the past week.',
    type: 'conversion',
    severity: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
    isRead: true,
  },
  {
    id: 'alert-5',
    title: 'Event Impact Opportunity',
    description: 'Local conference on July 10-12 may allow for increased pricing.',
    type: 'event',
    severity: 'low',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    isRead: true,
  },
];

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('all');
  
  const unreadAlerts = alerts.filter(alert => !alert.isRead);
  const readAlerts = alerts.filter(alert => alert.isRead);
  
  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'demand': return <TrendingUpIcon className="h-5 w-5" />;
      case 'price': return <TagIcon className="h-5 w-5" />;
      case 'weather': return <CloudIcon className="h-5 w-5" />;
      case 'conversion': return <PercentIcon className="h-5 w-5" />;
      case 'event': return <CalendarIcon className="h-5 w-5" />;
      default: return <AlertCircleIcon className="h-5 w-5" />;
    }
  };
  
  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Alerts</h1>
            <p className="text-muted-foreground">
              Monitor system alerts and anomalies detected by pricing agents
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Alert Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Alerts</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadAlerts.length > 0 && (
                  <Badge variant="destructive" className="ml-1 px-1 py-0 h-5 min-w-5">
                    {unreadAlerts.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="demand">Demand</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="weather">Weather</SelectItem>
                <SelectItem value="conversion">Conversion</SelectItem>
                <SelectItem value="event">Events</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <TabsContent value="all" className="m-0">
            <div className="space-y-4">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map(alert => (
                  <AlertCard 
                    key={alert.id} 
                    alert={alert} 
                    onMarkAsRead={() => markAsRead(alert.id)} 
                    getSeverityColor={getSeverityColor} 
                    getTypeIcon={getTypeIcon}
                  />
                ))
              ) : (
                <EmptyState />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="unread" className="m-0">
            <div className="space-y-4">
              {unreadAlerts.filter(alert => filter === 'all' || alert.type === filter).length > 0 ? (
                unreadAlerts
                  .filter(alert => filter === 'all' || alert.type === filter)
                  .map(alert => (
                    <AlertCard 
                      key={alert.id} 
                      alert={alert} 
                      onMarkAsRead={() => markAsRead(alert.id)} 
                      getSeverityColor={getSeverityColor}
                      getTypeIcon={getTypeIcon}
                    />
                  ))
              ) : (
                <EmptyState message="No unread alerts" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="read" className="m-0">
            <div className="space-y-4">
              {readAlerts.filter(alert => filter === 'all' || alert.type === filter).length > 0 ? (
                readAlerts
                  .filter(alert => filter === 'all' || alert.type === filter)
                  .map(alert => (
                    <AlertCard 
                      key={alert.id} 
                      alert={alert} 
                      onMarkAsRead={() => markAsRead(alert.id)}
                      getSeverityColor={getSeverityColor}
                      getTypeIcon={getTypeIcon}
                    />
                  ))
              ) : (
                <EmptyState message="No read alerts" />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

interface AlertCardProps {
  alert: typeof mockAlerts[0];
  onMarkAsRead: () => void;
  getSeverityColor: (severity: string) => string;
  getTypeIcon: (type: string) => React.ReactNode;
}

const AlertCard: React.FC<AlertCardProps> = ({ 
  alert, 
  onMarkAsRead, 
  getSeverityColor,
  getTypeIcon
}) => {
  return (
    <Card className={alert.isRead ? 'bg-gray-50' : ''}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className={`rounded-full p-1 ${getSeverityColor(alert.severity)}`}>
              {getTypeIcon(alert.type)}
            </div>
            <CardTitle className="text-lg">{alert.title}</CardTitle>
          </div>
          <Badge className={getSeverityColor(alert.severity)}>
            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <BellIcon className="h-3 w-3" />
          {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p>{alert.description}</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        {!alert.isRead && (
          <Button size="sm" variant="ghost" onClick={onMarkAsRead}>
            <CheckIcon className="mr-1 h-4 w-4" />
            Mark as Read
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const EmptyState: React.FC<{ message?: string }> = ({ message = "No alerts found" }) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-gray-100 p-3">
          <BellIcon className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium">{message}</h3>
        <p className="mt-2 text-center text-sm text-gray-500">
          Alerts will appear here when the system detects anomalies or important events.
        </p>
      </CardContent>
    </Card>
  );
};

// We need to import specific icons for this page
import { 
  CloudIcon, 
  PercentIcon, 
  TagIcon, 
  TrendingUpIcon
} from 'lucide-react';

export default Alerts;
