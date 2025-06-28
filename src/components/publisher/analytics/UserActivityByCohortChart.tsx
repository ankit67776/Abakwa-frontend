
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CohortData {
  week: string;
  values: (number | null)[]; // Percentages e.g., 100.0, 1.0, 0.2, null
}

interface UserActivityByCohortChartProps {
  title: string;
  cohortData: CohortData[];
}

const getCellColor = (value: number | null): string => {
    if (value === null) return 'bg-muted/10'; // Very light for null
    if (value >= 99) return 'bg-blue-700 text-white'; // Darkest for 100%
    if (value >= 1.0) return 'bg-blue-500 text-white';
    if (value >= 0.5) return 'bg-blue-400';
    if (value >= 0.1) return 'bg-blue-300';
    if (value > 0) return 'bg-blue-200';
    return 'bg-blue-100'; // Lightest for small values
};

const UserActivityByCohortChart: React.FC<UserActivityByCohortChartProps> = ({ title, cohortData }) => {
  const weekHeaders = ["Week 0", "Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]; // Max 6 weeks from data

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground flex items-center">
          {title} <span className="text-muted-foreground/70 ml-1">(Based on device data only)</span> <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
        </CardTitle>
         <div className="flex items-center space-x-1">
            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground opacity-70" />
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4 px-4 flex-grow">
        <div className="overflow-x-auto">
          <table className="min-w-full text-[10px]">
            <thead>
              <tr className="text-muted-foreground">
                <th className="py-1 px-1.5 text-left font-normal uppercase tracking-wider">All Users</th>
                {weekHeaders.map(wh => <th key={wh} className="py-1 px-1.5 text-right font-normal">{wh}</th>)}
              </tr>
            </thead>
            <tbody>
              {cohortData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-muted/20">
                  <td className="py-1 px-1.5 text-muted-foreground whitespace-nowrap">{row.week}</td>
                  {row.values.map((value, cellIndex) => (
                    <td key={cellIndex} className="py-1 px-1.5 text-right">
                       <div className={cn(
                           "h-5 w-full min-w-[24px] flex items-center justify-center rounded-sm",
                           getCellColor(value)
                        )}>
                         {value !== null ? `${value.toFixed(value === 100 ? 0 : 1)}%` : ''}
                       </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <p className="text-[10px] text-muted-foreground mt-2">6 weeks ending Jun 14</p>
      </CardContent>
      <div className="px-4 pb-3 mt-auto border-t pt-3">
        <Button variant="link" size="sm" className="text-xs text-primary p-0 h-auto hover:underline">
          View retention <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
};

export default UserActivityByCohortChart;
