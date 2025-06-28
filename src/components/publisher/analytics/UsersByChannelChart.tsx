
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface UsersByChannelChartProps {
  title: string;
  data: { channel: string; users: number; fill: string }[];
}

const UsersByChannelChart: React.FC<UsersByChannelChartProps> = ({ title, data }) => {
  // Find max value for YAxis domain
  const maxValue = Math.max(...data.map(item => item.users));
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground flex items-center">
          {title} <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
        </CardTitle>
        {/* Placeholder for icons */}
      </CardHeader>
      <CardContent className="pt-2 pb-4 px-4 flex-grow">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} domain={[0, maxValue > 1000 ? 'dataMax + 200' : 'dataMax + 50']} tickLine={false} axisLine={false} />
            <YAxis 
              dataKey="channel" 
              type="category" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={10} 
              width={80} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => value.length > 15 ? `${value.substring(0,13)}...` : value}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                fontSize: '12px',
                boxShadow: 'hsl(var(--shadow))'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
            />
            <Bar dataKey="users" barSize={15} radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <div className="px-4 pb-3 mt-auto border-t pt-3">
        <Button variant="link" size="sm" className="text-xs text-primary p-0 h-auto hover:underline">
          View user acquisition <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
};

export default UsersByChannelChart;
