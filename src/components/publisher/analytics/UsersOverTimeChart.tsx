
"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'; // Direct import
import { ArrowRight } from 'lucide-react';

interface UsersOverTimeChartProps {
  data: { date: string; users: number }[];
}

const UsersOverTimeChart: React.FC<UsersOverTimeChartProps> = ({ data }) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <div>
            <CardTitle className="text-sm font-medium text-muted-foreground">Active users</CardTitle>
            {/* <CardDescription className="text-xs text-muted-foreground">Fluctuation over the selected period</CardDescription> */}
        </div>
         {/* Placeholder for dropdown/icons if needed */}
      </CardHeader>
      <CardContent className="pt-0 pb-4 px-4 flex-grow">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} domain={[0, 'dataMax + 50']} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                fontSize: '12px',
                boxShadow: 'hsl(var(--shadow))'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
              itemStyle={{ color: 'hsl(var(--primary))' }}
            />
            <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3, fill: 'hsl(var(--primary))' }} activeDot={{ r: 5 }} name="Active Users" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <div className="px-4 pb-3 mt-auto border-t pt-3">
        <Button variant="link" size="sm" className="text-xs text-primary p-0 h-auto hover:underline">
          View realtime <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
};

export default UsersOverTimeChart;
