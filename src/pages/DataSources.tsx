
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CirclePlusIcon, DatabaseIcon, FileTextIcon, LinkIcon, MoreHorizontalIcon, RefreshCwIcon } from 'lucide-react';

// Mock data for data sources
const mockDataSources = [
  {
    id: 'pms-data',
    name: 'Property Management System',
    type: 'api',
    status: 'connected',
    lastSync: '2025-05-21T14:30:00Z',
    metrics: {
      dataPoints: 5423,
      completeness: 98,
      dataFreshness: 1, // hours
    }
  },
  {
    id: 'booking-engine',
    name: 'Booking Engine',
    type: 'api',
    status: 'connected',
    lastSync: '2025-05-21T12:45:00Z',
    metrics: {
      dataPoints: 3287,
      completeness: 95,
      dataFreshness: 4, // hours
    }
  },
  {
    id: 'weather-api',
    name: 'Weather API',
    type: 'api',
    status: 'connected',
    lastSync: '2025-05-21T10:15:00Z',
    metrics: {
      dataPoints: 1459,
      completeness: 100,
      dataFreshness: 6, // hours
    }
  },
  {
    id: 'competitor-prices',
    name: 'Competitor Price Data',
    type: 'scraper',
    status: 'warning',
    lastSync: '2025-05-20T18:20:00Z',
    metrics: {
      dataPoints: 842,
      completeness: 78,
      dataFreshness: 24, // hours
    }
  },
  {
    id: 'events-calendar',
    name: 'Local Events Calendar',
    type: 'file',
    status: 'error',
    lastSync: '2025-05-18T09:10:00Z',
    metrics: {
      dataPoints: 156,
      completeness: 45,
      dataFreshness: 72, // hours
    }
  },
];

const DataSources: React.FC = () => {
  const [dataSources, setDataSources] = useState(mockDataSources);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const filteredSources = activeFilters.length > 0 
    ? dataSources.filter(source => activeFilters.includes(source.status))
    : dataSources;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'api': return <LinkIcon className="h-4 w-4" />;
      case 'file': return <FileTextIcon className="h-4 w-4" />;
      case 'scraper': return <DatabaseIcon className="h-4 w-4" />;
      default: return <DatabaseIcon className="h-4 w-4" />;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Data Sources</h1>
            <p className="text-muted-foreground">
              Manage connections to external data providers and APIs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <CirclePlusIcon className="mr-2 h-4 w-4" />
              Add Data Source
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <Button 
            variant={activeFilters.length === 0 ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveFilters([])}
          >
            All
          </Button>
          <Button 
            variant={activeFilters.includes('connected') ? "default" : "outline"} 
            size="sm"
            onClick={() => toggleFilter('connected')}
          >
            Connected
          </Button>
          <Button 
            variant={activeFilters.includes('warning') ? "default" : "outline"} 
            size="sm"
            onClick={() => toggleFilter('warning')}
          >
            Warning
          </Button>
          <Button 
            variant={activeFilters.includes('error') ? "default" : "outline"} 
            size="sm"
            onClick={() => toggleFilter('error')}
          >
            Error
          </Button>
        </div>

        <div className="space-y-4">
          {filteredSources.map(source => (
            <Card key={source.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(source.status)}>
                        {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                      </Badge>
                      <CardTitle className="text-lg">{source.name}</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      {getTypeIcon(source.type)}
                      <span className="capitalize">
                        {source.type} Connection
                      </span>
                      <span className="mx-1">•</span>
                      <span>Last synced: {new Date(source.lastSync).toLocaleString()}</span>
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Data Points</div>
                    <div className="text-lg font-medium">{source.metrics.dataPoints.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Completeness</div>
                    <div className="flex items-center gap-2">
                      <Progress value={source.metrics.completeness} className="h-2" />
                      <span className="text-sm font-medium">{source.metrics.completeness}%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">Freshness</div>
                    <div className="text-lg font-medium">
                      {source.metrics.dataFreshness < 24
                        ? `${source.metrics.dataFreshness} hours`
                        : `${Math.floor(source.metrics.dataFreshness / 24)} days`}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" size="sm">
                    View Data
                  </Button>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                  <Button size="sm">
                    <RefreshCwIcon className="mr-1 h-4 w-4" />
                    Sync Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default DataSources;
