
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, SettingsIcon, HelpCircleIcon, BarChart3Icon } from 'lucide-react';
import { toast } from 'sonner';

const AppHeader: React.FC = () => {
  const refreshData = () => {
    toast.success('Data refreshed successfully');
  };

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BarChart3Icon className="h-6 w-6 text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-900">Revenue Manager</h1>
      </div>

      <div className="flex items-center space-x-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-sm" 
          onClick={refreshData}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
        
        <Button variant="outline" size="icon">
          <HelpCircleIcon className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="icon">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
