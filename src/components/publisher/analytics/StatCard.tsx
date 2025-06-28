
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  subtitle?: string;
  topCountries?: string; // For "Active users in last 30 minutes" card
  smallBarValue?: number; // For "Active users in last 30 minutes" card
  change?: string; // e.g., "+5.2%" - not in current GA screenshot but common
  changeType?: 'positive' | 'negative';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, subtitle, topCountries, smallBarValue }) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{title}</span>
            {icon && <span className="ml-auto">{icon}</span>}
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4 px-4 flex-grow flex flex-col justify-between">
        <div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            {subtitle && <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{subtitle}</p>}
        </div>
        {topCountries && (
            <div className="mt-2">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Top Countries</p>
                <p className="text-xs text-foreground font-medium">{topCountries}</p>
            </div>
        )}
        {smallBarValue !== undefined && (
             <div className="mt-2 h-3 w-full bg-muted rounded-sm overflow-hidden">
                {/* This is a very simplified bar, actual GA has multiple small bars */}
                <div className="h-full bg-primary" style={{ width: `${smallBarValue * 20}%` }}></div> {/* Assuming max 5 bars */}
            </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
