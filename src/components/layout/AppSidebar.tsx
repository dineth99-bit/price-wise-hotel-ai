
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboardIcon, 
  TrendingUpIcon,
  SettingsIcon,
  UsersIcon,
  BedIcon,
  CalendarIcon,
  AlertCircleIcon,
  DatabaseIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, active }) => (
  <Link to={to}>
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-start mb-1",
        active && "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
      )}
    >
      {React.cloneElement(icon as React.ReactElement, { 
        className: cn("mr-2 h-5 w-5", active ? "text-blue-600" : "text-gray-500") 
      })}
      {label}
    </Button>
  </Link>
);

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Navigation
        </h2>
        
        <nav className="space-y-1">
          <NavItem 
            icon={<LayoutDashboardIcon />} 
            label="Dashboard" 
            to="/" 
            active={currentPath === '/'} 
          />
          <NavItem 
            icon={<TrendingUpIcon />} 
            label="Forecasts" 
            to="/forecasts" 
            active={currentPath.startsWith('/forecasts')} 
          />
          <NavItem 
            icon={<BedIcon />} 
            label="Room Types" 
            to="/rooms" 
            active={currentPath.startsWith('/rooms')} 
          />
          <NavItem 
            icon={<UsersIcon />} 
            label="Segments" 
            to="/segments" 
            active={currentPath.startsWith('/segments')} 
          />
          <NavItem 
            icon={<CalendarIcon />} 
            label="Calendar" 
            to="/calendar" 
            active={currentPath.startsWith('/calendar')} 
          />
          <NavItem 
            icon={<AlertCircleIcon />} 
            label="Alerts" 
            to="/alerts" 
            active={currentPath.startsWith('/alerts')} 
          />
          <NavItem 
            icon={<DatabaseIcon />} 
            label="Data Sources" 
            to="/data" 
            active={currentPath.startsWith('/data')} 
          />
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-200">
        <NavItem 
          icon={<SettingsIcon />} 
          label="Settings" 
          to="/settings" 
          active={currentPath.startsWith('/settings')} 
        />
      </div>
    </div>
  );
};

export default AppSidebar;
