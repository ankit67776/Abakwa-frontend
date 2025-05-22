
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'; // Using ShadCN Card

interface ChartData {
  label: string;
  value: number;
  color: string; // Kept user's color prop
}

interface PerformanceChartProps {
  title: string;
  description?: string;
  data: ChartData[];
  type?: 'bar' | 'line'; // Type prop if needed for future chart library integration
  percentage?: boolean;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  title,
  description,
  data,
  // type = 'bar', // Not used in current div-based implementation
  percentage = false,
}) => {
  const maxValue = data.length > 0 ? Math.max(...data.map((item) => item.value)) : 1; // Avoid division by zero

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow">
        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center text-sm">
                <div className="col-span-3 truncate">
                  <span className="font-medium text-muted-foreground">{item.label}</span>
                </div>
                <div className="col-span-7 h-6 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(item.value / maxValue) * 100}%`,
                      backgroundColor: item.color, // Using user-provided color
                    }}
                  />
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-semibold text-foreground">
                    {percentage ? `${item.value.toFixed(2)}%` : item.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No data available.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
