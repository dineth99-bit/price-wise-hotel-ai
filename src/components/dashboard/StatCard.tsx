
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  const changeColor = change === undefined 
    ? '' 
    : change > 0 
      ? 'text-green-600' 
      : change < 0 
        ? 'text-red-600' 
        : 'text-gray-600';

  const changeText = change === undefined 
    ? '' 
    : change > 0 
      ? `+${change.toFixed(2)}%` 
      : `${change.toFixed(2)}%`;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">{value}</p>
              {change !== undefined && (
                <span className={`text-sm font-medium ${changeColor}`}>
                  {changeText}
                </span>
              )}
            </div>
          </div>
          {icon && (
            <div className="p-2 bg-primary/10 rounded-full">
              {React.cloneElement(icon as React.ReactElement, {
                className: "h-5 w-5 text-primary"
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
